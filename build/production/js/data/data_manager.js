// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import descriptives from '/pika-stats/js/descriptives/descriptives.js?v=0.2.0-alpha';
import graph from '/pika-stats/js/graph/graph.js?v=0.2.0-alpha';
import anova from '/pika-stats/js/anova/anova.js?v=0.2.0-alpha';

class DataManager {

    static initialize () {

	this.data = {
	    factors: [{"name": "Taste", "levels": ["Sour", "Sweet"]}, {"name": "Color", "levels": ["Red", "Blue"]}],
	    dv: "Candies Eaten",
	    cellMeans: [[0, 0], [0, 0]],
	    marginalMeans: [[0, 0], [0, 0]]
	};
	descriptives.initialize(this.data);
	graph.initialize(this.data);
	anova.initialize(this.data);
	
    } // initialize
    
    /*------------------------------------------------------------------------*/

    static update () {

	for(let row in this.data.cellMeans){
	    for(let col in this.data.cellMeans[row]){
		this.data.cellMeans[row][col] = Math.random() * 100;
	    }
	}
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