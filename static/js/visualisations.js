/*
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////// [Charts / D3 JavaScript] Visualisations for Los Angeles Crime Data //////////////
///////////////////////////////////////////////////////////////////////////////////////////////
*/

// Define variable to store the filtered query JSON Dataset
let queryData;

// Get the base URL of the current page
const baseURL = window.location.origin;


// Store the API route to get the list of all filter options
const optionAPI = '/api/v1.0/filter_options'

// Combine the API Route for the filter options with the Base URL; used to query the JSON dataset of all filter options
const optionURL = baseURL + optionAPI

// Using D3, select the Button HTML element
const searchButton = d3.select("#runQuery");

// Counter used to determine for when the Loading Bar is displayed or hidden
let loadingCounter = 0;


// Function to display the Loading Bar (triggered during Start Up and runQuery)
const showLoadingIndicator = () => {
    document.getElementById('loading-indicator').style.display = 'block';
    loadingCounter = loadingCounter + 1;
};

// Function to hide the Loading Bar (triggered during Start Up and runQuery)
const hideLoadingIndicator = () => {
    loadingCounter = loadingCounter - 1;
    if (loadingCounter == 0){
        document.getElementById('loading-indicator').style.display = 'none';
    }
};


// Trigger the Loading Bar on startup; signal to the user that webpage initialisation is taking place
showLoadingIndicator();
d3.json(optionURL).then(jsonData => {
    // Using D3, fetch the JSON Dataset from the specified URL 
    // Once successful, THEN pass through the loaded JSON dataset as an argument to the following callback function where...
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

    // Call function to generate the dropdown menus for Area Names & Crime Categories
    build_Dropdowns(ddArea, ddCrime, areaNames, crimeCats);

    // Call function to generate the sliders (w/ two handles) for Years
    build_Slider(calYears);

    // Programmatically trigger the Button click to initialise the visuals during startup
    searchButton.node().click();

}).finally(() => {
      hideLoadingIndicator(); // Hide loading indicator when API call & initialisation of all visualisations are complete
});

// Function to dynamically generate the URL for the Flask Dynamic API Route (based on options selected from the interactive filters) & run visualisations
// Triggered everytime the SEARCH button is clicked
const runQuery = (event) => {
    disableButtonClick();
    
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
    // Dynamically generate the URL component for the Dynamic API Route based on the selected filter options
    // Combine it with the base URL
    let queryAPI = `/api/v1.0/${year_sel}/${area_str}/${crime_str}`;
    let queryURL = baseURL + queryAPI;

    // Trigger Loading Bar as the query is being called and running
    showLoadingIndicator();
    d3.json(queryURL).then(jsonData => {
        // Using D3, call the the final Query URL and then pass the JSON Dataset
        // Store the JSON Dataset in a variable
        queryData = jsonData

        // Initialise or Reinitialise all visualisations
        init_AllVisuals(queryData);

    }).finally(() => {
        hideLoadingIndicator(); // Hide loading indicator when API call & initialisation of all visualisations are complete
        enableButtonClick();
    });
};   


const enableButtonClick = () => {
    // Renable the Search Button
    searchButton.attr('disabled', null);

    // Change color of button back to its original
    searchButton.style("background-color", '#FFFFFF');

    // Update the button text to reflect it can be used
    searchButton.text('SEARCH');
};

const disableButtonClick = () => {
    // Disable the Search Button
    searchButton.attr('disabled', true);

    searchButton.style("background-color", '#808080');

    searchButton.text('LOADING...');

};


// Callback Function to initialise or reinitialise all visuals including the Leaflet Map and Chart JS plots
const init_AllVisuals = (thisDataset) => {
    // Initialise or Reinitialise the Leaflet Map
    init_Map(thisDataset);
 
    // Initialise or Reinitialise the Time Series Plot (Using Chart.js)
    init_TimeSeries(thisDataset);
    
    // Initialise or Reinitialise the Stacked Bar Chart (Using Chart.js)
    init_StackedBarChart(thisDataset);

    // Initialise or Reinitialise the Pie Chart (Using Chart.js)
    init_PieChart(thisDataset);    

    // Initialise or Reinitialise the Donut Chart (Using Chart.js)
    init_DonutChart(thisDataset);
};


