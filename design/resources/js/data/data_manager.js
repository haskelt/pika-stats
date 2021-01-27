{{ JS_COPYRIGHT_NOTICE }}

import table from '{{SITE_PATH}}/js/table/table.js?v={{VERSION}}';
import graph from '{{SITE_PATH}}/js/graph/graph.js?v={{VERSION}}';

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
