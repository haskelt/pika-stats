/* Adapted from a template created by Yan Holtz and found at 
   https://www.d3-graph-gallery.com/graph/custom_legend.html */

import d3 from './d3.v6.5.0.js';

class D3Legend {

/*****************************************************************************/

    constructor () {

    } // constructor

/*****************************************************************************/

    addLegend (target_element_id, position, title, color_mapping) {

	var size = 20;

	// select the svg area
	var legend = d3.select("#"+target_element_id)
	    .append("g");
	
	// Add a legend title
	legend.append("text")
	    .attr("x", position.x)
	    .attr("y", position.y)
	    .text(title)
	    .attr("text-anchor", "start")
	    .style("alignment-baseline", "middle");

	// Add one dot in the legend for each name.
	legend.selectAll("mydots")
	    .data(color_mapping.domain())
	    .enter()
	    .append("rect")
	    .attr("x", position.x)
	    .attr("y", function(d,i){ return position.y + (i+1)*(size+5)})
	    .attr("width", size)
	    .attr("height", size)
	    .style("fill", function(d){ return color_mapping(d)})
	    .style("stroke", "black");
	
	// Add one label in the legend for each name.
	legend.selectAll("mylabels")
	    .data(color_mapping.domain())
	    .enter()
	    .append("text")
	    .attr("x", position.x + size*1.5)
	    .attr("y", function(d,i){ return position.y + (i+1)*(size+5) + (size/2)})
	    .style("fill", function(d){ return color_mapping(d)})
	    .text(function(d){ return d})
	    .attr("text-anchor", "start")
	    .style("alignment-baseline", "middle");
	
	return legend;

    } // addLegend

/*****************************************************************************/

}

export default new D3Legend();