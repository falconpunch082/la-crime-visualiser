let loadingCounter = 0;
const showLoadingIndicator = () => {
    document.getElementById('loading-indicator').style.display = 'block';
    loadingCounter = loadingCounter + 1;
  };

  const hideLoadingIndicator = () => {
    loadingCounter = loadingCounter - 1;
    if (loadingCounter == 0){
        document.getElementById('loading-indicator').style.display = 'none';
    }
  };

/*
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////// [Charts / D3 JavaScript] Visualisations for Los Angeles Crime Data //////////////
///////////////////////////////////////////////////////////////////////////////////////////////
*/

// Define variable to store the filtered query JSON Dataset
let queryData;

// Get the base URL of the current page
const baseURL = window.location.origin;

const optionAPI = '/api/v1.0/filter_options'
const optionURL = baseURL + optionAPI


// Using D3, fetch the JSON Dataset from the specified URL 
// Once successful, THEN pass through the loaded JSON dataset as an argument to the following callback function where...
showLoadingIndicator();
d3.json(optionURL).then(jsonData => {
    // The loaded JSON Dataset is stored in the nominated variable
    const optionData = jsonData;
  
    // The dropdown menus (<select> HTML element from the HTML file) with ID 'selCrime' and 'selArea' is referenced and stored in new Constants
    // The array of all crime category elements from the 'crime_categories' key of the JSON dataset is stored in a new Constant
    // Similarly, the array of all area name elements from the 'area_names' key of the JSON dataset is stored in a new Constant
    const ddCrime = d3.select("#selCrime");
    const crimeCats = optionData.crime_categories;

    const ddArea = d3.select("#selArea");
    const areaNames = optionData.area_names;
    const calYears = optionData.years;

 
    build_Dropdowns(ddArea, ddCrime, areaNames, crimeCats);

    build_Slider(calYears);

    // Programmatically trigger the Button click to initialise the visuals during startup
    d3.select("#runQuery").node().click();

}).finally(() => {
      hideLoadingIndicator(); // Hide loading indicator when API call is complete
 });


const runQuery = (event) => {
    $('#loading-popup').modal('toggle');

    // Return the values chosen using JQuery
    // For the Multiselect dropdown menus, trim() is used for every selected value string item to remove any spacing from either ends prior to URI encoding
    // encodeURIComponent() is used to replace the spacing in between the string item (e.g. "77th Street") with '%20' to be HTML format friendly (e.g. "77th%20Street")
    let area_sel = $('#selArea option:selected').map(function(a, item){return encodeURIComponent(item.value.trim());}).get();
    let crime_sel = $('#selCrime option:selected').map(function(a, item){return encodeURIComponent(item.value.trim());}).get();
    let year_sel = d3.select("#selYear").node().value;

    // Concatenate elements from their respective array into string  
    let area_str = area_sel.join(',');
    let crime_str = crime_sel.join(',');

    
    //Use backticks (``) in order to output template literals i.e. output something like how f-strings are written in Python
    let queryAPI = `/api/v1.0/${year_sel}/${area_str}/${crime_str}`;
    let queryURL = baseURL + queryAPI;

    showLoadingIndicator();
    d3.json(queryURL).then(jsonData => {
        queryData = jsonData

        init_AllVisuals(queryData);

    }).finally(() => {
        hideLoadingIndicator(); // Hide loading indicator when API call is complete
   });;
    

    console.log(area_str);
    console.log(crime_str);
    console.log(year_sel);

    console.log(queryURL);

    $('#loading-popup').modal('hide');
};   



// Function to initialise or reinitialise all visuals including the Leaflet Map and Chart JS plots
const init_AllVisuals = (thisDataset) => {
    // Initialise or Reinitialise the Leaflet Map
    init_Map(thisDataset);
    
    // Initialise or Reinitialise the Donut Chart (Using Chart.js)
    init_DonutChart(thisDataset);

    // Initialise or Reinitialise the Stacked Bar Chart (Using Chart.js)
    init_StackedBarChart(thisDataset);
  
    // Initialise or Reinitialise the Pie Chart (Using Chart.js)
    init_PieChart(thisDataset);

    // Initialise or Reinitialise the Time Series Plot (Using Chart.js)
    init_TimeSeries(thisDataset);
};

