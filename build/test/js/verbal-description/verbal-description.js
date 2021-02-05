// Copyright 2021 Todd R. Haskell\n// Distributed under the terms of the Gnu GPL 3.0

class VerbalDescription {

    /*------------------------------------------------------------------------*/

    static initialize (data, stats) {

	this.data = data;
	this.stats = stats;
	
	this.verbalDescriptionElement = document.querySelector('#verbal-description');
	this.descriptionBullets = {};
	for(let effect of ['0', '1', 'Int']){
	    this.descriptionBullets[effect] = this.verbalDescriptionElement.querySelector('#description-' + effect);
	}
	    
    } // initialize

    /*------------------------------------------------------------------------*/

    static update () {
	var description;
	
	for(let effect of ['0', '1']){ 
	    if(this.stats['p-' + effect] < .05){
		description = 'There was a main effect of ' + this.data.factors[effect].name.toLowerCase() + ' such that ' + this.data.dv.toLowerCase() + ' was ';
		description += (this.data.marginalMeans[effect][0] > this.data.marginalMeans[effect][1] ? ' greater with ' : ' lower with ');
		description += this.data.factors[effect].levels[0].toLowerCase() + ' than with ' + this.data.factors[effect].levels[1].toLowerCase();
		this.descriptionBullets[effect].innerText = description;
	    } else {
		this.descriptionBullets[effect].innerText = 'There was no main effect of ' + this.data.factors[effect].name.toLowerCase();
	    }
	}
	if(this.stats['p-Int'] < .05){
	    description = 'There was an interaction of ' + this.data.factors[0].name.toLowerCase() + ' and ' + this.data.factors[1].name.toLowerCase() + ' such that ';
	    let simpleEffect0 = this.data.cellMeans[0][0] - this.data.cellMeans[1][0];
	    let simpleEffect1 = this.data.cellMeans[0][1] - this.data.cellMeans[1][1];
	    if(Math.abs(simpleEffect0) < this.data.se * 2){ // no simple effect 0
		description += ' there was no effect of ' + this.data.factors[1].name.toLowerCase() + ' with ' + this.data.factors[0].levels[0].toLowerCase() + ' but ' + this.data.factors[1].levels[0].toLowerCase() + (simpleEffect0 > 0 ? ' led to lower ' : ' led to greater ') + this.data.dv.toLowerCase() + ' with ' + this.data.factors[0].levels[1].toLowerCase();
	    } else if(Math.abs(simpleEffect1) < this.data.se * 2){ // no simple effect 1
		description += this.data.factors[1].levels[0].toLowerCase() + (simpleEffect0 > 0 ? ' led to greater ' : ' led to lower ') + this.data.dv.toLowerCase() + ' with ' + this.data.factors[0].levels[0].toLowerCase() + ' while there was no effect of ' + this.data.factors[1].name.toLowerCase() + ' with ' + this.data.factors[0].levels[1].toLowerCase();
	    } else if(simpleEffect0 * simpleEffect1 > 0){ // not a crossover
		description += ' the effect of ' + this.data.factors[1].name.toLowerCase() + ' was ' + (Math.abs(simpleEffect0) > Math.abs(simpleEffect1) ? 'larger' : 'smaller') + ' with ' + this.data.factors[0].levels[0].toLowerCase() + ' than with ' + this.data.factors[0].levels[1].toLowerCase();
	    } else { // crossover
		description += this.data.factors[1].levels[0].toLowerCase() + (simpleEffect0 > 0 ? ' led to greater ' : ' led to lower ') + this.data.dv.toLowerCase() + ' with ' + this.data.factors[0].levels[0].toLowerCase() + ' but' + (simpleEffect0 > 0 ? ' lower ' : ' greater ') + this.data.dv.toLowerCase() + ' with ' + this.data.factors[0].levels[1].toLowerCase();
	    }
	    this.descriptionBullets['Int'].innerText = description;
	} else {
	    this.descriptionBullets['Int'].innerText = "There was no interaction.";
	}
	
    } // update
    
    /*------------------------------------------------------------------------*/
    
} // VerbalDescription

export default VerbalDescription;