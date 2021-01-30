// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import d3 from '/pika-stats/js/d3/d3.v6.5.0.js?v=0.5.1-alpha';
import d3legends from '/pika-stats/js/d3/d3.legends.js?v=0.5.1-alpha';

class Graph {

    /*------------------------------------------------------------------------*/

    static initialize (data) {

	this.graphElement = document.querySelector('#graph');
	this.data = data;
	this.graphBuilt = false;

	this.width = 120;
	this.height = 120;
	this.margin = 40;
	this.xLevels = ['Level 1', 'Level 2'];
	this.y = d3.scaleLinear()
	    .range([this.height + this.margin, this.margin]);
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static configureYScale () {

	var minY = Number.POSITIVE_INFINITY;
	var maxY = Number.NEGATIVE_INFINITY;
	for(let row in this.data.cellMeans){
	    for(let col in this.data.cellMeans[row]){
		if(this.data.cellMeans[row][col] > maxY){
		    maxY = this.data.cellMeans[row][col];
		}
		if(this.data.cellMeans[row][col] < minY){
		    minY = this.data.cellMeans[row][col];
		}
	    }
	}
	var range = maxY - minY + 2 * this.data.se;
	
	this.y.domain([minY - this.data.se - .15 * range, maxY + this.data.se + .15 * range]);
	    
	this.yPos = d3.scaleLinear()
	    .domain([minY, maxY])
	    .range([this.height + this.margin, this.margin])
	
    } // configureYScale
    
    /*------------------------------------------------------------------------*/

    static configureXScale () {

	this.x = d3.scalePoint()
	    .domain(this.data.factors[0]['levels'])
	    .range([this.margin, this.width + this.margin])
	    .padding(.15);

    } // configureXScale

    /*------------------------------------------------------------------------*/

    static buildGraph () {

	this.configureXScale();
	this.configureYScale();
	
	this.svg = d3.select("#graph-svg")
	    .attr("viewBox", "0 0 260 220")
	    .attr("font-family", "sans-serif")
	    .attr("font-size", "10")
	    .attr("text-anchor", "end");

	var xColorScale = d3.scaleOrdinal()
	    .domain(this.data.factors[1]['levels'])
	    .range([d3.color('hsl(10, 90%, 40%)'), `#584c77`]);
//	    .range('d3.schemePaired);

	var xLineStyleScale = d3.scaleOrdinal()
	    .domain(this.data.factors[1]['levels'])
	    .range(['5 0', '2 2']);

	this.svg.selectAll("line")
	    .data(this.data.cellMeans)
	    .join("line")
	    .attr("x1", this.x(this.data.factors[0]['levels'][0]))
	    .attr("x2", this.x(this.data.factors[0]['levels'][1]))
	    .attr("y1", (d, i) => this.y(d[0]))
	    .attr("y2", (d, i) => this.y(d[1]))
	    .attr("class", "line")
	    .style("stroke", (d, i) => xColorScale(this.data.factors[1]['levels'][i]))
	    .style("stroke-width", 2)
	    .style("stroke-dasharray", (d, i) => xLineStyleScale(i));

	this.svg.selectAll(".leftErrorBar")
	    .data(this.data.cellMeans)
	    .join("line")
	    .attr("x1", this.x(this.data.factors[0]['levels'][0]))
	    .attr("x2", this.x(this.data.factors[0]['levels'][0]))
	    .attr("y1", (d, i) => this.y(d[0]-this.data.se))
	    .attr("y2", (d, i) => this.y(d[0]+this.data.se))
	    .attr("class", "leftErrorBar")
	    .style("stroke", "black")
	    .style("stroke-width", 1);

	this.svg.selectAll(".leftErrorTop")
	    .data(this.data.cellMeans)
	    .join("line")
	    .attr("x1", this.x(this.data.factors[0]['levels'][0]) - 5)
	    .attr("x2", this.x(this.data.factors[0]['levels'][0]) + 5)
	    .attr("y1", (d, i) => this.y(d[0]+this.data.se))
	    .attr("y2", (d, i) => this.y(d[0]+this.data.se))
	    .attr("class", "leftErrorTop")
	    .style("stroke", "black")
	    .style("stroke-width", 1);

	this.svg.selectAll(".leftErrorBottom")
	    .data(this.data.cellMeans)
	    .join("line")
	    .attr("x1", this.x(this.data.factors[0]['levels'][0]) - 5)
	    .attr("x2", this.x(this.data.factors[0]['levels'][0]) + 5)
	    .attr("y1", (d, i) => this.y(d[0]-this.data.se))
	    .attr("y2", (d, i) => this.y(d[0]-this.data.se))
	    .attr("class", "leftErrorBottom")
	    .style("stroke", "black")
	    .style("stroke-width", 1);

	this.svg.selectAll(".rightErrorBar")
	    .data(this.data.cellMeans)
	    .join("line")
	    .attr("x1", this.x(this.data.factors[0]['levels'][1]))
	    .attr("x2", this.x(this.data.factors[0]['levels'][1]))
	    .attr("y1", (d, i) => this.y(d[1]-this.data.se))
	    .attr("y2", (d, i) => this.y(d[1]+this.data.se))
	    .attr("class", "rightErrorBar")
	    .style("stroke", "black")
	    .style("stroke-width", 1);

	this.svg.selectAll(".rightErrorTop")
	    .data(this.data.cellMeans)
	    .join("line")
	    .attr("x1", this.x(this.data.factors[0]['levels'][1]) - 5)
	    .attr("x2", this.x(this.data.factors[0]['levels'][1]) + 5)
	    .attr("y1", (d, i) => this.y(d[1]+this.data.se))
	    .attr("y2", (d, i) => this.y(d[1]+this.data.se))
	    .attr("class", "rightErrorTop")
	    .style("stroke", "black")
	    .style("stroke-width", 1);

	this.svg.selectAll(".rightErrorBottom")
	    .data(this.data.cellMeans)
	    .join("line")
	    .attr("x1", this.x(this.data.factors[0]['levels'][1]) - 5)
	    .attr("x2", this.x(this.data.factors[0]['levels'][1]) + 5)
	    .attr("y1", (d, i) => this.y(d[1]-this.data.se))
	    .attr("y2", (d, i) => this.y(d[1]-this.data.se))
	    .attr("class", "rightErrorBottom")
	    .style("stroke", "black")
	    .style("stroke-width", 1);
	
	var x_axis_builder = d3.axisBottom(this.x);
	this.svg.append("g")
	    .attr("transform", "translate(0 ,"+(this.height + this.margin)+")")
	    .call(x_axis_builder);
	
	this.svg.append("svg:text")
	    .attr("x", this.margin + this.width / 2)
	    .attr("y", this.height + this.margin * 1.75)
	    .style("text-anchor", "middle")
	    .text(this.data.factors[0]['name']);

	this.legend = d3legends.addLegend('graph-svg', { x: this.width + 2*this.margin, y: this.margin }, this.data.factors[1]['name'], xColorScale);
	
	this.yAxisBuilder = d3.axisLeft(this.y);
	this.svg.append("g")
	    .attr("class", "y-axis")
	    .attr("transform", "translate("+this.margin+", 0)")
	    .call(this.yAxisBuilder);

	this.y_axis_title = this.svg.append("svg:text")
	    .attr("transform", "rotate(-90)")
	    .attr("x", 0 - this.height / 2 - this.margin)
	    .attr("y", this.margin * .25 )
	    .style("text-anchor", "middle")
	    .text(this.data.dv);
	
	this.graphElement.appendChild(this.svg.node());

	this.graphBuilt = true;
	
    } // buildGraph
	
    /*------------------------------------------------------------------------*/

    static update () {

	if(!this.graphBuilt){
	    this.buildGraph();
	}
	
	this.configureYScale();
	// Update selection: Resize and position existing 
	// DOM elements with data bound to them.
	this.svg.selectAll(".line")
	    .attr("y1", (d, i) => this.y(d[0]))
	    .attr("y2", (d, i) => this.y(d[1]));

	this.svg.selectAll(".leftErrorBar")
	    .attr("y1", (d, i) => this.y(d[0]-this.data.se))
	    .attr("y2", (d, i) => this.y(d[0]+this.data.se))

	this.svg.selectAll(".leftErrorTop")
	    .attr("y1", (d, i) => this.y(d[0]+this.data.se))
	    .attr("y2", (d, i) => this.y(d[0]+this.data.se))

	this.svg.selectAll(".leftErrorBottom")
	    .attr("y1", (d, i) => this.y(d[0]-this.data.se))
	    .attr("y2", (d, i) => this.y(d[0]-this.data.se))

	this.svg.selectAll(".rightErrorBar")
	    .attr("y1", (d, i) => this.y(d[1]-this.data.se))
	    .attr("y2", (d, i) => this.y(d[1]+this.data.se))

	this.svg.selectAll(".rightErrorTop")
	    .attr("y1", (d, i) => this.y(d[1]+this.data.se))
	    .attr("y2", (d, i) => this.y(d[1]+this.data.se))

	this.svg.selectAll(".rightErrorBottom")
	    .attr("y1", (d, i) => this.y(d[1]-this.data.se))
	    .attr("y2", (d, i) => this.y(d[1]-this.data.se))

	this.svg.select(".y-axis")
	    .call(this.yAxisBuilder);

    } // update
    
    /*------------------------------------------------------------------------*/
    
} // Graph

export default Graph;