const init_Map = (thisDataset) => {
        // Declaring resultData as the contents of pulled data's 'crime_data'
        resultData = thisDataset.crime_data;

        // Declaring empty marker cluster group variable to be filled later in for loop
        let marks = L.markerClusterGroup();
        // Declaring empty dataset to be used to generate heatmap
        let hm_pts = [];
    
        // For every single datapoint gained from API call...
        for(i = 0; i < resultData.length; i++) {
            // Declaring variable that changes every iteration
            let datapoint = resultData[i];
    
            // Declaring datapoints in dataset
            let coords = [datapoint["lat"], datapoint["lon"]];
            let area = datapoint["area_name"];
            let category = datapoint["crime_category"];
            let code = datapoint["crm_cd"];
            let descp = datapoint["crm_cd_desc"];
            let street = datapoint["location"];
            let x_str = datapoint["cross_street"];
            let occ_date = datapoint["date_occ"];
            let occ_time = datapoint["time_occ"]
            let rep = datapoint["date_rptd"];
            let premise = datapoint["premis_desc"];
            let age = datapoint["vict_age"];
            let sex = datapoint["vict_sex"];
            let descent = datapoint["vict_descent"];
    
            // Popup function to generate text seen when clicking on a marker
            // Legend:
            // cat - category of crime
            // c_c - crime code
            // c_d - description of crime
            // ar - area where crime occured
            // st - street where crime occured
            // x - intersection
            // p - description of premise where crime occured
            // o_d - date of occurence
            // o_t - time of occurence
            // r - date reported
            // ag - victim's age
            // s - victim's biological sex
            // d - victim's descent/ethnicity
            function popup(cat, c_c, c_d, ar, st, x, p, o_d, o_t, r, ag, s, d) {
                // This conditional generates a different location result depending on whether
                // the crime happened near the intersection of the location street and another
                // street. The grammar changes if x is present/not null.
                if (x !== null) {
                    return(
                        `
                        Category: ${cat} </br>
                        Crime: ${c_c} - ${c_d} </br>
                        <hr>
                        Area: ${ar} </br>
                        Location: On the corner of ${st} and ${x} </br>
                        Premise description: ${p} </br>
                        <hr>
                        Date of occurence: ${o_d} </br>
                        Time of occurence: ${o_t} </br>
                        Date reported: ${r} </br>
                        <hr>
                        Victim details </br>
                        Age: ${ag} </br>
                        Biological sex: ${s} </br>
                        Ethnicity: ${d}
                        `
                    )
                } else {
                    return(
                        `
                        Category: ${cat} </br>
                        Crime: ${c_c} - ${c_d} </br>
                        <hr>
                        Area: ${ar} </br>
                        Location: ${st} </br>
                        Premise description: ${p} </br>
                        <hr>
                        Date of occurence: ${o_d} </br>
                        Time of occurence: ${o_t} </br>
                        Date reported: ${r} </br>
                        <hr>
                        Victim details </br>
                        Age: ${ag} </br>
                        Biological sex: ${s} </br>
                        Ethnicity: ${d}
                        `
                    )
                }
            }
    
            // Pushing processed dataset into heatmap points list, with a set count of 1 (as only one crime is reported every iteration)
            hm_pts.push({lat: datapoint["lat"], lng: datapoint["lon"], count: 1});
            // Adding marker into cluster group with customised popup
            marks.addLayer(L.marker(coords).bindPopup(popup(category, code, descp, area, street, x_str, premise, occ_date, occ_time, rep, age, sex, descent)));
    
        }

    // Creating heatmap
    // Creating parameters for heatmap to be created
    let cfg = {
        "radius": 40,
        "useLocalExtrema": true,
        valueField: 'count'
    }
    // Declaring new heatmap layer
    let heatmap = new HeatmapOverlay(cfg);
    // Feeding in heatmap points list into the cfg
    heatmap.setData({
        data: hm_pts
    });
    
    // Declaring overlays for layer control
    let overlayMaps = {
        Markers: marks,
        Heatmap: heatmap
    }

    // Destroy div and reinitialise to create the Leaflet Map
    d3.select("#crime-map").html("");
    d3.select("#map-container").html("<div id='crime-map'></div>");

    // Street view
    let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
    );

    // Satelite view
    let satelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
    );

    // Declaring base maps for layer control
    let baseMaps = {
        "Street View": street,
        "Satelite View": satelite
    }


    // Creating map
    let crime_map = L.map("crime-map", 
                            {
                            center: [33.956174824512914,  -118.2116044755473],
                            zoom: 11,
                            minZoom: 9,
                            maxZoom: 18,
                            layers: [street, marks]
                            }
                        );


    // Creating layer control
    L.control.layers(baseMaps, overlayMaps).addTo(crime_map);

};

