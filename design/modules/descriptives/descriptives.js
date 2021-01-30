{{ JS_COPYRIGHT_NOTICE }}

class Descriptives {

    /*------------------------------------------------------------------------*/

    static initialize (data) {

	this.data = data;
	
	var descriptivesElement = document.querySelector('#descriptives');

	this.cellElements = [
	    [descriptivesElement.querySelector('#cell-1-1'), descriptivesElement.querySelector('#cell-1-2')],
	    [descriptivesElement.querySelector('#cell-2-1'), descriptivesElement.querySelector('#cell-2-2')]
	];
	
	this.labelElements = {};
	for(let label of ['factorA', 'levelA1', 'levelA2', 'factorB', 'levelB1', 'levelB2', 'marginalA1', 'marginalA2', 'marginalB1', 'marginalB2']){
	    this.labelElements[label] = descriptivesElement.querySelector('#' + label);
	}

	this.labelElements['factorA'].innerText = this.data.factors[0]['name'];
	this.labelElements['levelA1'].innerText = this.data.factors[0]['levels'][0];
	this.labelElements['levelA2'].innerText = this.data.factors[0]['levels'][1];
	this.labelElements['factorB'].innerText = this.data.factors[1]['name'];
	this.labelElements['levelB1'].innerText = this.data.factors[1]['levels'][0];
	this.labelElements['levelB2'].innerText = this.data.factors[1]['levels'][1];
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static update () {

	for(let row in this.data.cellMeans){
	    for(let col in this.data.cellMeans[row]){
		this.cellElements[row][col].innerText = this.data.cellMeans[row][col].toFixed(2);
	    }
	}
	this.labelElements['marginalA1'].innerText = this.data.marginalMeans[0][0].toFixed(2);
	this.labelElements['marginalA2'].innerText = this.data.marginalMeans[0][1].toFixed(2);
	this.labelElements['marginalB1'].innerText = this.data.marginalMeans[1][0].toFixed(2);
	this.labelElements['marginalB2'].innerText = this.data.marginalMeans[1][1].toFixed(2);
	
    } // update
    
    /*------------------------------------------------------------------------*/
    
} // Descriptives

export default Descriptives;
