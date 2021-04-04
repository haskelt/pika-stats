// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class Controls {

    /*------------------------------------------------------------------------*/

    static initialize (update_callback) {

	this.controlsElement = document.querySelector('#controls');
	this.regenerate_button = this.controlsElement.querySelector('#regenerate-button');
	this.regenerate_button.addEventListener('click', this.handleClick.bind(this));
	this.update_callback = update_callback;
	
    } // initialize

    /*------------------------------------------------------------------------*/

    static handleClick (e) {

	this.update_callback();
	
    } // handleClick
    
    /*------------------------------------------------------------------------*/

    
} // Controls

export default Controls;