{{ JS_COPYRIGHT_NOTICE }}

class Table {

    /*------------------------------------------------------------------------*/

    static initialize () {

	this.table = document.querySelector('#table');
	this.cells = [
	    [this.table.querySelector('#cell-A1'), this.table.querySelector('#cell-B1')],
	    [this.table.querySelector('#cell-A2'), this.table.querySelector('#cell-B2')]
	];
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static updateValues (values) {

	for(let col in values){
	    for(let row in values[col]){
		this.cells[col][row].innerText = values[col][row];
	    }
	}
	
    } // updateValues
    
    /*------------------------------------------------------------------------*/

    
} // Table

Table.initialize();
export default Table;
