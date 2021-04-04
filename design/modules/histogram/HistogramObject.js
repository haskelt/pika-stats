{{project.js_copyright_notice}}

import d3 from '{{project.site_path}}/js/d3/d3.v6.5.0.js?v={{project.version}}';

class HistogramObject {

    /**************************************************************************/

    constructor () {
	
	this.color = "steelblue";
	this.height = 500;
	this.width = 500;
	this.margin = ({top: 20, right: 20, bottom: 30, left: 40});

    } // constructor
    
    /**************************************************************************/

    createYAxis (yAxisTitle) {

	/* create a group to hold the axis, which is drawn/redrawn on
	   a data update */
	this.yAxis = this.svg.append("g")
	    .attr("class", "y-axis")
	    .attr("transform", "translate("+this.margin.left+", 0)");

	// create an axis title
	this.svg.append("svg:text")
	    .attr("transform", "rotate(-90 " + this.margin.left + " " + (this.margin.top + this.height/2) + ")")
	    .attr("x", this.margin.left)
	    .attr("y", this.margin.top + this.height/2)
	    .style("text-anchor", "middle")
	    .text(yAxisTitle);

    } // createYAxis
    
    /**************************************************************************/

    createXAxis (xAxisTitle) {

	/* create a group to hold the axis, which is drawn/redrawn on
	   a data update */
	this.xAxis = this.svg.append("g")
	    .attr("transform", `translate(0,${this.height - this.margin.bottom})`);
	
	// create an axis title
	this.svg.append("svg:text")
	    .attr("x", this.width - this.margin.right)
	    .attr("y", this.margin.top + this.height)
	    .attr("fill", "currentColor")
	    .attr("font-weight", "bold")
	    .attr("text-anchor", "end")
	    .text(xAxisTitle);
	
    } // createXAxis

    /**************************************************************************/

    createChart (yAxisTitle, xAxisTitle) {

	this.svg = d3.create("svg")
	      .attr("viewBox", [0, 0, this.margin.left + this.width + this.margin.right, this.margin.top + this.height + this.margin.bottom]);
	
	this.plotArea = this.svg.append("g")
	    .attr("fill", this.color);

	this.createYAxis(yAxisTitle);
	this.createXAxis(xAxisTitle);
	
	return this.svg.node();

    } // createChart

    /**************************************************************************/

    updateData (data) {

	console.log(data);
	this.data = data;
	this.bins = d3.bin().thresholds(30)(data);
	this.x = d3.scaleLinear()
	    .domain([this.bins[0].x0, this.bins[this.bins.length - 1].x1])
	    .range([this.margin.left, this.width - this.margin.right]);

	this.y = d3.scaleLinear()
	    .domain([0, d3.max(this.bins, d => d.length)]).nice()
	    .range([this.height - this.margin.bottom, this.margin.top]);

    } // updateData
    
    /**************************************************************************/
    
    updateBars () {
	
	this.plotArea.selectAll("rect")
	    .data(this.bins)
	    .join("rect")
	    .attr("x", d => this.x(d.x0) + 1)
	    .attr("width", d => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
	    .attr("y", d => this.y(d.length))
	    .attr("height", d => this.y(0) - this.y(d.length));

    } // updateBars
	
    /**************************************************************************/
    
    updateYAxis () {

	this.yAxis.call(d3.axisLeft(this.y).ticks(this.height / 40))
	    .call(g => g.select(".domain").remove());
	
    } // updateYAxis

    /**************************************************************************/

    updateXAxis () {
	
	this.xAxis.call(d3.axisBottom(this.x).ticks(this.width / 80 ).tickSizeOuter(0))
	
    } // updateXAxis

    /**************************************************************************/

    updateChart (data) {

	console.log('updating chart');
	console.log(data);
	this.updateData(data);
	this.updateBars();
	this.updateYAxis();
	this.updateXAxis();
	
    } // updateChart
    
    /**************************************************************************/

} // HistogramObject

export default HistogramObject;
