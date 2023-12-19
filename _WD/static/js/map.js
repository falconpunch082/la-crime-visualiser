const callAll = '/api/v1.0/all_data';
const callAllURL = apiURL + callAll;

d3.json(callAllURL).then(jsonData => {
    resultData = jsonData["crime_data"];

    let marks = L.markerClusterGroup();
    let hm_pts = [];

    for(i = 0; i < resultData.length; i++) {
        let datapoint = resultData[i];

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

        function popup(cat, c_c, c_d, ar, st, x, p, o_d, o_t, r, ag, s, d) {
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

        hm_pts.push({lat: datapoint["lat"], lng: datapoint["lon"], count: 1});
        marks.addLayer(L.marker(coords).bindPopup(popup(category, code, descp, area, street, x_str, premise, occ_date, occ_time, rep, age, sex, descent)));

    }

    // Setting tile layer
    let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
                                {
                                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                }
                            );

    let satelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
                                {
                                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                }
                            );

    let baseMaps = {
        "Street View": street,
        "Satelite View": satelite
    }

    let cfg = {
        "radius": 40,
        "useLocalExtrema": true,
        valueField: 'count'
    }

    let heatmap = new HeatmapOverlay(cfg);

    heatmap.setData({
        data: hm_pts
    });
    
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
                            maxZoom: 20,
                            layers: [street, marks]
                            }
                        );
    
    L.control.layers(baseMaps, overlayMaps).addTo(crime_map);
});

