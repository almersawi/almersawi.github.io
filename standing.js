 function round(value,decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

 document.getElementById('secondFE-btn').onclick = function () {
 	document.getElementById('secondFE-Container').style.display = 'block';
 	this.style.display = 'none';
 }

var     SPr = document.getElementById('S-Pr').value,
	    SPb = document.getElementById('S-Pb').value,
	    FE = document.getElementById('FE').value,
	    FE2 = document.getElementById('FE2').value,
	    SqTest = document.getElementById('S-qTest').value,
	    SpTest = document.getElementById('S-pTest').value,
	    SqArray = [],
	    SPwfArray = [],
	    SqArray1 = [],
	    SPwfArray1 = [],
	    zt = [],
	    nt = [];
//Start functioning 

//1- Define the calc button and attach function 

document.getElementById('Stand-Calc').onclick = function() {
var    SPr = document.getElementById('S-Pr').value,
	    SPb = document.getElementById('S-Pb').value,
	    FE = document.getElementById('FE').value,
	    FE2 = document.getElementById('FE2').value,
	    SqTest = document.getElementById('S-qTest').value,
	    SpTest = document.getElementById('S-pTest').value;
// First define the main variables
//Check if There is any blank value

	if (SPr === '' || SPb === '' || FE === '' || SqTest === '' || SpTest === '') {
		alert('Please, input all values');
	}
// all values exist
	else {
		// Function here 
//console.log(SPr, SPb, parseFloat(FE), SqTest, SpTest);
		// Check if the reservoir is staurated or under staurated 

		if (SPr <= SPb) {

			// Reservoir is saturated

			// Saturated Calculations Here..

			// Test on FE 

			if (parseFloat(FE2) == 0 ) {
				var PF = (1-(SpTest/SPr)),
				Sqmax = (SqTest) /((1.8*FE*PF) - (0.8 * FE*FE * PF*PF)); 

			Sqmax = round(Sqmax , 2);

			// Find the Q and Pwf arrays 

			for ( SPwf = 0 ; SPwf <= SPr ; SPwf = SPwf+0.1) {
				var SPF = 1 - (SPwf / SPr),
			    Sq = Sqmax * ( (1.8 * FE *SPF) - (0.8 * FE*FE * (SPF*SPF)) );

			    SqArray.push(Sq);
			    SPwfArray.push(SPwf);

			}

			    SqArray.push(0);
			    SPwfArray.push(SPr);


			document.getElementById('results').innerHTML = "Q<sub>max at FE= 1</sub> = " + Sqmax +" STB/Day";

			var FElegend = 'FE= ' + FE;

			// Graph the results

			 var trace1 = {
 				 x: SqArray,
  				 y: SPwfArray,
  				 mode: 'lines',
  				 name: FElegend
						  };

			 var data = [trace1];

			 var layout = {	
  				title:'IPR Curve Using Standing Method',
  				xaxis: {
    			title: 'q STB/Day'
  						},
  				yaxis: {
    			title: 'Pwf psig'
  						}
						};

				Plotly.newPlot('myDiv', data, layout);

		document.getElementById('stable-area').style.display = 'block';

		// To create Table
		document.getElementById('svalueBtn').onclick = function() {
	var SPr = document.getElementById('S-Pr').value,
	    SPb = document.getElementById('S-Pb').value,
	    FE = document.getElementById('FE').value,
	    SqTest = document.getElementById('S-qTest').value,
	    SpTest = document.getElementById('S-pTest').value;
	
	var valueInterval2 = document.getElementById('svalue-interval'),
	SPr = document.getElementById('S-Pr').value,
	PF = (1-(SpTest/SPr));
	Sqmax = (SqTest) /((1.8*FE*PF) - (0.8 * FE*FE * PF*PF));
	
	
	//console.log(Sqmax);
//console.log(parseInt(valueInterval2.value));
    if (table.childElementCount == 0) {
      var i = 0;
      for (i; i<SPr; i=i+parseInt(valueInterval2.value)) {
      	var SPF = 1 - (i / SPr);
			 var Sq = Sqmax * ( (1.8 * FE *SPF) - (0.8 * FE*FE * (SPF*SPF)) );
      zt.push(i);
      nt.push(Sq);
    }
    zt.push(parseInt(SPr));
    nt.push(0);
    var thead = document.createElement('thead'),
        tr = document.createElement('tr'),
        th1 = document.createElement('th'),
        th2 = document.createElement('th'),
        th3 = document.createElement('th'),
        thtr = document.createElement('th'),
        thText1 = document.createTextNode('#'),
        thText2 = document.createTextNode('Pwf (psig)'),
        thText3 = document.createTextNode('q (STB/Day)'),
        tbody = document.createElement('tbody'),
        td = document.createElement('td');
        th1.appendChild(thText1);
        th2.appendChild(thText2);
        th3.appendChild(thText3);
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        for (nn =0 ; nn < zt.length; nn++ ){
          var thtr = document.createElement('th'),
              subtr = document.createElement('tr'),
              subtd1 = document.createElement('td'),
              subtd2 = document.createElement('td'),
              subtdText1 = document.createTextNode(zt[nn]),
              subtdText2 = document.createTextNode(round(nt[nn],2)),

          thtextG = document.createTextNode(nn+1);
          thtr.appendChild(thtextG);
          subtr.appendChild(thtr);
          subtd1.appendChild(subtdText1);
          subtd2.appendChild(subtdText2);
          subtr.appendChild(subtd1);
          subtr.appendChild(subtd2);
          tbody.appendChild(subtr);
        }
       
          table.appendChild(thead);
          table.appendChild(tbody);

    }
else {
  table.removeChild(table.childNodes[1]);
  table.removeChild(table.childNodes[1]);
  nn=0;
  zt =[];
  nt=[];
  document.getElementById('svalueBtn').click();
} 

}

			}

			else{
				var PF = (1-(SpTest/SPr)),
				Sqmax = (SqTest) /((1.8*FE*PF) - (0.8 * FE*FE*PF*PF)),
				Pcheck = SPr *(1-(1/FE2));

			Sqmax = round(Sqmax , 2);

			console.log(Pcheck);
			console.log(FE2);

			// Find the Q and Pwf arrays 

			for ( SPwf = SPr ; SPwf <= SPr ; SPwf = SPwf-0.1) {
				var SPF = 1 - (SPwf / SPr),
			    Sq = Sqmax * ( (1.8 * FE2 *SPF) - (0.8 * FE2*FE2 * (SPF*SPF)) );

			    if (SPwf <= Pcheck) {
			    	break;
			    }

			    SPwfArray.push(SPwf);
			    SqArray.push(Sq);

			 
			}

		     	var PF = (1-(SpTest/SPr)),
				Sqmax = (SqTest) /((1.8*FE*PF) - (0.8 * FE*FE * PF*PF)); 

			Sqmax = round(Sqmax , 2);

			// Find the Q and Pwf arrays 

			for ( SPwf = 0 ; SPwf <= SPr ; SPwf = SPwf+0.1) {
				var SPF = 1 - (SPwf / SPr),
			    Sq = Sqmax * ( (1.8 * FE *SPF) - (0.8 * FE*FE * (SPF*SPF)) );

			    SqArray1.push(Sq);
			    SPwfArray1.push(SPwf);

			}

			    SqArray1.push(0);
			    SPwfArray1.push(SPr);

console.log(SqArray1);
console.log(SPwfArray1);
			document.getElementById('results').innerHTML = "Q<sub>max at FE= 1</sub> = " + Sqmax +" STB/Day";
			var FElegend1 = 'FE= ' + FE,
				FElegend2 = 'FE= ' + FE2;

			// Graph the results

			 var trace1 = {
 				 x: SqArray,
  				 y: SPwfArray,
  				 mode: 'lines',
  				 name: FElegend2
						  };

			 var trace2 = {
 				 x: SqArray1,
  				 y: SPwfArray1,
  				 mode: 'lines',
  				 name: FElegend1
						  };

			 var data = [trace1, trace2];

			 var layout = {	
  				title:'IPR Curve Using Standing Method',
  				xaxis: {
    			title: 'q STB/Day'
  						},
  				yaxis: {
    			title: 'Pwf psig'
  						}
						};

				Plotly.newPlot('myDiv', data, layout);

		document.getElementById('stable-area').style.display = 'block';

		// To create Table
		document.getElementById('svalueBtn').onclick = function() {
	var SPr = document.getElementById('S-Pr').value,
	    SPb = document.getElementById('S-Pb').value,
	    FE = document.getElementById('FE').value,
	    FE2 = document.getElementById('FE2').value,
	    SqTest = document.getElementById('S-qTest').value,
	    SpTest = document.getElementById('S-pTest').value,
	    Pcheck = SPr *(1-(1/FE2));
	
	var valueInterval2 = document.getElementById('svalue-interval'),
	SPr = document.getElementById('S-Pr').value,
	PF = (1-(SpTest/SPr));
	Sqmax = (SqTest) /((1.8*FE*PF) - (0.8 * FE*FE * PF*PF));
	
	
	//console.log(Sqmax);
//console.log(parseInt(valueInterval2.value));
    if (table.childElementCount == 0) {
    	var i = 0;
      for (i; i<SPr; i=i+parseInt(valueInterval2.value)) {
      	var SPF = 1 - (i / SPr);
			 var Sq = Sqmax * ( (1.8 * FE2 *SPF) - (0.8 * FE2*FE2 * (SPF*SPF)) );
			 if (i <= Pcheck) {
			 	Sq = 1;
			 }
      zt.push(i);
      nt.push(Sq);
    }
    zt.push(parseInt(SPr));
    nt.push(0);
    var thead = document.createElement('thead'),
        tr = document.createElement('tr'),
        th1 = document.createElement('th'),
        th2 = document.createElement('th'),
        th3 = document.createElement('th'),
        thtr = document.createElement('th'),
        thText1 = document.createTextNode('#'),
        thText2 = document.createTextNode('Pwf (psig)'),
        thText3 = document.createTextNode('q (STB/Day)'),
        tbody = document.createElement('tbody'),
        td = document.createElement('td');
        th1.appendChild(thText1);
        th2.appendChild(thText2);
        th3.appendChild(thText3);
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        for (nn =0 ; nn < zt.length; nn++ ){
          var thtr = document.createElement('th'),
              subtr = document.createElement('tr'),
              subtd1 = document.createElement('td'),
              subtd2 = document.createElement('td');
              nt[nn] = round(nt[nn],2);

        if (nt[nn] == 1) {
        	nt[nn] = '-';
        }
        console.log(nt[nn]);
             var subtdText1 = document.createTextNode(zt[nn]),
              subtdText2 = document.createTextNode(nt[nn]),

          thtextG = document.createTextNode(nn+1);

         
          thtr.appendChild(thtextG);
          subtr.appendChild(thtr);
          subtd1.appendChild(subtdText1);
          subtd2.appendChild(subtdText2);
          subtr.appendChild(subtd1);
          subtr.appendChild(subtd2);
          tbody.appendChild(subtr);
        }
       
          table.appendChild(thead);
          table.appendChild(tbody);

    }
else {
  table.removeChild(table.childNodes[1]);
  table.removeChild(table.childNodes[1]);
  nn=0;
  zt =[];
  nt=[];
  document.getElementById('svalueBtn').click();
} 

}
			}




		}

		else {
			// Reservoir is undersaturated 

			// Undersaturated calculations here..

			if (parseFloat(FE2) == 0) {

				if (SpTest < SPb) {
					var SPr = document.getElementById('S-Pr').value,
			    SPb = document.getElementById('S-Pb').value,
			    FE = document.getElementById('FE').value,
			    FE2 = document.getElementById('FE2').value,
			    SqTest = document.getElementById('S-qTest').value,
			    SpTest = document.getElementById('S-pTest').value,
			    PbF = (1- (SpTest/SPb)),
			    J = (SqTest)/(SPr-SPb +((SPb/1.8)*(1.8*PbF-0.8*FE*PbF*PbF)));
			    var pArray = [],
			    	qArray = [];

			    for (i = 0; i < SPb; i = i+0.1){
			    	pArray.push(i);
			    	qArray.push(J*(SPr -SPb) + (J*SPb/1.8)*(1.8*(1-(i/SPb))-0.8*FE*(1-(i/SPb))*(1-(i/SPb))));
			    }
			    for (m=SPr; m>=SPb;m = m-0.1) {
       				   pArray.push(m);
        			   qArray.push(J*(SPr-m));
                }
                   results.innerHTML = 'J = ' + round(J,2) + " STB/day.psi";
                   document.getElementById('stable-area').style.display = 'block';
                // To plot 
                var traceA = {
  x: qArray,
  y: pArray,
  mode: 'lines',
  name: 'Lines'
};

var data = [traceA];

var layout = {
  title:'IPR Curve Using Standing Method',
  xaxis: {
    title: 'q STB/Day'
  },
  yaxis: {
    title: 'Pwf psig'
  }
};
Plotly.newPlot('myDiv', data, layout);
document.getElementById('svalueBtn').onclick = function() {
var valueInterval2 = document.getElementById('svalue-interval');
console.log(parseInt(valueInterval2.value));
    if (table.childElementCount == 0) {
      var i = 0;
      for (i; i<=SPb; i=i+parseInt(valueInterval2.value)) {
      zt.push(i);
      nt.push(J*(SPr -SPb) + (J*SPb/1.8)*(1.8*(1-(i/SPb))-0.8*FE*(1-(i/SPb))*(1-(i/SPb))));
    }
    for (m = zt[zt.length-1] +parseInt(valueInterval2.value); m<=SPr; m=m+parseInt(valueInterval2.value)) {
      zt.push(m);
      nt.push(J*(SPr-m));
    }

    if (zt[zt.length-1] != SPr) {
      zt.push(SPr);
    nt.push(J*(SPr-SPr));
    }

    //zx.reverse();
    //nx.reverse();

  // zt = zt.concat(zx);
  // nt = nt.concat(nx);
  
    
    var thead = document.createElement('thead'),
        tr = document.createElement('tr'),
        th1 = document.createElement('th'),
        th2 = document.createElement('th'),
        th3 = document.createElement('th'),
        thtr = document.createElement('th'),
        thText1 = document.createTextNode('#'),
        thText2 = document.createTextNode('Pwf (psig)'),
        thText3 = document.createTextNode('q (STB/Day)'),
        tbody = document.createElement('tbody'),
        td = document.createElement('td');
        th1.appendChild(thText1);
        th2.appendChild(thText2);
        th3.appendChild(thText3);
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        for (nn =0 ; nn < zt.length; nn++ ){
          var thtr = document.createElement('th'),
              subtr = document.createElement('tr'),
              subtd1 = document.createElement('td'),
              subtd2 = document.createElement('td'),
              subtdText1 = document.createTextNode(zt[nn]),
              subtdText2 = document.createTextNode(round(nt[nn],2)),

          thtextG = document.createTextNode(nn+1);
          thtr.appendChild(thtextG);
          subtr.appendChild(thtr);
          subtd1.appendChild(subtdText1);
          subtd2.appendChild(subtdText2);
          subtr.appendChild(subtd1);
          subtr.appendChild(subtd2);
          tbody.appendChild(subtr);
        }
       
          table.appendChild(thead);
          table.appendChild(tbody);

    }
else {
  table.removeChild(table.childNodes[1]);
  table.removeChild(table.childNodes[1]);
  i=0;
  zt =[];
  nt=[];
  zx =[];
  nx=[];
  valueBtn.click();
} 



  }
				}

				else {
					var SPr = document.getElementById('S-Pr').value,
			    SPb = document.getElementById('S-Pb').value,
			    FE = document.getElementById('FE').value,
			    FE2 = document.getElementById('FE2').value,
			    SqTest = document.getElementById('S-qTest').value,
			    SpTest = document.getElementById('S-pTest').value,
			    PbF = (1- (SpTest/SPb)),
			    J = SqTest / (SPr-SpTest);
			    var pArray = [],
			    	qArray = [];

			    for (i = 0; i < SPb; i = i+0.1){
			    	pArray.push(i);
			    	qArray.push(J*(SPr -SPb) + (J*SPb/1.8)*(1.8*(1-(i/SPb))-0.8*FE*(1-(i/SPb))*(1-(i/SPb))));
			    }
			    for (m=SPr; m>=SPb;m = m-0.1) {
       				   pArray.push(m);
        			   qArray.push(J*(SPr-m));
                }
                   results.innerHTML = 'J = ' + round(J,2) + " STB/day.psi";
                   document.getElementById('stable-area').style.display = 'block';
                // To plot 
                var traceA = {
  x: qArray,
  y: pArray,
  mode: 'lines',
  name: 'Lines'
};

var data = [traceA];

var layout = {
  title:'IPR Curve Using Standing Method',
  xaxis: {
    title: 'q STB/Day'
  },
  yaxis: {
    title: 'Pwf psig'
  }
};
Plotly.newPlot('myDiv', data, layout);
document.getElementById('svalueBtn').onclick = function() {
var valueInterval2 = document.getElementById('svalue-interval');
console.log(parseInt(valueInterval2.value));
    if (table.childElementCount == 0) {
      var i = 0;
      for (i; i<=SPb; i=i+parseInt(valueInterval2.value)) {
      zt.push(i);
      nt.push(J*(SPr -SPb) + (J*SPb/1.8)*(1.8*(1-(i/SPb))-0.8*FE*(1-(i/SPb))*(1-(i/SPb))));
    }
    for (m = zt[zt.length-1] +parseInt(valueInterval2.value); m<=SPr; m=m+parseInt(valueInterval2.value)) {
      zt.push(m);
      nt.push(J*(SPr-m));
    }

    if (zt[zt.length-1] != SPr) {
      zt.push(SPr);
    nt.push(J*(SPr-SPr));
    }

    //zx.reverse();
    //nx.reverse();

  // zt = zt.concat(zx);
  // nt = nt.concat(nx);
  
    
    var thead = document.createElement('thead'),
        tr = document.createElement('tr'),
        th1 = document.createElement('th'),
        th2 = document.createElement('th'),
        th3 = document.createElement('th'),
        thtr = document.createElement('th'),
        thText1 = document.createTextNode('#'),
        thText2 = document.createTextNode('Pwf (psig)'),
        thText3 = document.createTextNode('q (STB/Day)'),
        tbody = document.createElement('tbody'),
        td = document.createElement('td');
        th1.appendChild(thText1);
        th2.appendChild(thText2);
        th3.appendChild(thText3);
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        thead.appendChild(tr);
        for (nn =0 ; nn < zt.length; nn++ ){
          var thtr = document.createElement('th'),
              subtr = document.createElement('tr'),
              subtd1 = document.createElement('td'),
              subtd2 = document.createElement('td'),
              subtdText1 = document.createTextNode(zt[nn]),
              subtdText2 = document.createTextNode(round(nt[nn],2)),

          thtextG = document.createTextNode(nn+1);
          thtr.appendChild(thtextG);
          subtr.appendChild(thtr);
          subtd1.appendChild(subtdText1);
          subtd2.appendChild(subtdText2);
          subtr.appendChild(subtd1);
          subtr.appendChild(subtd2);
          tbody.appendChild(subtr);
        }
       
          table.appendChild(thead);
          table.appendChild(tbody);

    }
else {
  table.removeChild(table.childNodes[1]);
  table.removeChild(table.childNodes[1]);
  i=0;
  zt =[];
  nt=[];
  zx =[];
  nx=[];
  valueBtn.click();
} 



  }
		
				}

			}

			else {
				if (SpTest <= SPb) {
					    
      var SPr = document.getElementById('S-Pr').value,
          SPb = document.getElementById('S-Pb').value,
          FE = document.getElementById('FE').value,
          FE2 = document.getElementById('FE2').value,
          SqTest = document.getElementById('S-qTest').value,
          SpTest = document.getElementById('S-pTest').value,
          PbF = (1- (SpTest/SPb)),
          J = (SqTest)/(SPr-SPb +((SPb/1.8)*(1.8*PbF-0.8*FE*PbF*PbF)));
          var pArray = [],
            qArray = [];

          for (i = 0; i < SPb; i = i+0.1){
            pArray.push(i);
            qArray.push(J*(SPr -SPb) + (J*SPb/1.8)*(1.8*(1-(i/SPb))-0.8*FE*(1-(i/SPb))*(1-(i/SPb))));
          }
          for (m=SPr; m>=SPb;m = m-0.1) {
                 pArray.push(m);
                 qArray.push(J*(SPr-m));
                }


                /// End First Graph here 
                var SPr = document.getElementById('S-Pr').value,
          SPb = document.getElementById('S-Pb').value,
          FE = document.getElementById('FE').value,
          FE2 = document.getElementById('FE2').value,
          SqTest = document.getElementById('S-qTest').value,
          SpTest = document.getElementById('S-pTest').value,
          PbF = (1- (SpTest/SPb)),
          J = SqTest / (SPr-SpTest),
          J2 = (J*FE2)/FE;
          var pArray2 = [],
            qArray2 = [],
            Pcheck = SPr *(1-(1/FE2));

             for (m=SPr; m >=SPb; m = m-100) {

                 pArray2.push(parseFloat(m));
                 qArray2.push(parseFloat(J2*(SPr-m)));

                }
                   

          for (i = SPb; i <= SPb; i = i-100){
            var qnew = J2*(SPr -SPb) + (J2*SPb/1.8)*(1.8*(1-(i/SPb))-0.8*FE2*(1-(i/SPb))*(1-(i/SPb)))
            if (i <= Pcheck) {
              break;
            }
            pArray2.push(parseFloat(i));
            qArray2.push(parseFloat(qnew));
          }
          
         
                   console.log(pArray2);
                   console.log(qArray2);
                // To plot 
                var legend1 = "FE= " + FE,
                  legend2 = "FE= "+ FE2;
                var traceA = {
  x: qArray,
  y: pArray,
  mode: 'lines',
  name: legend1
};

var traceB = {
  x: qArray2,
  y: pArray2,
  mode: 'lines',
  name: legend2
};


var data = [traceA, traceB];

var layout = {
  title:'IPR Curve Using Standing Method',
  xaxis: {
    title: 'q STB/Day'
  },
  yaxis: {
    title: 'Pwf psig'
  }
};
Plotly.newPlot('myDiv', data, layout);

                   results.innerHTML = 'J<sub>1</sub> = ' + round(J,2) + " STB/day.psi <br>" + 'J<sub>2</sub> = ' + round(J2,2) + " STB/day.psi ";
               
      
    
				}
				else {
					//Case 2

      var SPr = document.getElementById('S-Pr').value,
          SPb = document.getElementById('S-Pb').value,
          FE = document.getElementById('FE').value,
          FE2 = document.getElementById('FE2').value,
          SqTest = document.getElementById('S-qTest').value,
          SpTest = document.getElementById('S-pTest').value,
          PbF = (1- (SpTest/SPb)),
          J = SqTest / (SPr-SpTest);
          var pArray = [],
            qArray = [];

          for (i = 0; i < SPb; i = i+0.1){
            pArray.push(i);
            qArray.push(J*(SPr -SPb) + (J*SPb/1.8)*(1.8*(1-(i/SPb))-0.8*FE*(1-(i/SPb))*(1-(i/SPb))));
          }
          for (m=SPr; m>=SPb;m = m-0.1) {
                 pArray.push(m);
                 qArray.push(J*(SPr-m));
                }


                /// End First Graph here 
                var SPr = document.getElementById('S-Pr').value,
          SPb = document.getElementById('S-Pb').value,
          FE = document.getElementById('FE').value,
          FE2 = document.getElementById('FE2').value,
          SqTest = document.getElementById('S-qTest').value,
          SpTest = document.getElementById('S-pTest').value,
          PbF = (1- (SpTest/SPb)),
          J = SqTest / (SPr-SpTest),
          J2 = (J*FE2)/FE;
          var pArray2 = [],
            qArray2 = [],
            Pcheck = SPr *(1-(1/FE2));

             for (m=SPr; m >=SPb; m = m-100) {

                 pArray2.push(parseFloat(m));
                 qArray2.push(parseFloat(J2*(SPr-m)));

                }
                   

          for (i = SPb; i <= SPb; i = i-100){
            var qnew = J2*(SPr -SPb) + (J2*SPb/1.8)*(1.8*(1-(i/SPb))-0.8*FE2*(1-(i/SPb))*(1-(i/SPb)))
            if (i <= Pcheck) {
              break;
            }
            pArray2.push(parseFloat(i));
            qArray2.push(parseFloat(qnew));
          }
          
         
                   console.log(pArray2);
                   console.log(qArray2);
                // To plot 
                var legend1 = "FE= " + FE,
                  legend2 = "FE= "+ FE2;
                var traceA = {
  x: qArray,
  y: pArray,
  mode: 'lines',
  name: legend1
};

var traceB = {
  x: qArray2,
  y: pArray2,
  mode: 'lines',
  name: legend2
};


var data = [traceA, traceB];

var layout = {
  title:'IPR Curve Using Standing Method',
  xaxis: {
    title: 'q STB/Day'
  },
  yaxis: {
    title: 'Pwf psig'
  }
};
Plotly.newPlot('myDiv', data, layout);

                   results.innerHTML = 'J<sub>1</sub> = ' + round(J,2) + " STB/day.psi <br>" + 'J<sub>2</sub> = ' + round(J2,2) + " STB/day.psi ";
               
      
    
					
				}
	}
	} // End Else Statement
}
} // End function of button Stand-Clac


// To Create table 



 // scroll effect

    document.onscroll = function() {
      var scrollValue = document.documentElement.scrollTop;
      if (scrollValue >= 110) {
        myDiv.classList.add('scrolled');
      }
      else {
       myDiv.classList.remove('scrolled');
      }
    } 
