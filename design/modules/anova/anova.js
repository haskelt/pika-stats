{{ JS_COPYRIGHT_NOTICE }}

import d3 from '{{SITE_PATH}}/js/d3/d3.v6.5.0.js?v={{VERSION}}';
import F from '{{SITE_PATH}}/js/anova/F.js?v={{VERSION}}';

class Anova {
    // in order of num cols, then num rows
    static levels = [2, 2];
    static n = 15;
    static sd = 28;

    /*------------------------------------------------------------------------*/

    static initialize (data) {

	var anovaElement = document.querySelector('#anova');
	this.tableCells = {};
	for(let value of ['labelA', 'effectA', 'SSA', 'DFA', 'MSA', 'FA', 'pA', 'labelB', 'effectB', 'SSB', 'DFB', 'MSB', 'FB', 'pB', 'effectInt', 'SSInt', 'DFInt', 'MSInt', 'FInt', 'pInt', 'SSError', 'DFError', 'MSError']){
	    this.tableCells[value] = anovaElement.querySelector('#' + value);
	}
	this.data = data;
	    
    } // initialize
    
    /*------------------------------------------------------------------------*/

    static update () {

	this.tableCells['labelA'].innerText = this.data.factors[0]['name'];
	this.tableCells['labelB'].innerText = this.data.factors[1]['name'];
	
	var N = this.n * this.levels[0] * this.levels[1];

	var stats = {};
	
	stats['SSError'] = (this.n - 1) * 4 * Math.pow(this.sd, 2);
	stats['DFError'] = N - this.levels[0] * this.levels[1];
	stats['MSError'] = stats['SSError'] / stats['DFError'];

	stats['effectA'] = Math.abs(this.data.marginalMeans[0][0] - this.data.marginalMeans[0][1]) / 2;
	stats['effectB'] = Math.abs(this.data.marginalMeans[1][0] - this.data.marginalMeans[1][1]) / 2;
	stats['effectInt'] = Math.abs((this.data.cellMeans[0][0] - this.data.cellMeans[0][1]) - (this.data.cellMeans[1][0] - this.data.cellMeans[1][1])) / 4;
	
	stats['DFA'] = this.levels[0] - 1;
	stats['DFB'] = this.levels[1] - 1;
	stats['DFInt'] = (this.levels[0] - 1) * (this.levels[1] - 1);

	for(let effect of ['A', 'B', 'Int']){
	    stats['SS' + effect] = N * Math.pow(stats['effect' + effect], 2);
	    stats['MS' + effect] = stats['SS' + effect] / stats['DF' + effect];
	    stats['F' + effect] = stats['MS' + effect] / stats['MSError'];
	    stats['p' + effect] = F.compute(stats['F' + effect], stats['DF' + effect], stats['DFError']);
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
