$(document).ready(function() {
    $('#area').multiselect({
        nonSelectedText:'Area',
        allSelectedText: "All areas",
    });

    $('#crime').multiselect({
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