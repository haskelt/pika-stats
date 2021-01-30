

class F {
    
    static LogGamma(Z) {
	var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
	var LG= (Z-.5)*Math.log(Z+4.5)-(Z+4.5)+Math.log(S*2.50662827465);
	return LG
    }
    
    static Betinc(X,A,B) {
	var A0=0;
	var B0=1;
	var A1=1;
	var B1=1;
	var M9=0;
	var A2=0;
	var C9;
	while (Math.abs((A1-A2)/A1)>.00001) {
		A2=A1;
		C9=-(A+M9)*(A+B+M9)*X/(A+2*M9)/(A+2*M9+1);
		A0=A1+C9*A0;
		B0=B1+C9*B0;
		M9=M9+1;
		C9=M9*(B-M9)*X/(A+2*M9-1)/(A+2*M9);
		A1=A0+C9*A1;
		B1=B0+C9*B1;
		A0=A0/B1;
		B0=B0/B1;
		A1=A1/B1;
		B1=1;
	}
	return A1/A
    }

    static Betacdf(Z,A,B) {
	var S;
	var BT;
	var Bcdf;
	S=A+B;
	BT=Math.exp(this.LogGamma(S)-this.LogGamma(B)-this.LogGamma(A)+A*Math.log(Z)+B*Math.log(1-Z));
	if (Z<(A+1)/(S+2)) {
	    Bcdf=BT*this.Betinc(Z,A,B)
	} else {
	    Bcdf=1-BT*this.Betinc(1-Z,B,A)
	}
	return Bcdf
    }

    static compute(X, f1, f2) {
	var Fcdf;
	if (f1<=0) {
	    alert("Numerator degrees of freedom must be positive")
	} else if (f2<=0) {
		alert("Denominator degrees of freedom must be positive") 
	} else if (X<=0) {
		Fcdf=0
	} else {
		let Z=X/(X+f2/f1);
		Fcdf=this.Betacdf(Z,f1/2,f2/2);
	}
	//Fcdf=Math.round(Fcdf*100000)/100000;
	return 1 - Fcdf;
    }

}

export default F;