// Using Leaflet Library, this callback function initialises the Leaflet Map
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


// Using the Chart JS library, this callback function initialises the Doughnut Chart (utilising the queried data) within the carousel of the HTML webpage 
const init_DonutChart = (thisDataset) => {
    // New constant with null; used as condition
    const nullValue = null;

    // From the array of all vict_descent values from the dataset, return a new array containing only the unique vict_descent values
        // '...' spread operator used to convert the following Set() object into a new array
        // 'new Set()' is used to create a new Set instance to store only the unique values from the array of vict_descent values
        // using map() on crime_data (nested in thisDataset), get every vict_descent value and store in a list
    let uniqueDescents = [...new Set(thisDataset.crime_data.map(item => item.vict_descent))];

    // Return the same array of unique vict_descent values where only null is removed
    uniqueDescents = uniqueDescents.filter(item => item !== nullValue)
    
    // Create an empty array; used to store the count for every unique vict_descent value
    let sliceData = []

    // For every unique vict_descent value...
    // Get the length (count) for that vict_descent value in the Dataset and store in the array
    uniqueDescents.forEach(Descent => {
        const getCount = thisDataset.crime_data.filter(item => item.vict_descent === Descent).length;
        sliceData.push(getCount);
    });


    // Destroy canvas in the <div> container and reinitialise to create the new Chart
    // Necessary in order to get the chart to utilise data from the new query run
    d3.select("#chartContainer4").html("");
    d3.select("#chartContainer4").html("<canvas id='jsChart_Donut' width='100%' height='100%'></canvas>");

    // select the Canvas HTML element for the Chart
    const donutCanvas = document.getElementById("jsChart_Donut").getContext('2d');

    // Initialise new Donut Chart where...
    const donutChart = new Chart(donutCanvas, {
        type: 'doughnut',
        data: {
            labels: uniqueDescents,                                             // Labels = Unique Descents
            datasets: [{
                data: sliceData}]                                               // Dataset = Array of each Unique Descent Counts
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Doughnut Chart - Distribution of Victim Descent"    // Title = Doughnut Chart - Distribution of Vitcim Descent
                },
            }
        }

    });
};


// Using the Chart JS library, this callback function initialises the Stacked Bar Chart (utilising the queried data ) within the carousel of the HTML webpage 
const init_StackedBarChart = (thisDataset) => {
    
    // From the Queried JSON Dataset, store the selected options for crime categories and area name in their own arrays
    const uniqueCrimes = thisDataset.crime_categories;
    const uniqueAreas = thisDataset.area_names;
    
    // Create a new object to store the labels and datasets (as empty array) for the Stacked Bar Chart
    // Used for when creating the Chart
    let barData = {
        labels: uniqueCrimes,
        datasets: []
    };

    // For every Area Name from the array...
    uniqueAreas.forEach(Area => {
        // Create a new object that represents a new column in the Stacked Bar Chart where...
        let columnData = {
            label: Area,    // Column Label = Current Area Name
            data: [],       // Dataset = count of Area Name per Crime Category in the JSON Dataset 
            borderWidth: 2  // Column Width = 2
        };

        // For every Crime Category from its respective array...
        // Tally up the count (length) of the current Area Name against the current Crime Category
        // Then, append the column object with the count
        uniqueCrimes.forEach(Crime => {
            let getCount = thisDataset.crime_data.filter(item => item.area_name === Area && item.crime_category === Crime).length;
            columnData.data.push(getCount);
        });
        
        // Append the dataset key in the main bar chart object with the column object 
        barData.datasets.push(columnData);

    });

    // Destroy canvas in the <div> container and reinitialise to create the new Chart
    // Necessary in order to get the chart to utilise data from the new query run
    d3.select("#chartContainer2").html("");
    d3.select("#chartContainer2").html("<canvas id='jsChart_StackedBar' width='100%' height='100%'></canvas>");


    // select the Canvas HTML element for the Chart
    const barCanvas = document.getElementById("jsChart_StackedBar").getContext('2d');

    // Create a new object containing option configurations for the Stacked Bar Chart where... 
    const chartOptions = {
        scales: {
            x: {
                stacked: true,                                                  // X axis = Stacked
                ticks: {
                    font: {
                        weight: 'bold'                                          // Font Style for X Ticks = Bold
                    }
                }
            },
            y: {
                stacked: true,                                                  // Y axis = Stacked
                ticks: {
                    font: {
                        weight: 'bold'                                          // Font Style for Y Ticks = Bold
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,                                                  // Enable Title for the Stacked Bar Chart
                text: "Stacked Bar Chart - No. Crime Incidents by Area",        // Title = Stacked Bar Chart - No. Crime Incidents by Area
                fontSize: 48,                                                   // Title Font Size = 48
                fontStyle: 'bold'                                               // Title Font Style = Bold
            }
        }

        
    };

    // Initialise new Bar Chart where...
    const stackedBarChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: barData.labels,             // X Labels = Crime Categories 
            datasets: barData.datasets          // Dataset = nested column data objects (each representing the Area Name)
        },
        options: chartOptions                   // Options = Chart Options object to enable Stacked mode and Title

    });

};


