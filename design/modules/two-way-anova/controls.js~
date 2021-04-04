{{project.js_copyright_notice}}

import data_manager from '{{project.site_path}}/js/data/data_manager.js?v={{project.version}}';

class Controls {

    /*------------------------------------------------------------------------*/

    static initialize () {

	this.controlsElement = document.querySelector('#controls');
	this.regenerate_button = this.controlsElement.querySelector('#regenerate-button');
	this.regenerate_button.addEventListener('click', this.handleClick.bind(this));
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static handleClick (e) {

	data_manager.update();
	
    } // handleClick
    
    /*------------------------------------------------------------------------*/

    
} // Controls

Controls.initialize();
export default Controls;
