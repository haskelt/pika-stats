
class MeansTable {

    /*------------------------------------------------------------------------*/

    static initialize () {

	this.table = document.querySelector('#means-table');
	this.cells = [
	    [this.table.querySelector('#cell-A1'), this.table.querySelector('#cell-B1')],
	    [this.table.querySelector('#cell-A2'), this.table.querySelector('#cell-B2')]
	];
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static setCellValues (values) {

	for(let col in values){
	    for(let row in values[col]){
		this.cells[col][row].innerText = values[col][row];
	    }
	}
	
    } // setCellValues
    
    /*------------------------------------------------------------------------*/
    
} // MeansTable

MeansTable.initialize();
export default MeansTable;