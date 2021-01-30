{{ JS_COPYRIGHT_NOTICE }}

class Descriptives {

    /*------------------------------------------------------------------------*/

    static initialize (data) {

	this.data = data;
	
	var descriptivesElement = document.querySelector('#descriptives');

	// get references to elements we need to update
	var ids = ['grand-mean'];
	for(let factor in this.data.factors){
	    ids.push('factor-' + factor);
	    for(let level in this.data.factors[factor]['levels']){
		ids.push('level-' + factor + '-' + level);
		ids.push('marginal-' + factor + '-' + level);
	    }
	}
	for(let row in this.data.factors[0]['levels']){
	    for(let col in this.data.factors[1]['levels']){
		ids.push('cell-' + row + '-' + col);
	    }
	}
	this.subElements = {};
	for(let id of ids){
	    this.subElements[id] = descriptivesElement.querySelector('#' + id);
	}

	// set element contents for labels
	for(let factor in this.data.factors){
	    this.subElements['factor-' + factor].innerText = this.data.factors[factor]['name'];
	    for(let level in this.data.factors[factor]['levels']){
		let id = 'level-' + factor + '-' + level;
		this.subElements[id].innerText = this.data.factors[factor]['levels'][level];
	    }
	}
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static update () {

	for(let row in this.data.factors[0]['levels']){
	    for(let col in this.data.factors[1]['levels']){
		let id = 'cell-' + row + '-' + col;
		this.subElements[id].innerText = this.data.cellMeans[row][col].toFixed(2);
	    }
	}
	for(let factor in this.data.factors){
	    for(let level in this.data.factors[factor]['levels']){
		let id = 'marginal-' + factor + '-' + level;
		this.subElements[id].innerText = this.data.marginalMeans[factor][level].toFixed(2);
	    }
	}
	this.subElements['grand-mean'].innerText = this.data.grandMean.toFixed(2);
	
    } // update
    
    /*------------------------------------------------------------------------*/
    
} // Descriptives

export default Descriptives;
