var table
var pi = 3.14

var canvaslx = 1400;
var canvasly = 600;
var ybottom = 50;
var ytop = canvasly-ybottom;
var yzero = canvasly/2;
var xzero = 50;

// grid
var gridstroke = 150;
var gridweight = 0.5;
var barfill = 0;
var linestroke = 150;
var lineweight = 3;

// -------------------------------------------------------------------------

function preload(){
  table = loadTable('./data/AvgAnnEffDoseAtmTest_uSv.csv','csv','header')
}






// -------------------------------------------------------------------------
function drawgrid(tabinput,xzero,y,plotwidth,plotheight,xaxistics){
  
  var colwidth = plotwidth/tabinput.getRowCount();
  
    stroke(gridstroke);
    strokeWeight(gridweight);
    let x = xzero;
    // let y = ybottom;
    // columns
      for (let i=0; i < xaxistics; i++){
        line(x,y-ybottom,x,y-plotheight+ybottom);
        x += plotwidth/table.getRowCount();
        
      //         for (let j=y; j<(plotheight/2); i+=1){
      //   line(xzero,j-plotheight,plotwidth,j-plotheight);
      // };
      
      };
        line(x,y-ybottom,x,y-plotheight+ybottom);
        x += plotwidth/table.getRowCount();
          
    // rows

}






// ------------------------------------------------
function barplotColumn(tabinput,colName,x,y,plotwidth,plotheight,barfrac,offset,fillclr){
  
  
  col = tabinput.columns.indexOf(colName)
  
  var yzero = y-plotheight/2;
  var colwidth = plotwidth/table.getRowCount();
  var barwidth = colwidth*barfrac;
  // tabinput.columns
  
 for (let i=0; i<tabinput.getRowCount(); i++){
    var year = tabinput.getString(i,0) // grab the data
    var value = tabinput.getNum(i,col)
    var thisyearatm = 0;
    var thisyearund = 0;
    
    // y = 100

    // draw the year labels on the base---------------------------
    fill(30)
    push();
    strokeWeight(0.5);
    textStyle(NORMAL)
    textAlign(RIGHT)
    translate(x, y-ybottom);
    rotate(-pi/2);
    text(year, 0,5);
    pop()
    
    // draw the zero axis labels on the base---------------------------
    stroke(150);
    strokeWeight(0.5);
    line(x,yzero,plotwidth,yzero)
    
    fill(fillclr);
    rect(x+offset*barwidth,yzero,barwidth,-value);
    // rect(x,yzero,barwidth,thisyearund);

    x += colwidth // shift rightward to next col
  }

}






















