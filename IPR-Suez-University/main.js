 function round(value,decimals) {
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
  var myBtn = document.getElementById('calc'),
      zt = [],
      nt = [],
      zx = [],
      nx = [],
      valueBtn = document.getElementById('valueBtn'),
      table = document.getElementById('table'),
      valueInterval = document.getElementById('value-interval'),
      myDiv = document.getElementById('myDiv');
  myBtn.onclick= function() {
    var z = [],
      n = [],
      Pr = document.getElementById('Pr').value,
      Pb = document.getElementById('Pb').value,
      qTest = document.getElementById('qTest').value,
      pTest = document.getElementById('pTest').value,
      Pwf,
      results = document.getElementById('results');
    if (Pr == '' || qTest == '' || pTest == '') {
      alert('Please insert your values');
    }
    else {
       if (Pr < Pb) {
        var Qmax = (qTest) / (1 - (0.2*(pTest/Pr)) - (0.8*((pTest*pTest)/(Pr*Pr))));

      results.innerHTML = 'q'+'<sub>'+'max'+'</sub>'+' = ' + round(Qmax,2) + " STB/Day";

  for (Pwf = 0 ; Pwf <= Pr ; Pwf = Pwf + 0.1){
       z.push(Pwf);
       n.push((Qmax)*(1-(0.2*(Pwf/Pr))-(0.8*((Pwf*Pwf)/(Pr*Pr)))));
  }
  // Create table value here
  valueBtn.style.display = 'block';
  valueInterval.style.display = 'block';
  valueBtn.onclick = function() {
var valueInterval2 = document.getElementById('value-interval');
console.log(parseInt(valueInterval2.value));
    if (table.childElementCount == 0) {
      var i = 0;
      for (i; i<Pr; i=i+parseInt(valueInterval2.value)) {
      zt.push(i);
      nt.push((Qmax)*(1-(0.2*(i/Pr))-(0.8*((i*i)/(Pr*Pr)))));
    }
    zt.push(parseInt(Pr));
    nt.push((Qmax)*(1-(0.2*(parseInt(Pr)/parseInt(Pr)))-(0.8*((parseInt(Pr)*parseInt(Pr))/(parseInt(Pr)*parseInt(Pr))))));
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
  valueBtn.click();
} 



  }
var trace2 = {
  x: n,
  y: z,
  mode: 'lines',
  name: 'Lines'
};

var data = [trace2];

var layout = {
  title:'IPR Curve Using Vogel Method',
  xaxis: {
    title: 'q STB/Day'
  },
  yaxis: {
    title: 'Pwf psig'
  }
};

Plotly.newPlot('myDiv', data, layout);
  }
   else {
       // For Undersaturated Reservoirs
       //Comparing test point
       var pArray=[],
           qArray=[];
       if(pTest > Pb) {
        var j = qTest / (Pr-pTest);
        for (m=0;m<Pb;m = m+0.1){
          pArray.push(m);
          qArray.push(j*(Pr-Pb) + ((j*Pb)/1.8)*(1-(0.2*(m/Pb))-(0.8*(m*m)/(Pb*Pb))));
        }
        for (i=Pr; i>=Pb;i = i-0.1) {
          pArray.push(i);
          qArray.push(j*(Pr-i));
        }
        // Create table value here
  valueBtn.style.display = 'block';
  valueInterval.style.display = 'block';
   results.innerHTML = 'J = ' + round(j,2) + " STB/day.psi" + '<br>' + 'q' + '<sub>' +'max'+'</sub>' +' = ' +round(qArray[0],2) + ' STB/day';
  valueBtn.onclick = function() {
var valueInterval2 = document.getElementById('value-interval');
console.log(parseInt(valueInterval2.value));
    if (table.childElementCount == 0) {
      var i = 0;
      for (i; i<=Pb; i=i+parseInt(valueInterval2.value)) {
      zt.push(i);
      nt.push(j*(Pr-Pb) + ((j*Pb)/1.8)*(1-(0.2*(i/Pb))-(0.8*(i*i)/(Pb*Pb))));
    }
    for (m = zt[zt.length-1] +parseInt(valueInterval2.value); m<=Pr; m=m+parseInt(valueInterval2.value)) {
      zt.push(m);
      nt.push(j*(Pr-m));
    }

    if (zt[zt.length-1] != Pr) {
      zt.push(Pr);
    nt.push(j*(Pr-Pr));
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

        var trace3 = {
  x: qArray,
  y: pArray,
  mode: 'lines',
  name: 'Lines'
};

var data = [trace3];

var layout = {
  title:'IPR Curve Using Vogel Method',
  xaxis: {
    title: 'q STB/Day'
  },
  yaxis: {
    title: 'Pwf psig'
  }
};

Plotly.newPlot('myDiv', data, layout);
  
       }
       else {
        // For Undersaturated Reservoirs
       //Comparing test point
       var j = qTest / ((Pr-Pb)+(Pb/1.8)*(1-(0.2*(pTest/Pb))-(0.8*((pTest*pTest)/(Pb*Pb)))));
        for (m=0;m<Pb;m = m+0.1){
          pArray.push(m);
          qArray.push(j*(Pr-Pb) + ((j*Pb)/1.8)*(1-(0.2*(m/Pb))-(0.8*(m*m)/(Pb*Pb))));
        }
        for (i=Pr; i>=Pb;i = i-0.1) {
          pArray.push(i);
          qArray.push(j*(Pr-i));
        }
        // Create table value here
  valueBtn.style.display = 'block';
  valueInterval.style.display = 'block';
   results.innerHTML = 'J = ' + round(j,2) + " STB/day.psi" + '<br>' + 'q' + '<sub>' +'max'+'</sub>' +' = ' +round(qArray[0],2) + ' STB/day';
  valueBtn.onclick = function() {
var valueInterval2 = document.getElementById('value-interval');
console.log(parseInt(valueInterval2.value));
    if (table.childElementCount == 0) {
      var i = 0;
      for (i; i<=Pb; i=i+parseInt(valueInterval2.value)) {
      zt.push(i);
      nt.push(j*(Pr-Pb) + ((j*Pb)/1.8)*(1-(0.2*(i/Pb))-(0.8*(i*i)/(Pb*Pb))));
    }
    for (m = zt[zt.length-1] +parseInt(valueInterval2.value); m<=Pr; m=m+parseInt(valueInterval2.value)) {
      zt.push(m);
      nt.push(j*(Pr-m));
    }

    if (zt[zt.length-1] != Pr) {
      zt.push(Pr);
    nt.push(j*(Pr-Pr));
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

  var trace3 = {
  x: qArray,
  y: pArray,
  mode: 'lines',
  name: 'Lines'
};

var data = [trace3];

var layout = {
  title:'IPR Curve Using Vogel Method',
  xaxis: {
    title: 'q STB/Day'
  },
  yaxis: {
    title: 'Pwf psig'
  }
};

Plotly.newPlot('myDiv', data, layout);

} 
 }
  }
   } 

    // scroll effect

    document.onscroll = function() {
      var scrollValue = document.documentElement.scrollTop;
      if (scrollValue >= 110) {
        myDiv.classList.add('scrolled');
      }
      else {
       myDiv.classList.remove('scrolled');
      }
      console.log(scrollValue);
    } 

   