// Using the Chart JS library, this callback function initialises the Pie Chart (utilising the queried data ) within the carousel of the HTML webpage 
const init_PieChart = (thisDataset) => {
    // New constant with null; used as condition
    const nullValue = null;

    // From the array of all vict_sex values from the dataset, return a new array containing only the unique vict_sex values
        // '...' spread operator used to convert the following Set() object into a new array
        // 'new Set()' is used to create a new Set instance to store only the unique values from the array of vict_sex values
        // using map() on crime_data (nested in thisDataset), get every vict_sex value and store in a list    
    let uniqueSexes = [...new Set(thisDataset.crime_data.map(item => item.vict_sex))];
    uniqueSexes = uniqueSexes.filter(item => item !== nullValue)
    
    // Create an empty array; used to store the count for every unique vict_sex value
    let sliceData = []

    // For every unique vict_sex value...
    // Get the length (count) for that vict_sex value in the Dataset and store in the array    
    uniqueSexes.forEach(Sex => {
        const getCount = thisDataset.crime_data.filter(item => item.vict_sex === Sex).length;
        sliceData.push(getCount);
    });


    // Destroy canvas in the <div> container and reinitialise to create the new Chart
    // Necessary in order to get the chart to utilise data from the new query run
    d3.select("#chartContainer3").html("");
    d3.select("#chartContainer3").html("<canvas id='jsChart_Pie' width='100%' height='100%'></canvas>");

    // select the Canvas HTML element for the Chart
    const pieCanvas = document.getElementById("jsChart_Pie").getContext('2d');

    // Initialise new Pie Chart where...
    const pieChart = new Chart(pieCanvas, {
        type: 'pie',
        data: {
            labels: uniqueSexes,                                    // Labels = Array of Unique Victim Sex Values
            datasets: [{
                data: sliceData}]                                   // Dataset = Array of each Unique Victim Sex Count
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Pie Chart - Distribution of Victim Sex" // Title = Pie Chart - Distribution of Vitcim Sex
                },
            }
        }

    });

};


