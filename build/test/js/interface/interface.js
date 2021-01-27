// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

import data_manager from '/js/data/data_manager.js?v=0.1.0-alpha';

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