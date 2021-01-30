{{ JS_COPYRIGHT_NOTICE }}

import descriptives from '{{SITE_PATH}}/js/descriptives/descriptives.js?v={{VERSION}}';
import graph from '{{SITE_PATH}}/js/graph/graph.js?v={{VERSION}}';
import anova from '{{SITE_PATH}}/js/anova/anova.js?v={{VERSION}}';

class DataManager {

    static initialize () {

	this.data = {
	    factors: [{"name": "Taste", "levels": ["Sour", "Sweet"]}, {"name": "Color", "levels": ["Red", "Blue"]}],
	    dv: "Candies Eaten",
	    cellMeans: [[0, 0], [0, 0]],
	    marginalMeans: [[0, 0], [0, 0]],
	    grandMean: 0
	};
	descriptives.initialize(this.data);
	graph.initialize(this.data);
	anova.initialize(this.data);
	
    } // initialize
    
    /*------------------------------------------------------------------------*/

    static update () {

	var total = 0;
	for(let row in this.data.factors[0]['levels']){
	    for(let col in this.data.factors[1]['levels']){
		this.data.cellMeans[row][col] = Math.random() * 100;
		total += this.data.cellMeans[row][col];
	    }
	}
	this.data.grandMean = total / (this.data.factors[0]['levels'].length * this.data.factors[1]['levels'].length);
	
	this.data.marginalMeans[0][0] = d3.mean([this.data.cellMeans[0][0], this.data.cellMeans[1][0]]);
	this.data.marginalMeans[0][1] = d3.mean([this.data.cellMeans[0][1], this.data.cellMeans[1][1]]);
	this.data.marginalMeans[1][0] = d3.mean([this.data.cellMeans[0][0], this.data.cellMeans[0][1]]);
	this.data.marginalMeans[1][1] = d3.mean([this.data.cellMeans[1][0], this.data.cellMeans[1][1]]);
	
	descriptives.update();
	graph.update();
	anova.update();
	
    } // regenerate
    
    /*------------------------------------------------------------------------*/
    
} // DataManager

export default DataManager;
