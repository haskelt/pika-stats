{{project.js_copyright_notice}}

import HistogramObject from '{{project.site_path}}/js/histogram/HistogramObject.js?v={{project.version}}';
import controls from '{{project.site_path}}/js/histogram/controls.js?v={{project.version}}';

var xAxisTitle = "Rate";
var yAxisTitle = "Count";
var N = 200;
var plot = document.getElementById("histogram");

/******************************************************************************/

function generateData (N) {
    var data = [];
    for(let i=0; i < N; i++){
	data.push(Math.random()*100);
    }
    return data;
}

/******************************************************************************/

function updateData (data, N) {
    for(let i=0; i < N; i++){
	data.push(Math.random()*100);
    }
}

/******************************************************************************/

function update () {
    console.log('update clicked');
    updateData(data[0], N);
    h[0].updateChart(data[0]);
}

/******************************************************************************/

controls.initialize(update);
var h = [new HistogramObject(), new HistogramObject()];
var data = [[], []];
for(let i in h){
    plot.appendChild(h[i].createChart(yAxisTitle, xAxisTitle));
    data[i] = generateData(N);
    h[i].updateChart(data[i]);
}






