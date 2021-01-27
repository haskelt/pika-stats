// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import d3 from '/js/d3/d3.v6.5.0.js';

class Graph {

    /*------------------------------------------------------------------------*/

    static initialize () {

	this.data = [[4, 8], [15, 16], [23, 42]];
	this.graphElement = document.querySelector('#graph');
	this.makeGraph();
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static configureYScale () {

	this.y = d3.scaleLinear()
	    .domain([0, d3.max(this.data)])
	    .range([0, this.height])

	this.yPos = d3.scaleLinear()
	    .domain([0, d3.max(this.data)])
	    .range([this.height, 0])
	
    } // configureYScale
    
    /*------------------------------------------------------------------------*/

    static configureXScale () {

	this.x = d3.scaleBand()
	    .domain(d3.range(this.data.length))
	    .range([0, this.width]);

    } // configureXScale

    /*------------------------------------------------------------------------*/

    static makeGraph () {
	
	this.width = 320;
	this.height = 320;
	this.configureXScale();
	this.configureYScale();
	
	this.svg = d3.create("svg")
	      .attr("width", this.width)
	      .attr("height", this.height)
	      .attr("font-family", "sans-serif")
	      .attr("font-size", "10")
	      .attr("text-anchor", "end");
	
	const bar = this.svg.selectAll("line")
	      .data(this.data)
	      .join("line")
	      .attr("x1", 0)
	      .attr("x2", this.width)
	      .attr("y1", (d, i) => d[0])
	      .attr("y2", (d, i) => d[1])
//	      .attr("transform", (d, i) => `translate(${this.x(i)}, 0)`)
	      .attr("class", "line")
	      .style("stroke", "black");
	
/*	bar.append("rect")
	    .attr("fill", "steelblue")
	    .attr("width", this.x.bandwidth() - 1)
	    .attr("y", this.yPos)
	    .attr("height", this.y)
	    .attr("class", "bar");
*/	
	this.graphElement.appendChild(this.svg.node());
	
    } // makeGraph
	
    /*------------------------------------------------------------------------*/

    static updateValues (values) {

	for(let line in this.data){
	    for(let point in this.data[line]){
		this.data[line][point] = Math.random() * 200;
	    }
	}
	this.configureYScale();
	// Update selection: Resize and position existing 
	// DOM elements with data bound to them.
	this.svg.selectAll(".line").data(this.data)
	    .attr("y1", (d, i) => d[0])
	    .attr("y2", (d, i) => d[1]);

//	    .style("height", function(d){ 
//		return d + "px"; 
//	    })
//	    .style("margin-top", function(d){ 
//		return (100 - d) + "px"; 
//	    });
	
    } // updateValues
    
    /*------------------------------------------------------------------------*/
    
} // Graph

Graph.initialize();
export default Graph;