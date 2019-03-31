// Round Function

 function round(value,decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }


var addRowBtn = document.getElementById('add-item'),
    tbody = document.getElementById('tbody'),
	nextBtn = document.getElementById('next'),
	depreciationContainer = document.getElementById('depreciation-container'),
	calcBtn = document.getElementById('clac'),
	newTableArea = document.getElementById('new-table-area'),
    i = 0,
	revnueArray = [],
	netCashFlowArray = [],
	netPresentValueArray = [],
	revenueSum = 0,
	netCashFlowSum = 0,
	netPresentValueSum = 0,
	plotNcfBtn = document.getElementById('plot-ncf'),
	plotNpvBtn = document.getElementById('plot-npv');

addRowBtn.onclick = function () {
    var tr = document.createElement('tr'),
        td1 = document.createElement('td'),
        tdText1 = document.createTextNode(i),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td2Content = document.createElement('input'),
        td3Content = document.createElement('input'),
        td4Content = document.createElement('input'),
        tdID2 = 'tdA' + i,
        tdID3 = 'tdB' + i,
        tdID4 = 'tdC' + i;
        
    td1.appendChild(tdText1);
    td2Content.setAttribute("type" , "number");
    td2Content.setAttribute("class" , "form-control");
	td2Content.setAttribute("value" , "0");
    td2Content.setAttribute("id" ,tdID2);
    td3Content.setAttribute("type" , "number");
    td3Content.setAttribute("class" , "form-control");
    td3Content.setAttribute("id" ,tdID3);
    td4Content.setAttribute("type" , "number");
    td4Content.setAttribute("class" , "form-control");
    td4Content.setAttribute("id" ,tdID4);
    td2.appendChild(td2Content);
    td3.appendChild(td3Content);
    td4.appendChild(td4Content);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
    i++;
    
	if (i > 1) {
		nextBtn.style.display= 'block';
	}
}

nextBtn.onclick = function () {
	depreciationContainer.style.display = 'block';
	this.classList.add('disabled');
}

