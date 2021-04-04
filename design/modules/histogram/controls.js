{{project.js_copyright_notice}}

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