// -------------------------------------------------------------------------
function setup(){
    // log the whole dataset to the console so we can poke around in it
  print(table)
  
  var plotwidth = canvaslx*0.5;
  var plotheight = canvasly*0.5;
  var x = xzero;
  var y = 100
  var rowweight = 20
  var barfrac = 1;
  // var colWidth = 10

  
    // set up typography
  textFont("Rokkitt")
  textSize(12)
  fill(30)
  noStroke()
  
  createCanvas(canvaslx, canvasly)
  background(230)
  // c1 = color(255, 204, 0);
  // c1 = color(100, 100, 100);
  // c2 = color(255);
  // setGradientTop(c1, c2);
  // setGradientBottom(c1,c2);
  
  //"Year", "NH_External", "NH_Ingestional", "NH_Inhalation", "NH_Total", 
// "SH_External", "SH_Ingestional", "SH_Inhalation", "SH_Total", 
//"WorldExternal", "WorldIngestiona", "WorldInhalation", "WorldTotal"
  
  xx=30;
  yy= canvasly*0.5
  ww=canvaslx*0.4;
  hh=plotheight;
  bb=barfrac*0.2;
  drawgrid(table,xx,yy,ww,hh,table.getRowCount());
  textStyle(NORMAL); textAlign(CENTER);
  stroke(0);fill(0);text('Radiation Northern Hemisphere',(xx+ww/2),yy-hh*0.8)
  barplotColumn(table,"NH_External",xx,yy,ww,hh,bb,0,'#e00')
  barplotColumn(table,"NH_Ingestional",xx,yy,ww,hh,bb,1,'#0e0')
  barplotColumn(table,"NH_Inhalation",xx,yy,ww,hh,bb,2,'#00e')


  xx=canvaslx*0.5+20;
  yy= canvasly*0.5
  ww=canvaslx*0.4;
  hh=plotheight;
  bb=barfrac*0.2;
  drawgrid(table,xx,yy,ww,hh,table.getRowCount());
  textStyle(NORMAL); textAlign(CENTER);
    stroke(0);fill(0);text('Radiation Southern Hemisphere',(xx+ww/2),yy-hh*0.8)
  barplotColumn(table,"SH_External",xx,yy,ww,hh,bb,0,'#e00')
  barplotColumn(table,"SH_Ingestional",xx,yy,ww,hh,bb,1,'#0e0')
  barplotColumn(table,"SH_Inhalation",xx,yy,ww,hh,bb,2,'#00e')



  xx=(30+canvaslx*0.5)/2
  yy= canvasly
  ww=canvaslx*0.4;
  hh=plotheight;
  bb=barfrac*0.2;
  drawgrid(table,xx,yy,ww,hh,table.getRowCount());
  textStyle(NORMAL); textAlign(CENTER);
  stroke(0);fill(0);text('Radiation Worldwide',(xx+ww/2),yy-hh*0.8)
  // barplotColumn(table,"mSv",xx,yy,ww,hh,bb,0,'#e00')
  barplotColumn(table,"WorldIngestiona",xx,yy,ww,hh,bb,1,'#0e0')
  barplotColumn(table,"WorldInhalation",xx,yy,ww,hh,bb,2,'#00e')





//   // draw country name labels on the left edge of the table
//   // textStyle(BOLD)
//   // textAlign(RIGHT)
//   // for (var c=0; c<table.countries.getRowCount(); c++){
//   //   var country = table.countries[c]
//   //   text(country, x-colWidth, y)
//   //   y += rowHeight
//   // }



  // for (var i=0; i<table.getRowCount(); i++){
  //   var year = table.getString(i,0) // grab the data
  //   var value = table.getNum(i,1)
  //   var thisyearatm = 0;
  //   var thisyearund = 0;
    
  //   y = 100

  //   // draw the year labels on the base---------------------------
  //   fill(30)
  //   push();
  //   strokeWeight(0.5);
  //   textStyle(NORMAL)
  //   textAlign(RIGHT)
  //   translate(x, canvasly-ybottom);
  //   rotate(-pi/2);
  //   text(year, 0,0);
  //   pop()
    
  //   // draw the zero axis labels on the base---------------------------
  //   stroke(150);
  //   strokeWeight(0.5);
  //   line(0,yzero,canvaslx,yzero)




  //   // calculate totals one column at a time---------------------------
  //   // table.countries.forEach(function(country){
  //   //   thisyearatm += info.details[country].atmosphere;
  //   //   thisyearund += info.details[country].underground;
  //   // })
    
    
  //   fill(0);
  //   rect(x,yzero,barwidth,-value);
  //   // rect(x,yzero,barwidth,thisyearund);

  //   x += colwidth // shift rightward to next col
  // }
  
  
  
//   // --------------------draw linegraph
//   strokeWeight(lineweight);
//   stroke(linestroke);
//   var x2 = xzero;
//   for (var i=0; i < (table.Year.getRowCount()-1); i++){
       
//     var thisinfo = table.Year[i] // grab the data
//     var nextinfo = table.Year[i+1] // grab the next data
//     var thisyearund = 0; 
//     var nextyearund = 0; 
//     var colwidth = canvaslx/table.Year.getRowCount();
//         // calculate totals one column at a time---------------------------
//     table.countries.forEach(function(country){
//       thisyearund += thisinfo.details[country].underground;
//       nextyearund += nextinfo.details[country].underground;
//           print(thisyearund + ' ' + nextyearund + ' ' + colwidth)
//     })
//     line(x2,yzero+thisyearund,x2+colwidth,yzero+nextyearund)
//     x2 += colwidth;
//   }
  
  
// textStyle(NORMAL)
// textAlign(CENTER)
// stroke(230);
// strokeWeight(0.5);
// fill(230)
// text('TOTAL AMOUNT OF NUCLEAR TESTS PER YEAR', canvaslx/2,20);

// legend(900,50,barwidth)
// ylabel()




}






// -------------------------------------------------------------------------
// gradient function obtained from p5.js website
function setGradientTop(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height/2; y++) {
    var inter = map(y, 0, height/2, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
function setGradientBottom(c1, c2) {
  // noprotect
  noFill();
  for (var y = yzero; y < height; y++) {
    var inter = map(y, yzero, height, 1, 0);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// -------------------------------------------------------------------------

function legend(legx,legy,barwidth){
textStyle(NORMAL)
textAlign(LEFT)
  push();
  translate(legx,legy)
  fill(255)
  stroke(0)
  strokeWeight(2)
  rect(0,0,240,80)
  fill(0)
  stroke(0)
  strokeWeight(1)
  text('Legend', 20,20)
  text('Above ground testing', 20,40)
  text('Below ground testing',20,60)
  fill(0)
  rect(200,40,barwidth,40-50)
  stroke(linestroke); strokeWeight(lineweight)
  line(200,60,220,60)
  pop()
}

function ylabel(){
  textStyle(NORMAL)

stroke(150);
strokeWeight(0.5);
fill(0);

  textAlign(LEFT)
  push();
  translate(xzero/3*2,yzero);
  rotate(-pi/2);
  text('No. above ground',10,0);
  pop();
  
  textAlign(RIGHT)
  push();
  translate(xzero/3*2,yzero);
  rotate(-pi/2);
  text('No. below ground',-10,0);
  pop();
}