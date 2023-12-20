// API call
const callAll = '/api/v1.0/all_data';
const callAllURL = apiURL + callAll;

// then wrapper to ensure that data is retrieved before anything else occurs
d3.json(callAllURL).then(jsonData => {
    // Declaring resultData as the contents of pulled data's 'crime_data'
    resultData = jsonData["crime_data"];

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

    // Setting tile layers
    // Street view
    let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
                                {
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                }
                            );
    // Satelite view
    let satelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
                                {
                                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                }
                            );
    // Declaring base tile layers for layer control
    let baseMaps = {
        "Street View": street,
        "Satelite View": satelite
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
});

