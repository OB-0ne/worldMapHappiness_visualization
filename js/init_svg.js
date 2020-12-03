// Add the SVG object to the page
d3.xml("svg/world-new.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById('world-map').appendChild(xml.documentElement);
});


function get_IDs(){
    
    var svg = d3.select('#world-map-svg')
    
    svg.selectAll('path')
        .each(function(d){
            console.log(d3.select(this).attr('id'),d3.select(this).attr('data-name'))
        })
}

function reset_svg_fill(){
    // add a default grey color to all countries to begin with
    d3.select('#world-map-svg')
        .selectAll('path')
        .style('fill', 'grey');
}

// Initialize with default settings
// Checks if the svg is loaded or tries again
function init_svg(){

    if(document.getElementById('world-map-svg')){
        
        // set svg fill to default
        reset_svg_fill();

        // generate the dropdwon with custom rank names
        makeDDM();

        // remove the next 3 lines once implemented
        var svg = d3.select('#world-map-svg')
        // fill_csv_test(svg, 'rank', 1);
        fill_csv_test(svg, 'rank change', 0);
    }
    else{
        setTimeout(init_svg, 100); 
    }
    
}


function makeDDM(){

    var svg = d3.select('#world-map-svg')
    var control_name = 'data/ddm_control.csv'

    d3.csv(control_name, function(data){

        // set the default rank function
        global_rank_function = data[0].col_name

        // select all options in the first dropdown and reset them
        var options = d3.select('#rank-attribute')
            .selectAll('option')
            .data(data)
            .enter()
            .append('option');    

        // using the data, add the column names and their corresponding titles
        options.text(function(d) {return d.fe_title;})  //makes the dropdown with this value as options
            .attr("col_name", function(d) {return d.col_name;}) //makes the col_name which needs to be called to fill
    
        // add an event when the option is selected
        options.on("click", function() {
            // update the selected rank function in global
            global_rank_function = this.getAttribute('col_name')
            // call the filling function for current selected attributes anf their color scheme
            reset_svg_fill();
            fill_csv_test(svg, global_rank_function + '_' + global_rank_type, global_is_mono);
          })

        options = d3.select('#rank-type')
            .selectAll('option')
            .on("click", function() {
                // update the selected rank function detail type in global
                global_rank_type = this.getAttribute('col_name')
                // call the filling function for current selected attributes anf their color scheme
                reset_svg_fill();
                fill_csv_test(svg, global_rank_function + '_' + global_rank_type, global_is_mono);
            })
    
    });

}

init_svg();

// setting global variables
global_rank_function = ''
global_rank_type = 'rank'
global_is_mono = 1