// Using the Chart JS library, this callback function initialises the Time Series Chart (utilising the queried data ) within the carousel of the HTML webpage 
const init_TimeSeries = (thisDataset) => {
    // Create an array of Calendar Months
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // From the Queried JSON Dataset, store the uniquely selected options for Years in a new Set() instance
    // In the event only one year is selected e.g. 2020,2020
    const uniqueYearsSet = new Set(thisDataset.years);

    // Convert the Set() object into an array
    const uniqueYearsArray = [...uniqueYearsSet];

    // From the array of Years, get the min and max values
    const minYear = Math.min(...uniqueYearsArray);
    const maxYear = Math.max(...uniqueYearsArray);

    // Return a new array containing all years e.g. 2020, 2021, 2022, 2023
    // Length of array determined by difference between max and min plus 1 e.g. 2023 - 2020 + 1 = 4
    // For every element in the array, return the addition of the min year + element index e.g. [2020 + 0, 2020 + 1, ... , 2020 + 3]
    // '_' parameter not used but passed to run the function
    const finalYears = Array.from({ length: maxYear - minYear + 1 }, (_, yearIndex) => minYear + yearIndex);


    
    // Return an array of dataset objects where each represents a year and an array of counts per calendar month against the year it belongs to.
    // For every year in the array...
    const tsData = finalYears.map(Year => {
        // Return the JSON dataset with records for the current year
        const currentYearData = thisDataset.crime_data.filter(item => new Date(item.date_occ).getFullYear() === Year);
      
        // Return a new array containing the count for each Calendar Month for the Current Year
        // Length of array is 12 (Calendar Months)
        // Current Month in iteration is determined by its index + 1
        // From the already filtered JSON Dataset, return the length of the JSON Dataset filtered to the current Moth
        const getMonthCounts = Array.from({ length: 12 }, (_, monthIndex) => {
          const currentMonth = monthIndex + 1;
          return currentYearData.filter(item => new Date(item.date_occ).getMonth() + 1 === currentMonth).length;
        });
        
        // Finally, return an object containing the current Year and the array of month counts
        return {
          label: Year.toString(),
          data: getMonthCounts,
        };
      });
    
    
    // Destroy canvas in the <div> container and reinitialise to create the new Chart
    d3.select("#chartContainer1").html("");
    d3.select("#chartContainer1").html("<canvas id='jsChart_TimeSeries' width='100%' height='100%'></canvas>");


    // select the Canvas HTML element for the Chart 
    const tsCanvas = document.getElementById("jsChart_TimeSeries").getContext('2d');
    
    // Create a new object containing option configurations for the Time Series Plot where... 
    const chartOptions = {
        scales: {
            x: {
                type: 'category',                                       // X axis is of type 'category' NOT 'time' (monthLabels are not of date data type, but are sequenced in chronological order)
                labels: monthLabels,                                    // Labels = array of months
                ticks: {
                    font: {
                        weight: 'bold'                                  // Font style for X-ticks = bold
                    }
                }                
            },
            y: {
                beginAtZero: true,                                      // Y axis range starts from 0
                ticks: {
                    font: {
                        weight: 'bold'                                  // Font style for Y-ticks = bold
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: "Time Series Plot - No. Crime Incidents",         // Title = Time Series Plot - No. Crime Incidents
                fontSize: 48,                                           // Title Font Size = 48
                fontStyle: 'bold'                                       // Title Font Style = bold
            }
        }
        
        
    };

    const tsChart = new Chart(tsCanvas, {
        type: 'line',
        data: {
            labels: monthLabels,        // X Axis Labels = Calendar Months
            datasets: tsData            // Datasets = Array of 'Year With Counts per Calendar Month' Objects 
        },
        options: chartOptions           // Options = Chart Options object to enable Title and configure axis presentation

    });
    

};


// Callback function to built the interactive Dropdown Menus (called only during StartUp) 
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
        }).multiselect('select', [arrayAreas[0], arrayAreas[1]]); // By default, select the first two Area Name options upon generation (during Startup)

        $('#selCrime').multiselect({
            enableResetButton: true,
            nonSelectedText:'Crime',
            nSelectedText  : "Crime(s)",
            allSelectedText: "All crimes",
            numberDisplayed: 0.5 
        }).multiselect('select', [arrayCrimes[0], arrayCrimes[1]]);  // By default, select the first two Crime Category options upon generation (during Startup)
    });
};


// Callback function to built the double-handle Slider (called only during StartUp) 
const build_Slider = (arrayYears) => {
    // Creating year slider
    var year_slider = new rSlider({
        target: '#selYear',
        values: arrayYears,
        range: true,
        tooltip: false,
        scale: true,
        labels: true,
        set: [arrayYears[0], arrayYears[1]],   // By default, select the first two Years upon generation (during Startup)
        width: '300%'
    });
};