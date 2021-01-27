{{ JS_COPYRIGHT_NOTICE }}

import data_manager from '{{SITE_PATH}}/js/data/data_manager.js?v={{VERSION}}';

class Interface {

    /*------------------------------------------------------------------------*/

    static initialize () {

	this.regenerate_button = document.querySelector('#regenerate-button');
	this.regenerate_button.addEventListener('click', this.handleClick.bind(this));
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static handleClick (e) {

	data_manager.regenerate();
	
    } // handleClick
    
    /*------------------------------------------------------------------------*/

    
} // Interface

Interface.initialize();
export default Interface;
