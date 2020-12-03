function get_mono_colorMap(data_range){

    // set the 2 colors for transition colors
    low_color = 'white'
    high_color = 'green'

    // set the custom color mapping between values and colors
    var custom_colorMap = d3.scaleLinear().domain(data_range)
                                .range([low_color, high_color])

    return custom_colorMap
}

function get_multi_colorMap(data_range){

    // set the 3 colors for transition colors
    low_color = 'red'
    mid_color = 'white'
    high_color = 'green'

    // set the custom color mapping between values and colors
    var custom_colorMap = d3.scaleLinear().domain(data_range)
                                .range([low_color,mid_color, high_color])

    return custom_colorMap
}

function fill_csv_test(svg, data_var, is_mono_colorMap){
    d3.csv("data/test_data.csv",function(data) {

        // get the min and max from the current data column to for making a color map
        var data_min = d3.min(data, function(d) { return +d[data_var]; });
        var data_max = d3.max(data, function(d) { return +d[data_var]; });

        // make custom color map depending on the variable type
        if(is_mono_colorMap){
            var custom_colorMap = get_mono_colorMap([data_min,data_max])
        }
        else{
            var custom_colorMap = get_multi_colorMap([data_min,0,data_max])
        }                          

        // fill each country with the color respective to its value in the colormap
        data.forEach(function(d) {
            svg.select('#'+d['id'])
                .style("fill", custom_colorMap(d[data_var]));
        });
    });
}