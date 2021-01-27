// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import table from '/js/table/table.js?v=0.1.0-alpha';
import graph from '/js/graph/graph.js?v=0.1.0-alpha';

class DataManager {

    /*------------------------------------------------------------------------*/

    static regenerate () {

	var values = [[null, null], [null, null]];
	for(let col in values){
	    for(let row in values[col]){
		values[col][row] = Math.random();
	    }
	}
	table.updateValues(values);
	graph.updateValues(values);
	
    } // regenerate
    
    /*------------------------------------------------------------------------*/
    
} // DataManager

export default DataManager;