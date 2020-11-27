// Add the SVG object to the page
d3.xml("world-new.svg").mimeType("image/svg+xml").get(function(error, xml) {
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

// Initialize with default settings
// Checks if the svg is loaded or tries again
function init_svg(){

    if(document.getElementById('world-map-svg')){
        
        var colors = ['red','blue','yellow','green','orange'];
        
        d3.select('#world-map-svg')
            .selectAll('path')
            .style("fill", colors[Math.floor(Math.random()*5)]);

        // get_IDs();

        var svg = d3.select('#world-map-svg')
        // fill_csv_test(svg, 'rank', 1);
        fill_csv_test(svg, 'rank change', 0);
    }
    else{
        setTimeout(init_svg, 100); 
    }
    
}
init_svg();

