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

        // add tooltip event on all countries and info button
        add_tooltip_event_countries();
        add_tooltip_event_info();
        hideDDM2_extraOptions();

        // remove the next 3 lines once implemented
        document.getElementById('rank-attribute').selectedIndex = 0;
        document.getElementById('rank-type').selectedIndex = 0;
        var svg = d3.select('#world-map-svg')
        fill_csv(svg, global_rank_function + '_' + global_rank_type, global_is_mono, global_isAscending);

    }
    else{
        setTimeout(init_svg, 100); 
    }
    
}

function hideDDM2_extraOptions(){
    d3.selectAll('.compare_metric')
        .style('display','none');
}

function showDDM2_extraOptions(){
    d3.selectAll('.compare_metric')
        .style('display','');
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
            .attr("show_rc", function(d) {return d.show_ddm2;}) //makes the column type to understand if this has rank change
    
        // add an event when the option is selected
        $( "#rank-attribute" ).change(function() {
            // update the selected rank function in global
            global_rank_function = $(this).children(":selected").attr("col_name")

            // reset the second ddm
            global_rank_type = 'rank'
            global_is_mono = 1
            document.getElementById('rank-type').selectedIndex = 0;
            global_isAscending = 0

            if(global_rank_function){
                showDDM2_extraOptions();
            }
            else{
                hideDDM2_extraOptions();
            }

            // call the filling function for current selected attributes anf their color scheme
            reset_svg_fill();
            fill_csv(svg, global_rank_function + '_' + global_rank_type, global_is_mono, global_isAscending);
          })

        // options = d3.select('#rank-type')
        //     .selectAll('option')
            
        $( "#rank-type" ).change(function() {
                // update the selected rank function detail type in global
                global_rank_type = $(this).children(":selected").attr('col_name')
                global_is_mono = $(this).children(":selected").attr('color_scheme')
                global_isAscending = $(this).children(":selected").attr('ascend_order')

                // call the filling function for current selected attributes anf their color scheme
                reset_svg_fill();
                fill_csv(svg, global_rank_function + '_' + global_rank_type, global_is_mono, global_isAscending);
            })
    
    });

}

init_svg();

// setting global variables
global_rank_function = 'Ladder score'
global_rank_type = 'rank'
global_is_mono = 1
global_isAscending = 0