// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import descriptives from '/pika-stats/js/descriptives/descriptives.js?v=0.5.1-alpha';
import graph from '/pika-stats/js/graph/graph.js?v=0.5.1-alpha';
import anova from '/pika-stats/js/anova/anova.js?v=0.5.1-alpha';

class DataManager {

    static initialize () {

	this.data = {
	    factors: [{"name": "Taste", "levels": ["Sour", "Sweet"]}, {"name": "Color", "levels": ["Red", "Blue"]}],
	    dv: "Candies Eaten",
	    cellMeans: [[0, 0], [0, 0]],
	    marginalMeans: [[0, 0], [0, 0]],
	    grandMean: 0,
	    sd: 50,
	    n: 15
	};
	this.data.se = this.data.sd / Math.sqrt(this.data.n);

	descriptives.initialize(this.data);
	graph.initialize(this.data);
	this.stats = anova.initialize(this.data);
	
    } // initialize
    
    /*------------------------------------------------------------------------*/

    static update () {
	var maxSigP = .02;
	var minNonSigP = .4;
	var total, borderlineEffects;

	do {
	    total = 0;
	    for(let row in this.data.factors[0]['levels']){
		for(let col in this.data.factors[1]['levels']){
		    this.data.cellMeans[row][col] = Math.random() * 100 + 20;
		    total += this.data.cellMeans[row][col];
		}
	    }
	    this.data.grandMean = total / (this.data.factors[0]['levels'].length * this.data.factors[1]['levels'].length);
	    
	    this.data.marginalMeans[0][0] = d3.mean([this.data.cellMeans[0][0], this.data.cellMeans[1][0]]);
	    this.data.marginalMeans[0][1] = d3.mean([this.data.cellMeans[0][1], this.data.cellMeans[1][1]]);
	    this.data.marginalMeans[1][0] = d3.mean([this.data.cellMeans[0][0], this.data.cellMeans[0][1]]);
	    this.data.marginalMeans[1][1] = d3.mean([this.data.cellMeans[1][0], this.data.cellMeans[1][1]]);
	    
	    anova.updateStats();

	    borderlineEffects = false;
	    for(let effect of ['0', '1', 'Int']){
		if(this.stats['p-' + effect] > maxSigP && this.stats['p-' + effect] < minNonSigP){
		    borderlineEffects = true;
		    break;
		}
	    }
	} while (borderlineEffects);
	
	descriptives.update();
	graph.update();
	anova.updateTable();
	
    } // regenerate
    
    /*------------------------------------------------------------------------*/
    
} // DataManager

export default DataManager;