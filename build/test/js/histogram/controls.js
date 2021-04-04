// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class HistogramControls {

    /**************************************************************************/
    
    static initialize (clickCallback) {

	this.clickCallback = clickCallback;
	document.getElementById("histogram-update-button").addEventListener('click', this.handleClick.bind(this));
	
    } // initialize

    /**************************************************************************/

    static handleClick (e) {

	this.clickCallback();
	
    } // handleClick
    
    /**************************************************************************/
    
} // HistogramControls

export default HistogramControls;