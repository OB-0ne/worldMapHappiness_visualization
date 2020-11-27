function get_mono_colorMap(data_range){

    low_color = 'white'
    high_color = 'green'

    console.log(data_range)
    var custom_colorMap = d3.scaleLinear().domain(data_range)
                                .range([low_color, high_color])

    return custom_colorMap
}

function get_multi_colorMap(data_range){

    low_color = 'red'
    high_color = 'green'

    console.log(data_range)
    var custom_colorMap = d3.scaleLinear().domain(data_range)
                                .range([low_color,'white', high_color])

    return custom_colorMap
}

function fill_csv_test(svg, data_var, is_mono_colorMap){
    d3.csv("test_data.csv",function(data) {

        var data_min = d3.min(data, function(d) { return +d[data_var]; });
        var data_max = d3.max(data, function(d) { return +d[data_var]; });

        if(is_mono_colorMap){
            var custom_colorMap = get_mono_colorMap([data_min,data_max])
        }
        else{
            var custom_colorMap = get_multi_colorMap([data_min,0,data_max])
        }
                            
        console.log(custom_colorMap(52))
        console.log(data[0][data_var])                            

        data.forEach(function(d) {
            svg.select('#'+d['id'])
                .style("fill", custom_colorMap(d[data_var]));
        });
    });
}