function hover_tooltip(){

    var svg = d3.select(this);
    var tooltip = d3.select('#tooltip');

    tooltip
        .style('left', (d3.event.pageX + 14) + "px")
        .style('top', (d3.event.pageY - 10) + "px");
    tooltip.innerHTML = svg.attr('id');
}

function show_tooltip(){

    var type2field = {
        'rank': 'Rank',
        'score': 'Score',
        'rc': 'Rank Change',
        'arc': 'Rank Change (Absolute)'
    }

    d3.select('#tooltip').transition().style('display', 'block');
    d3.select('#tt_country').text(d3.select(this).attr('data-name'));
    d3.select('#tt_value').text(type2field[global_rank_type] + ": " + (d3.select(this).attr('curr_val')==null ? 'Not Available' : d3.select(this).attr('curr_val')));
    d3.select('#tt_flag').attr('src','https://flagcdn.com/40x30/' + d3.select(this).attr('id').toLowerCase() + '.png');

    if(global_rank_type=='rc'){
        if(d3.select(this).attr('curr_val')<0){
            d3.select('#tt_value').text(type2field[global_rank_type] + ": Improved " + Math.abs(d3.select(this).attr('curr_val')).toFixed(0) + ' place(s)');
        }
        else if(d3.select(this).attr('curr_val')>0){
            d3.select('#tt_value').text(type2field[global_rank_type] + ": Down " + Math.abs(d3.select(this).attr('curr_val')).toFixed(0) + ' place(s)');
        }
        else if(d3.select(this).attr('curr_val')==0){
            d3.select('#tt_value').text(type2field[global_rank_type] + ": No Change");
        }
    }
        
}

function hide_tooltip(){
    d3.select('#tooltip').transition().style('display', 'none');
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
    d3.select('#tooltip-info').transition().style('display', 'block');
}

function hide_tooltip_info(){
    d3.select('#tooltip-info').transition().style('display', 'none');
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