calcBtn.onclick = function () {
	// to calculate Depreciation
	var purchasePrice = document.getElementById('purchase-price').value,
	    slavageValue = document.getElementById('slavage-value').value,
	    estimatedLife = document.getElementById('estimated-life').value,
		deprciation = round((purchasePrice - slavageValue) / estimatedLife , 2),
		taxRate = document.getElementById('tax-rate').value,
		interestRate = document.getElementById('interest-rate').value;
	
	
	if (newTableArea.childElementCount == 0) {
		var newTable = document.createElement('table'),
		nthead = document.createElement('thead'),
		nth1 = document.createElement('th'),
		nthText1 = document.createTextNode('Year'),
		nth2 = document.createElement('th'),
		nthText2 = document.createTextNode('Investment (M$)'),
		nth3 = document.createElement('th'),
		nthText3 = document.createTextNode('Revenue (M$)'),
		nth4 = document.createElement('th'),
		nthText4 = document.createTextNode('Operating Cost (M$)'),
		nth5 = document.createElement('th'),
		nthText5 = document.createTextNode('Depreciation (M$)'),
		nth6 = document.createElement('th'),
		nthText6 = document.createTextNode('Income Tax (M$)'),
		nth7 = document.createElement('th'),
		nthText7 = document.createTextNode('NCF (M$)'),
		nth8 = document.createElement('th'),
		nthText8 = document.createTextNode('NPV (M$)'),
		nntbody = document.createElement('tbody'),
		nntd0 = document.createElement('td'),
		nntd00 = document.createElement('td'),
		nntdtext00 = document.createTextNode('0'),
		nntdnull1 = document.createElement('td'),
			nntdnull2 = document.createElement('td'),
			nntdnull3 = document.createElement('td'),
			nntdnull4 = document.createElement('td'),
		nntr0 = document.createElement('tr'),
		nntdTextContent0 = document.getElementById('tdA0').value,
		nntdText0 = document.createTextNode(nntdTextContent0),
			nntdText01 = document.createTextNode(nntdTextContent0),
			nntdText02 = document.createTextNode(nntdTextContent0),
		nntd01 = document.createElement('td'),
		nntd02 = document.createElement('td');
		
		nntd01.appendChild(nntdText01);
		nntd02.appendChild(nntdText02);
	
	nth1.appendChild(nthText1);
	nth2.appendChild(nthText2);
	nth3.appendChild(nthText3);
	nth4.appendChild(nthText4);
	nth5.appendChild(nthText5);
	nth6.appendChild(nthText6);
	nth7.appendChild(nthText7);
	nth8.appendChild(nthText8);
	
	nthead.appendChild(nth1);
	nthead.appendChild(nth2);
	nthead.appendChild(nth3);
	nthead.appendChild(nth4);
	nthead.appendChild(nth5);
	nthead.appendChild(nth6);
	nthead.appendChild(nth7);
	nthead.appendChild(nth8);
	
	nntd00.appendChild(nntdtext00);	
	nntd0.appendChild(nntdText0);
	nntr0.appendChild(nntd00);
	nntr0.appendChild(nntd0);
	nntr0.appendChild(nntdnull1);
	nntr0.appendChild(nntdnull2);
	nntr0.appendChild(nntdnull3);
	nntr0.appendChild(nntdnull4);
	nntr0.appendChild(nntd01);
	nntr0.appendChild(nntd02);
	
	nntbody.append(nntr0);
	
	newTable.appendChild(nthead);
	newTable.appendChild(nntbody);
	
	newTable.setAttribute('class' , 'table table-bordered');
		
		
		
		
		
		// For loop for table content
		
		for (x = 1; x < i; x++) {
			if (x <= estimatedLife ) {
				deprciation = deprciation;
			}
			
			else {
				deprciation = 0;
			}
			var nntr = document.createElement('tr'),
				nntd1 = document.createElement('td'),
				nntd2 = document.createElement('td'),
				nntd3 = document.createElement('td'),
				nntd4 = document.createElement('td'),
				nntd5 = document.createElement('td'),
				nntd6 = document.createElement('td'),
				nntd7 = document.createElement('td'),
				nntd8 = document.createElement('td'),
				tdNameA = 'tdA' + x,
				tdNameB = 'tdB' + x,
				tdNameC = 'tdC' + x,
				tdelement2 = document.getElementById(tdNameA).value,
				tdelement3 = document.getElementById(tdNameB).value,
				tdelement4 = document.getElementById(tdNameC).value,
				nntdText2 = document.createTextNode(tdelement2),
				nntdText3 = document.createTextNode(tdelement3),
				nntdText4 = document.createTextNode(tdelement4),
				nntdText5 = document.createTextNode(deprciation),
				revenueValue = document.getElementById(tdNameB).value,
				operatingCost = document.getElementById(tdNameC).value,
				incomeTax = (revenueValue - operatingCost - deprciation) * (taxRate / 100),
				nntdText6 = document.createTextNode(round(incomeTax,2)),
				netCashFlow = revenueValue - operatingCost - incomeTax,
				nntdText7 = document.createTextNode(round(netCashFlow ,2)),
				presentValue = netCashFlow / Math.pow((1+(interestRate/100)) , x),
				nntdText8 = document.createTextNode(round(presentValue,2));
			// create revenue array
			
			revnueArray.push(parseInt(revenueValue));
			netCashFlowArray.push(Math.round(netCashFlow));
			netPresentValueArray.push(Math.round(presentValue));
			
			
			
			// to calculate Income Tax 
			
			
			nntd1.textContent = x;
			nntd2.appendChild(nntdText2);
			nntd3.appendChild(nntdText3);
			nntd4.appendChild(nntdText4);
			nntd5.appendChild(nntdText5);
			nntd6.appendChild(nntdText6);
			nntd7.appendChild(nntdText7);
			nntd8.appendChild(nntdText8);
			
			nntr.appendChild(nntd1);
			nntr.appendChild(nntd2);
			nntr.appendChild(nntd3);
			nntr.appendChild(nntd4);
			nntr.appendChild(nntd5);
			nntr.appendChild(nntd6);
			nntr.appendChild(nntd7);
			nntr.appendChild(nntd8);
			
			nntbody.appendChild(nntr);
			
			newTable.appendChild(nntbody);
			
		}
		
	   
		console.log(netCashFlowArray);
		console.log(netPresentValueArray);
		for (i = 0 ; i < revnueArray.length ; i++ ){
			
			revenueSum += revnueArray[i];
		}
	
		for (i = 0 ; i < netCashFlowArray.length ; i++ ){
			
			netCashFlowSum += netCashFlowArray[i];
		}
		
		for (i = 0 ; i < revnueArray.length ; i++ ){
			
			netPresentValueSum += netPresentValueArray[i];
		}
		
		var newSum1 = netCashFlowSum + parseInt(document.getElementById('tdA0').value),
			newSum2 = netPresentValueSum + parseInt(document.getElementById('tdA0').value);
	
		
		var lasttr = document.createElement('tr'),
			lasttd1 = document.createElement('td'),
			lasttdText1 = document.createTextNode('Total'),
			lasttdBlank1 = document.createElement('td'),
			lasttdBlank2 = document.createElement('td'),
			lasttdBlank3 = document.createElement('td'),
			lasttdBlank4 = document.createElement('td'),
			lasttd2 = document.createElement('td'),
			lasttdText2 = document.createTextNode(revenueSum),
			lasttd3 = document.createElement('td'),
			lasttd4 = document.createElement('td'),
			lasttdText3 = document.createTextNode(newSum1),
			lasttdText4 = document.createTextNode(newSum2);
			
			lasttd1.appendChild(lasttdText1);
			lasttd2.appendChild(lasttdText2);
			lasttd3.appendChild(lasttdText3);
			lasttd4.appendChild(lasttdText4);
			
			lasttr.appendChild(lasttd1);
			lasttr.appendChild(lasttdBlank1);
			lasttr.appendChild(lasttd2);
		    lasttr.appendChild(lasttdBlank2);
		    lasttr.appendChild(lasttdBlank3);
		    lasttr.appendChild(lasttdBlank4);
			lasttr.appendChild(lasttd3);
			lasttr.appendChild(lasttd4);
			
			
			nntbody.appendChild(lasttr);
			
			
			newTable.appendChild(nntbody);
		
	
			
	newTableArea.appendChild(newTable);
	calcBtn.classList.add('disabled');
	plotNcfBtn.style.display = 'block';
	plotNpvBtn.style.display = 'block';
	}
	
}

plotNcfBtn.onclick = function () {
	var plotArea1 = document.getElementById('plot-aria1'),
		years = [];
	
	netCashFlowArray.unshift(parseInt(document.getElementById('tdA0').value));
	
	for (m = 0; m<=netCashFlowArray.length ; m++) {
		years.push(m);
	}
	if (plotArea1.childElementCount == 0) {
		var trace1 = {
  x: years,
  y: netCashFlowArray,
  mode: 'lines',
  name: 'Lines'
};

var data = [trace1];

var layout = {
  title:'NCF Plot',
  xaxis: {
    title: 'Years'
  },
  yaxis: {
    title: 'NCF'
  }
};

Plotly.newPlot('plot-aria1', data, layout);
	}
	this.classList.add('disabled');
}

plotNpvBtn.onclick = function () {
	
}
