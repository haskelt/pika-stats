// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import d3 from '/js/d3/d3.v6.5.0.js?v=0.3.0-alpha';
import F from '/js/anova/F.js?v=0.3.0-alpha';

class Anova {
    // in order of num cols, then num rows
    static levels = [2, 2];
    static n = 15;
    static sd = 28;

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
	
    } // initialize
    
    /*------------------------------------------------------------------------*/

    static update () {

	var N = this.n * this.levels[0] * this.levels[1];
	var total;
	
	var stats = {};
	
	stats['SS-Error'] = (this.n - 1) * this.data.factors[0]['levels'].length * this.data.factors[1]['levels'].length * Math.pow(this.sd, 2);
	stats['DF-Error'] = N - this.data.factors[0]['levels'].length * this.data.factors[1]['levels'].length;
	stats['MS-Error'] = stats['SS-Error'] / stats['DF-Error'];

	for(let factor in this.data.factors){
	    total = 0;
	    for(let level in this.data.factors[factor]['levels']){
		total += Math.pow(this.data.marginalMeans[factor][level] - this.data.grandMean, 2);
	    }
	    stats['SS-' + factor] = N * total / this.data.factors[factor]['levels'].length;
	    stats['DF-' + factor] = this.data.factors[factor]['levels'].length - 1;
	}

	total = 0;
	for(let col in this.data.factors[0]['levels']){
	    for(let row in this.data.factors[1]['levels']){
		total += Math.pow(this.data.cellMeans[row][col] - this.data.marginalMeans[0][col] - this.data.marginalMeans[1][row] + this.data.grandMean, 2);
	    }
	}
	stats['SS-Int'] = N * total / (this.data.factors[0]['levels'].length  * this.data.factors[1]['levels'].length)
	stats['DF-Int'] = (this.data.factors[0]['levels'].length - 1) * (this.data.factors[1]['levels'].length - 1);

	
	for(let effect of ['0', '1', 'Int']){
	    stats['MS-' + effect] = stats['SS-' + effect] / stats['DF-' + effect];
	    stats['F-' + effect] = stats['MS-' + effect] / stats['MS-Error'];
	    stats['p-' + effect] = F.compute(stats['F-' + effect], stats['DF-' + effect], stats['DF-Error']);
	}
	
	for(let name in stats){
	    if(name in this.tableCells){
		this.tableCells[name].innerText = stats[name].toFixed(2);
	    }
	}
	
    } // update

    /*------------------------------------------------------------------------*/

} // Anova

export default Anova;