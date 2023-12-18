/*
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////// [Charts / D3 JavaScript] Visualisations for Los Angeles Crime Data //////////////
///////////////////////////////////////////////////////////////////////////////////////////////
*/

// Define variable to store the fetched JSON Dataset; used beyond Step #1
let crimeData;

// Get URL of the Python Flask API as Constant; not going to be altered
const apiURL = 'http://127.0.0.1:5000';

const optionAPI = '/api/v1.0/filter_options'
const optionURL = apiURL + optionAPI

// Using D3, fetch the Belly Button Biodiversity (JSON) Dataset from the specified URL 
// Once successful, THEN pass through the loaded JSON dataset as an argument to the following callback function where...
d3.json(optionURL).then(jsonData => {
    // The loaded JSON Dataset is stored in the nominated variable
    optionData = jsonData;
  
    // The dropdown menu (<select> HTML element from the HTML file) with ID 'selCrime' is referenced and stored in a new Constant
    // The array of all crime category elements from the 'crime_categories' key of the JSON dataset is stored in a new Constant
    // CHANGE HERE
    const ddCrime = d3.select("#selCrime");
    const crimeCats = optionData.crime_categories;

    // For every crimeCat element in the array of crimeCats...
    // Append the list of options in the dropdown menu with the current crimeCat element where...
    // The display text of the appended option is the current crimeCat element
    // The value property of the appended option is also the current crimeCat element
    crimeCats.forEach(crimeCat => {
        ddCrime.append("option").text(crimeCat).property("value", crimeCat);
    });

    
    // The dropdown menu (<select> HTML element from the HTML file) with ID 'selArea' is referenced and stored in a new Constant
    // The array of all area name elements from the 'area_names' key of the JSON dataset is stored in a new Constant
    // CHANGE HERE
    const ddArea = d3.select("#selArea");
    const areaNames = optionData.area_names;


    // For every crimeCat element in the array of crimeCats...
    // Append the list of options in the dropdown menu with the current crimeCat element where...
    // The display text of the appended option is the current crimeCat element
    // The value property of the appended option is also the current crimeCat element
    areaNames.forEach(areaName => {
        ddArea.append("option").text(areaName).property("value", areaName);
    });    


    $(document).ready(function() {
        $('#selArea').multiselect({
            nonSelectedText:'Area',
            allSelectedText: "All areas",
        });
    
        $('#selCrime').multiselect({
            nonSelectedText:'Crime',
            allSelectedText: "All crimes",
        });
    });
    
    var year_slider = new rSlider({
        target: '#year',
        values: [2020, 2021, 2022, 2023, 'Latest'],
        range: true,
        tooltip: false,
        scale: true,
        labels: true,
        set: [2022, 2023],
        width: '300%'
    });

    
    // Initialise all plots & display using the first (default) nameID element from the array
    // By default, the dropdown menu will also have the first nameID element selected
    // init_AllPlots(nameIDs[0], myData)
    
});



/*
const optionChanged = (thisValue) => {
// All plots in the interactive board are re-initialised when a new subject ID from the dropdown list is selected
init_AllPlots(thisValue, myData);
};
*/
  