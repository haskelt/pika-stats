// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import d3 from '/pika-stats/js/d3/d3.v6.5.0.js?v=0.5.1-alpha';
import F from '/pika-stats/js/anova/F.js?v=0.5.1-alpha';

class Anova {

    /*------------------------------------------------------------------------*/

    static initialize (data) {

	this.data = data;

	var anovaElement = document.querySelector('#anova');

	var ids = ['SS-Error', 'DF-Error', 'MS-Error'];
	for(let factor of ['0', '1', 'Int']){
	    ids.push('label-' + factor);
	    ids.push('SS-' + factor);
	    ids.push('DF-' + factor);
	    ids.push('MS-' + factor);
	    ids.push('F-' + factor);
	    ids.push('p-' + factor);
	}
	this.tableCells = {};
	for(let id of ids){
	    this.tableCells[id] = anovaElement.querySelector('#' + id);
	}

	for(let factor in this.data.factors){
	    this.tableCells['label-' + factor].innerText = this.data.factors[factor]['name'];
	}

	this.stats = {};

	return this.stats;
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static getStats () {

	return this.stats;
	
    } // getStats
    
    /*------------------------------------------------------------------------*/

    static updateStats () {

	var total;
	var N = this.data.n * this.data.factors[0]['levels'].length * this.data.factors[1]['levels'].length;
		
	this.stats['SS-Error'] = (this.data.n - 1) * this.data.factors[0]['levels'].length * this.data.factors[1]['levels'].length * Math.pow(this.data.sd, 2);
	this.stats['DF-Error'] = N - this.data.factors[0]['levels'].length * this.data.factors[1]['levels'].length;
	this.stats['MS-Error'] = this.stats['SS-Error'] / this.stats['DF-Error'];

	for(let factor in this.data.factors){
	    total = 0;
	    for(let level in this.data.factors[factor]['levels']){
		total += Math.pow(this.data.marginalMeans[factor][level] - this.data.grandMean, 2);
	    }
	    this.stats['SS-' + factor] = N * total / this.data.factors[factor]['levels'].length;
	    this.stats['DF-' + factor] = this.data.factors[factor]['levels'].length - 1;
	}

	total = 0;
	for(let col in this.data.factors[0]['levels']){
	    for(let row in this.data.factors[1]['levels']){
		total += Math.pow(this.data.cellMeans[row][col] - this.data.marginalMeans[0][col] - this.data.marginalMeans[1][row] + this.data.grandMean, 2);
	    }
	}
	this.stats['SS-Int'] = N * total / (this.data.factors[0]['levels'].length  * this.data.factors[1]['levels'].length)
	this.stats['DF-Int'] = (this.data.factors[0]['levels'].length - 1) * (this.data.factors[1]['levels'].length - 1);

	
	for(let effect of ['0', '1', 'Int']){
	    this.stats['MS-' + effect] = this.stats['SS-' + effect] / this.stats['DF-' + effect];
	    this.stats['F-' + effect] = this.stats['MS-' + effect] / this.stats['MS-Error'];
	    this.stats['p-' + effect] = F.compute(this.stats['F-' + effect], this.stats['DF-' + effect], this.stats['DF-Error']);
	}
	
    } // updateStats

    /*------------------------------------------------------------------------*/
    
    static updateTable () {
	
	for(let name in this.stats){
	    if(name in this.tableCells){
		this.tableCells[name].innerText = this.stats[name].toFixed(2);
	    }
	}
	
    } // updateTable

    /*------------------------------------------------------------------------*/

} // Anova

export default Anova;