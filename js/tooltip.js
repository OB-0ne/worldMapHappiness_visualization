function hover_tooltip(){

    var svg = d3.select(this);
    var tooltip = d3.select('#tooltip');

    tooltip
        .style('left', (d3.event.pageX + 14) + "px")
        .style('top', (d3.event.pageY - 10) + "px");
    tooltip.innerHTML = svg.attr('id');
}

function show_tooltip(){
    d3.select('#tooltip').style('display', 'block').transition().duration(750);
    d3.select('#tt_country').text(d3.select(this).attr('data-name'));
    d3.select('#tt_value').text(global_rank_type + ": " + d3.select(this).attr('curr_val'));
    d3.select('#tt_flag').attr('src','https://www.countryflags.io/' + d3.select(this).attr('id') + '/flat/32.png')
}

function hide_tooltip(){
    d3.select('#tooltip').style('display', 'none').transition().duration(750);
}

function hover_tooltip_info(){

    var svg = d3.select(this);
    var tooltip = d3.select('#tooltip-info');

    tooltip
        .style('left', (d3.event.pageX + 14) + "px")
        .style('top', (d3.event.pageY - 10) + "px");
    tooltip.innerHTML = svg.attr('id');
}

function show_tooltip_info(){
    d3.select('#tooltip-info').style('display', 'block').transition().duration(750);
}

function hide_tooltip_info(){
    d3.select('#tooltip-info').style('display', 'none').transition().duration(750);
}

function add_tooltip_event_countries(){

    // select all the country svgs
    var all_svgs = d3.select("#world-map-svg").selectAll('path');
    
    // a move hover and remove effect
    all_svgs.on('mousemove', hover_tooltip);
    all_svgs.on('mouseover', show_tooltip);
    all_svgs.on('mouseout', hide_tooltip);
    
}

function add_tooltip_event_info(){

    // select all the country svgs
    var icon = d3.select("#info-icon");
    
    // a move hover and remove effect
    icon.on('mousemove', hover_tooltip_info);
    icon.on('mouseover', show_tooltip_info);
    icon.on('mouseout', hide_tooltip_info);
    
}