// Using the Chart JS library, this callback function initialises a Doughnut Chart (utilising the queried data) within the carousel of the HTML webpage 
const init_DonutChart = (thisDataset) => {
    
    nullValue = null;

    let uniqueDescents = [...new Set(thisDataset.crime_data.map(item => item.vict_descent))];
    uniqueDescents = uniqueDescents.filter(item => item !== nullValue)
    
    let sliceData = []

    uniqueDescents.forEach(Descent => {
        let getCount = thisDataset.crime_data.filter(item => item.vict_descent === Descent).length;
        sliceData.push(getCount);
    });


    // Destroy canvas in the <div> container and reinitialise to create the new Chart
    d3.select("#chartContainer1").html("");
    d3.select("#chartContainer1").html("<canvas id='jsChart_Donut' width='100%' height='100%'></canvas>");


    const donutCanvas = document.getElementById("jsChart_Donut").getContext('2d');


    const donutChart = new Chart(donutCanvas, {
        type: 'doughnut',
        data: {
            labels: uniqueDescents,
            datasets: [{
                data: sliceData}]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Doughnut Chart - Distribution of Vitcim Descent",
                },
            }
        }

    });
}


// Using the Chart JS library, this callback function initialises a Stacked Bar Chart (utilising the queried data ) within the carousel of the HTML webpage 
const init_StackedBarChart = (thisDataset) => {
    
    const uniqueCrimes = thisDataset.crime_categories;
    const uniqueAreas = thisDataset.area_names;
    
    const barData = {
        labels: uniqueCrimes,
        datasets: []
    };

    uniqueAreas.forEach(Area => {
        let columnData = {
            label: Area,
            data: [],
            borderWidth: 2
        };

        uniqueCrimes.forEach(Crime => {
            let getCount = thisDataset.crime_data.filter(item => item.area_name === Area && item.crime_category === Crime).length;
            columnData.data.push(getCount);
        });
    
        barData.datasets.push(columnData);

    });
    
    //console.log(barData);

    // Destroy canvas in the <div> container and reinitialise to create the new Chart
    d3.select("#chartContainer2").html("");
    d3.select("#chartContainer2").html("<canvas id='jsChart_StackedBar' width='100%' height='100%'></canvas>");


    const barCanvas = document.getElementById("jsChart_StackedBar").getContext('2d');

    const chartOptions = {
        scales: {
            x: {
                stacked: true,
                ticks: {
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                stacked: true,
                ticks: {
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: "Stacked Bar Chart - No. Crime Incidents by Area",
                fontSize: 48,
                fontStyle: 'bold'
            }
        }

        
    };

    const stackedBarChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: barData.labels,
            datasets: barData.datasets
        },
        options: chartOptions

    });

};

