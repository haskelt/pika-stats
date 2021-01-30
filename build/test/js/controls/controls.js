// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import data_manager from '/js/data/data_manager.js?v=0.5.0-alpha';

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