function make_legend(colormap, data_range, is_mono_colorMap){
    
    // set heightand width of the legend bar
    var w = 300, h = 50;

    // rmeove an old existing svg legend bar
    var key = d3.select("#legend")
        .select("svg")
        .remove();

    // make the svg for the legend
    var key = d3.select("#legend")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // kinda unsure what this does lol
    var legend = key.append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    // create the zero point for the legend
    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", colormap(data_range[0]))
        .attr("stop-opacity", 1);

    // create the mid point for the legend if needed
    if (is_mono_colorMap==0){
        legend.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", colormap(0))
            .attr("stop-opacity", 1);
    }
    
    // create the end point for the legend if needed
    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", colormap(data_range[1]))
        .attr("stop-opacity", 1);

    // add a rectangle object which actually has the colored legends
    key.append("rect")
        .attr("width", w)
        .attr("height", h - 30)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(0,10)");

    // set the scale and parameters for the legend bar
    var y = d3.scaleLinear()
        .range([0, 300])
        .domain(data_range);
  
    // add ticks on the the legend bar
    var yAxis = d3.axisBottom()
        .scale(y)
        .ticks(7);
  
    // add the numerical legends next to the legends
    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,30)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("axis title");
  
}

function get_mono_colorMap(data_range){

    // set the 2 colors for transition colors
    low_color = 'white'
    high_color = 'green'

    // set the custom color mapping between values and colors
    var custom_colorMap = d3.scaleLinear().domain(data_range)
                                .range([low_color, high_color]);

    return custom_colorMap
}

function get_multi_colorMap(data_range){

    // set the 3 colors for transition colors
    low_color = 'red'
    mid_color = 'white'
    high_color = 'green'

    // set the custom color mapping between values and colors
    var custom_colorMap = d3.scaleLinear().domain(data_range)
                                .range([low_color,mid_color, high_color]);

    return custom_colorMap
}

function fill_csv(svg, data_var, is_mono_colorMap, isAscending){
    d3.csv("data/final_scores_all_countries.csv",function(data) {

        // sort the data as needed
        // get the min and max from the current data column to for making a color map
        if(isAscending==1){
            var data_min = d3.min(data, function(d) { return +d[data_var]; });
            var data_max = d3.max(data, function(d) { return +d[data_var]; });
        }
        else{
            var data_min = d3.max(data, function(d) { return +d[data_var]; });
            var data_max = d3.min(data, function(d) { return +d[data_var]; });
        }

        // make custom color map depending on the variable type
        if(is_mono_colorMap==1){
            var custom_colorMap = get_mono_colorMap([data_min,data_max])
        }
        else{
            var custom_colorMap = get_multi_colorMap([data_min,0,data_max])
        }
        
        // make the legend for the colormap
        make_legend(custom_colorMap, [data_min,data_max], is_mono_colorMap);

        // fill each country with the color respective to its value in the colormap
        data.forEach(function(d) {
            svg.select('#'+d['svg-id'])
                .transition()
                .style("fill", custom_colorMap(d[data_var]))
                .attr('curr_val', d[data_var]);
        });
    });
}