/*
// Using the Chart JS library, this callback function initialises a Stacked Bar Chart (utilising the queried data ) within the carousel of the HTML webpage 
const init_TimeSeries = (thisDataset) => {

    const uniqueCrimes = thisDataset.crime_categories;
    let crimeCounts = {};

    thisDataset.crime_data.forEach(item => {
        const dateString = item.date_occ;
        const dateActual = new Date(dateString);

        // Format the date to a string to ensure consistent formatting
        const dateFinal = dateActual.toISOString().split('T')[0];
    
        
        crimeCounts[dateFinal] = (crimeCounts[dateFinal] || 0) + 1;
    });
    
    const tsData = {
        labels: Object.keys(crimeCounts).sort(), // Sort the dates for a chronological order
        datasets: [
            {
                label: 'Number of Crimes',
                data: Object.values(crimeCounts),
                fill: false,
            },
        ],
    };

    // Destroy canvas in the <div> container and reinitialise to create the new Chart
    d3.select("#chartContainer3").html("");
    d3.select("#chartContainer3").html("<canvas id='jsChart_TimeSeries' width='100%' height='100%'></canvas>");


    const tsCanvas = document.getElementById("jsChart_TimeSeries").getContext('2d');

    const chartOptions = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                },
                ticks: {
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: "Time Series Chart - No. Crime Incidents",
                fontSize: 48,
                fontStyle: 'bold'
            }
        }

        
    };

    const tsChart = new Chart(tsCanvas, {
        type: 'line',
        data: tsData,
        options: chartOptions

    });


};
*/

// Using the Chart JS library, this callback function initialises a Stacked Bar Chart (utilising the queried data ) within the carousel of the HTML webpage 
const init_PieChart = (thisDataset) => {

    nullValue = null;

    let uniqueSexes = [...new Set(thisDataset.crime_data.map(item => item.vict_sex))];
    uniqueSexes = uniqueSexes.filter(item => item !== nullValue)
    
    let sliceData = []

    uniqueSexes.forEach(Sex => {
        let getCount = thisDataset.crime_data.filter(item => item.vict_sex === Sex).length;
        sliceData.push(getCount);
    });


    // Destroy canvas in the <div> container and reinitialise to create the new Chart
    d3.select("#chartContainer3").html("");
    d3.select("#chartContainer3").html("<canvas id='jsChart_Pie' width='100%' height='100%'></canvas>");


    const pieCanvas = document.getElementById("jsChart_Pie").getContext('2d');


    const pieChart = new Chart(pieCanvas, {
        type: 'pie',
        data: {
            labels: uniqueSexes,
            datasets: [{
                data: sliceData}]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Pie Chart - Distribution of Vitcim Sex",
                },
            }
        }

    });

};


const build_Dropdowns = (dropdownAreas, dropdownCrimes, arrayAreas, arrayCrimes) => {
    // For every crimeCat element in the array of crimeCats...
    // Append the list of options in the dropdown menu with the current crimeCat element where...
    // The display text & value property of the appended option is the current crimeCat element
    arrayAreas.forEach(Area => {
        dropdownAreas.append("option").text(Area).property("value", Area);
    });   

   
    // For every crimeCat element in the array of crimeCats...
    // Append the list of options in the dropdown menu with the current crimeCat element where...
    // The display text & value property of the appended option is the current crimeCat element
    arrayCrimes.forEach(Crime => {
        dropdownCrimes.append("option").text(Crime).property("value", Crime);
    });

    
    // After appending options into dropdown, initialise multiselect
    $(document).ready(function() {
        $('#selArea').multiselect({
            enableResetButton: true,
            nonSelectedText:'Area',
            nSelectedText  : "Area(s)",
            allSelectedText: "All areas",
            numberDisplayed: 0.5 // Set to 0.5 instead to 0 to avoid disabling summary text
        }).multiselect('select', [arrayAreas[0], arrayAreas[1]]);

        $('#selCrime').multiselect({
            enableResetButton: true,
            nonSelectedText:'Crime',
            nSelectedText  : "Crime(s)",
            allSelectedText: "All crimes",
            numberDisplayed: 0.5 
        }).multiselect('select', [arrayCrimes[0], arrayCrimes[1]]);
    });
};


const build_Slider = (arrayYears) => {
    // Creating year slider
    var year_slider = new rSlider({
        target: '#selYear',
        values: arrayYears,
        range: true,
        tooltip: false,
        scale: true,
        labels: true,
        set: [arrayYears[0], arrayYears[1]],
        width: '300%'
    });
};