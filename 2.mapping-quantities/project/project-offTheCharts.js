var table
var pi = 3.14



var canvaslx = 1366;
var canvasly = 768;
var ybottom = 60;
var ytop = ybottom;
var yzero = canvasly / 2;
var xzero = canvasly / 4 / 3;
var xpadding = canvasly / 6;
var ypadding1 = 10;
var ypadding2 = 40;

var xpadspecial1 = 50;
var ypadspecial1 = 68;



// define layout parameters
var xa = 0;
var xb = xa + xzero;
var xd = canvaslx / 4;
var xc = xd - xpadding;
var xe = canvaslx * 3 / 4;
var xf = xe + xpadding;
var xg = canvaslx - xzero;
var xh = canvaslx;
// -----------------------
var ya = 0;
var yb = ya + ytop;
var yd = canvasly / 3 * 2 - ypadding2;
var yc = yd - 0.75 * canvasly / 3 + ypadding2;;
var ye = canvasly - ybottom;
var yf = canvasly;




// grid
var gridstroke = 150;
var gridweight = 0.5;
var barfill = 0;
var linestroke = 150;
var lineweight = 3;
// -------------------------------------------------------------------------






// -------------------------------------------------------------------------
function preload() {
  table = loadTable('./data/AvgAnnEffDoseAtmTest_uSv.csv', 'csv', 'header');

  above3000m = loadTable('./data/johnstons_subset_above3048m_YieldZtoA.csv', 'csv', 'header')
  below3000m = loadTable('./data/johnstons_subset_below3048m_YieldZtoA.csv', 'csv', 'header')
  above6000m = loadTable('./data/johnstons_subset_above6000m_YieldZtoA.csv', 'csv', 'header')
  below6000m = loadTable('./data/johnstons_subset_below6000m_YieldZtoA.csv', 'csv', 'header')
  otherExposures = loadTable('./data/othersources.csv', 'csv', 'header')
  highyears = loadTable('./data/highyears.csv', 'csv', 'header')

  fontHeadline = loadFont('./assets/CFNuclearWar-Regular.ttf');
  fontBody = loadFont('./assets/veteran_typewriter.ttf');
}






// -------------------------------------------------------------------------
//        grid          grid          #grid          grid
// -------------------------------------------------------------------------
function drawgrid(tabinput, xbeg, y, plotwidth, plotheight, xaxistics, majorint) {

  var colwidth = plotwidth / tabinput.getRowCount();

  stroke(gridstroke);
  strokeWeight(gridweight);
  let x = xbeg;
  // columns
  for (let i = 0; i < xaxistics; i++) {
    if (!(i % majorint)) { strokeWeight(gridweight * 2) };
    line(x, y, x, y - plotheight);
    x += plotwidth / tabinput.getRowCount();
    strokeWeight(gridweight);
  };

  strokeWeight(gridweight * 2);
  line(x, y, x, y - plotheight);
  strokeWeight(gridweight);
  x += plotwidth / table.getRowCount();



  // rows

}










// ------------------------------------------------
// Barplot      Barplot     Barplot    #barplot
// ------------------------------------------------

function barplotColumn(tabinput, colName, x, y, plotwidth, plotheight, barfrac, offset, fillclr) {


  col = tabinput.columns.indexOf(colName)

  var yzero = y;
  var colwidth = plotwidth / tabinput.getRowCount();
  var barwidth = colwidth * barfrac;
  // tabinput.columns

  // draw the zero axis labels on the base---------------------------
  stroke(150);
  strokeWeight(0.5);
  line(x, yzero, x + plotwidth, yzero)


  // get min and max
  // let minx1= 3000;
  // let maxx1 = 0;
  let miny1 = 3000000;
  let maxy1 = -300000;

  for (var i = 0; i < (tabinput.getRowCount()); i++) {
    if (tabinput.getNum(i, col) <= miny1) {
      miny1 = tabinput.getNum(i, col);
    }
    if (tabinput.getNum(i, col) >= maxy1) {
      maxy1 = tabinput.getNum(i, col);
    }
  }
  print(miny1)
  print(maxy1)



  for (let i = 0; i < tabinput.getRowCount(); i++) {
    var year = tabinput.getString(i, 0) // grab the data
    var value = tabinput.getNum(i, col)
    var thisyearatm = 0;
    var thisyearund = 0;

    // y = 100

    // draw the year labels on the base---------------------------
    fill(30)
    push();
    strokeWeight(0.5);
    textStyle(NORMAL)
    textAlign(RIGHT)
    textSize(10)
    translate(x, y + 5);
    rotate(-pi / 2);
    text(year, 0, 12);
    pop()



    fill(fillclr);


    rect(x + offset * barwidth, yzero, barwidth, -(map(value, 0, maxy1, 0, plotheight)));
    // rect(x,yzero,barwidth,thisyearund);

    x += colwidth // shift rightward to next col
  }

}







// -------------------------------------------------------------------------
//      linegraph         linegraph       linegraph
// -------------------------------------------------------------------------

function linegraph(tabinput, colName, x, y, plotwidth, plotheight, barfrac, offset, strkWght, strkClr) {

  var col = tabinput.columns.indexOf(colName);

  var yzero = y - plotheight / 100;
  var colwidth = plotwidth / table.getRowCount();
  // var barwidth = colwidth * barfrac;
  var x2 = x;

  stroke(150);
  strokeWeight(1);
  line(x, yzero, x + plotwidth, yzero)
  line(x, y - ybottom, x, y - plotheight + ybottom)

  // --------------------draw linegraph
  for (var i = 0; i < (tabinput.getRowCount() - 1); i++) {

    var thisinfo = tabinput.getNum(i, 0) // grab the data
    var nextinfo = tabinput.getNum(i + 1, 0) // grab the next data
    var thisyearund = 0;
    var nextyearund = 0;
    var thisval = tabinput.getNum(i, col);
    var nextval = tabinput.getNum(i + 1, col)
    var colwidth = plotwidth / table.getRowCount();
    var year = tabinput.getString(i, 0) // grab the data
    var nextyear = tabinput.getString(i + 1, 0) // grab the data

    // calculate totals one column at a time---------------------------
    // table.countries.forEach(function(country){
    //   thisyearund += thisinfo.details[country].underground;
    //   nextyearund += nextinfo.details[country].underground;
    //       print(thisyearund + ' ' + nextyearund + ' ' + colwidth)
    // })
    strokeWeight(strkWght);
    stroke(strkClr);
    line(x2, yzero - thisval, x2 + colwidth, yzero - nextval)
    x2 += colwidth;

  }

  //     push();
  // stroke(0);
  // strokeWeight(0.5);
  // textStyle(NORMAL)
  // textAlign(RIGHT)
  // translate(x2, y - ybottom);
  // rotate(-pi / 2);
  // text(nextyear, 0, 5);
  // pop()

}






// ---------------------------------------------------------------------
//      Pallette  Pallette  Pallette
// ---------------------------------------------------------------------

function getpalette(tabinput, colNames, colorstring, numberOfShades) {
  // calculate the data max in any given year/column

  var totals = []
  var lowest = 0
  var highest = 0
  var keepvalue;


  for (var r = 0; r < tabinput.getRowCount(); r++) {
    // cycle through all applicable columns
    colNames.forEach(function(value, index) {
      var col = tabinput.columns.indexOf(value)
      keepvalue = table.getNum(r, index)
    });
    highest = Math.max(keepvalue, highest)
  }

  // print(highest)
  // draw a box for each year and set its color based on the total number of tests
  return Brewer.sequential(colorstring, numberOfShades, lowest, highest)
};













// -------------------------------------------------------------------------
//            Bubbles bubble bubbles #bubbles
// -------------------------------------------------------------------------

// Draw bubble with diameter related to surface area rather than radius
function drawbubbleArea(x, y, A, strkWght, strkClr, fillclr) {

  strokeWeight(strkWght);
  stroke(strkClr);
  // print("that" + fillclr)
  fill(fillclr);

  var D = sqrt(4 * A / pi);

  circle(x, y, D)

}

// -------------------------------------------------------------------------
//                  (table,   "WorldTotal"                        ,xx,yy,     ww,         hh   yoffsetfrac scaley ,szescale,   0,        0.2,  '#000' , palette)
function bubblePlot(tabinput, varName1, varName2, varName3, varName4, x, y, plotwidth, plotheight, zeroratio, yscale, scalebubble, offset, strkWght, strkClr, palette) {

  // find the column number (counting from 0)
  var col1 = tabinput.columns.indexOf(varName1);
  var col2 = tabinput.columns.indexOf(varName2);
  var col3 = tabinput.columns.indexOf(varName3);
  if (varName4 != null) { var col4 = tabinput.columns.indexOf(varName4); }


  // get min and max
  let minx1 = 3000;
  let maxx1 = 0;
  let miny1 = 3000000;
  let maxy1 = -300000;

  for (var i = 0; i < (tabinput.getRowCount()); i++) {
    if (tabinput.getNum(i, col1) <= minx1) {
      minx1 = tabinput.getNum(i, col1);
    }
    if (tabinput.getNum(i, col1) >= maxx1) {
      maxx1 = tabinput.getNum(i, col1);
    }
    if (tabinput.getNum(i, col2) <= miny1) {
      miny1 = tabinput.getNum(i, col2);
    }
    if (tabinput.getNum(i, col2) >= maxy1) {
      maxy1 = tabinput.getNum(i, col2);
    }
  }





  // if (zeroratio){
  let yzero = y - map(0, miny1, maxy1, 0, plotheight)
  // }
  // else { 
  //   let yzero = y- ypadding1;
  // }

  if (zeroratio != 0) {
    let j = miny1;
    // Add tics for axis here....
    while (j <= maxy1) {
      ytic = map(j, miny1, maxy1, 0, plotheight)
      j += 500;
      line(x - 2, y - ytic - ypadding1, x + 2, y - ytic - ypadding1);
    }
  }
  else {
    let j = miny1;
    // Add tics for axis here....
    while (j <= maxy1) {
      ytic = map(j, miny1, maxy1, 0, plotheight)
      j += 100000;
      line(x - 2, y - ytic - 3, x + 2, y - ytic - 3);
    }
  }



  var colwidth = plotwidth / tabinput.getRowCount();
  var x2 = x;

  stroke(150);
  strokeWeight(1);
  line(x, yzero, x + plotwidth, yzero) // xaxis
  line(x, y, x, y - plotheight + ypadding1)


  // --------------------draw bubblechart
  for (var i = 0; i < (tabinput.getRowCount()); i++) {

    let colwidth = plotwidth / table.getRowCount();
    let thismon = tabinput.getNum(i, col4) / 12; // grab the data
    let thisx = map(tabinput.getNum(i, col1) + thismon, minx1, maxx1, x, x + plotwidth); // grab the data
    let year = tabinput.getString(i, col1); // grab the data
    let thisy = map(tabinput.getNum(i, col2), miny1, maxy1, 0, plotheight - ypadding1 * 2); // grab the data
    // print(thisy)
    let thisSze = tabinput.getNum(i, col3); // grab the data


    var fillClr = palette.colorForValue(thisSze);
    fillClr.setAlpha(50)
    // print("this " + fillClr)
    drawbubbleArea(thisx, y - thisy, thisSze * scalebubble, strkWght, strkClr, fillClr)
    strokeWeight(strkWght * 2);
    stroke('#888888');
    line(thisx, yzero, thisx, y - thisy)


    x2 += colwidth;

  }

}














// --------------------------------------------------------------------------------
//        Labels        Labels        Labels        Labels
// --------------------------------------------------------------------------------
function xaxislabel(tabinput, colName, x, y, plotwidth, plotheight, txtsze, offset, strkWght, strkClr, majorint) {

  var col = tabinput.columns.indexOf(colName)
  var yzero = y - plotheight / 2;
  var colwidth = plotwidth / tabinput.getRowCount();
  var x2 = x;

  // --------------------draw linegraph
  for (var i = 0; i < (tabinput.getRowCount()); i++) {
    var year = tabinput.getString(i, 0) // grab the data

    // // draw the year labels on the base---------------------------

    // print('plotting' + year)
    if (!(year % majorint)) {
      push();
      stroke(0);
      strokeWeight(0.5);
      textStyle(NORMAL)
      textAlign(CENTER)
      textSize(txtsze);
      translate(x2, y - ypadding1);
      // rotate(-pi / 2);
      text(year, 0, 12);
      pop()
    }

    x2 += colwidth;

  }


  if (colName != "YEAR") {
    push();
    stroke(0);
    strokeWeight(0.5);
    textStyle(NORMAL)
    textAlign(CENTER)
    textSize(txtsze);
    translate(x2, y - ypadding1);
    // rotate(-pi / 2);
    text("2000", 0, 12);
    pop()
  }

  if (colName == "YEAR") {
    push();
    stroke(0);
    strokeWeight(0.5);
    textStyle(NORMAL)
    textAlign(CENTER)
    textSize(txtsze);
    translate(x2, y - ypadding1);
    // rotate(-pi / 2);
    text("1966", 0, 12);
    pop()
  }
}





function yaxislabel(input, x, y, plotwidth, plotheight, txtsze) {
  push();
  stroke(0);
  strokeWeight(0.5);
  textStyle(NORMAL)
  textAlign(CENTER)
  textSize(txtsze);
  translate(x, y - plotheight / 2);
  rotate(-pi / 2);
  text(input, 0, -5);
  pop()
}






function yaxistics(tabinput, varName1, varName2, x, y, plotwidth, plotheight, ticsize, finetune, strkWght, strkClr, txtsze) {

  stroke(strkClr);
  strokeWeight(strkWght);
  textSize(txtsze)
  // find the column number (counting from 0)
  let col1 = tabinput.columns.indexOf(varName1);
  let col2 = tabinput.columns.indexOf(varName2);
  textAlign(RIGHT)
  
  // ---------------------------
  let miny1 = 3000000;
  let maxy1 = -300000;


  for (var i = 0; i < (tabinput.getRowCount()); i++) {
    if (tabinput.getNum(i, col2) <= miny1) {
      miny1 = tabinput.getNum(i, col2);
      print("The min is: " + miny1)
    }
    if (tabinput.getNum(i, col2) >= maxy1) {
      maxy1 = tabinput.getNum(i, col2);
      print("The max is: " + maxy1)
    }
  }


  let yzero = y - map(0, miny1, maxy1, 0, plotheight)

    let j = miny1;
    let k = j;
    // Add tics for axis here....
    while (j <= maxy1) {
      ytic = map(j, miny1, maxy1, 0, plotheight)
      j += map(ticsize, miny1, maxy1, 0, plotheight)
      line(x - 2, y - ytic- finetune , x + 2, y - ytic - finetune);
      text(round(k),x-4,y-ytic )
      k += ticsize;
    }

}


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------













// -------------------------------------------------------------------------
//        Setup        Setup        #setup Setup        Setup
// -------------------------------------------------------------------------
function setup() {
  // log the whole dataset to the console so we can poke around in it
  // print(table)

  // print(above3000m)
  // print(below3000m)
  // print(above6000m)
  // print(below6000m)
  // print(otherExposures)
  print(highyears)



  // do initialization
  var plotwidth = canvaslx * 0.5;
  var plotheight = canvasly * 0.5;
  var x = xzero;
  var y = 100
  var rowweight = 20
  var barfrac = 1;
  // var colWidth = 10




  // set up typography
  textFont("Calibri Light")
  textSize(16)
  fill(30)
  noStroke()



  createCanvas(canvaslx, canvasly)
  background("#FEFCF5") //("#FEFCF0")
  // c1 = color(255, 204, 0);
  // c1 = color(100, 100, 100);
  // c2 = color(255);
  // setGradientTop(c1, c2);
  // setGradientBottom(c1,c2);








  // ---------------------------Plot bottom---------------------------
  xx = xd
  yy = ye
  ww = xe - xd;
  hh = ye - yd - ypadding1 * 5;
  majorint = 5;
  bb = barfrac * 0.2;
  szescale = 0.075;
  yscale = 1;
  // data xstrt y wdth hgt  rowcount            majorgridlines
  drawgrid(table, xd, yy, ww, hh, table.getRowCount(), majorint);

  textStyle(NORMAL);
  textAlign(CENTER);
  textSize(16);
  stroke(0);
  fill(0);
  text('Yield at Height of Burst', (xd + ww / 2), ye - hh - ypadding1)
  text('Year of test', (xd + ww / 2), ye + ypadding1 * 4)
  xaxislabel(table, "WorldExternal", xx, yy + ypadding1, ww, hh, 12, 0, 1, '#e00', 5)
  yaxislabel('Height of Burst (km)', xx, yy, ww, hh, 12)
  //         data   value            x  y  w  h  scl       or  strW  str   fill   palette        
  var palette = getpalette(table, ["WorldExternal", "WorldIngestiona", "WorldInhalation", "WorldTotal"], "BuPu", 9);
  // bubblePlot(table, "WorldExternal", xx, yy, ww, hh, szescale, 0, 0.2, '#000', palette)
  // bubblePlot(table, "WorldIngestiona", xx, yy, ww, hh, szescale, 0, 0.2, '#000', palette)
  // bubblePlot(table, "WorldInhalation", xx, yy, ww, hh, szescale, 0, 0.2, '#000', palette)

  // print(pallet)
  //    (tabinput,             colName,               x,  y, wdth, hgt, zerorat   scal    scal,  offset,strkWght, strkClr, palette)
  bubblePlot(below3000m, "YEAR", "HOB", "YIELD", "MON_NUM", xx, yy, ww, hh, 1, yscale, szescale, 0, 0.2, '#000', palette)
  yaxistics(below3000m, "YEAR", "HOB", xx, yy, ww, hh, 500, 2,0.2 ,"#000",8)









  // ---------------------------Plot middle---------------------------
  xx = xd
  yy = yd
  ww = xe - xd;
  hh = yd - yc;
  majorint = 5;
  bb = barfrac * 0.2;
  // data xstrt y wdth hgt  rowcount            majorgridlines
  drawgrid(table, xd, yy, ww, hh, table.getRowCount(), majorint);
  textStyle(NORMAL);
  textAlign(CENTER);
  textSize(16);
  stroke(0);
  fill(0);
  text('Radiation Worldwide', (xd + ww / 2), yy - hh - ypadding1)
  xaxislabel(table, "Years", xx, yy + ypadding1, ww, hh, 12, 0, 1, '#e00', 5)
  yaxislabel('Radiation (uSv)', xx-20, yy, ww, hh, 12)

  // linegraph(table,"NH_Total",xx,yy,ww,hh,bb,0,1,'#777')
  // linegraph(table,"NH_Inhalation",xx,yy,ww,hh,bb,0,1,'#ggg')
  linegraph(table, "WorldTotal", xx, yy, ww, hh, bb, 0, 1, '#000')
    //                                                 scale  stroke strkclr
  yaxistics(table, "Year", "WorldTotal", xx, yy, ww, hh, 10, 2,0.2 ,"#000",8)
  //"Year", "NH_External", "NH_Ingestional", "NH_Inhalation", "NH_Total", 
  // "SH_External", "SH_Ingestional", "SH_Inhalation", "SH_Total", 
  //"WorldExternal", "WorldIngestiona", "WorldInhalation", "WorldTotal"












  // ---------------------------Plot left---------------------------
  xx = xb
  yy = ye - ypadspecial1;
  ww = xc - xb;
  hh = ye - yb - ypadspecial1;
  majorint = 2;
  bb = barfrac * 0.2;
  szescale = 0.075;
  yscale = 1;
  // data xstrt y wdth hgt  rowcount            majorgridlines
  // print(xx);
  // print(hh)
  // print(xc)
  // drawgrid(highyears, xx, yy, ww, hh, highyears.getRowCount(),majorint);
  textStyle(NORMAL);
  textAlign(CENTER);
  textSize(16);
  stroke(0);
  fill(0);
  text('High Altitude Tests', (xb + ww / 2), yy - hh - ypadding1);
  xaxislabel(highyears, "YEAR", xx, yy + ypadding2, ww, hh, 12, 0, 1, '#e00', majorint);
  yaxislabel('Height of Burst (100 km)', xx, yy, ww, hh, 12);
  //         data   value            x  y  w  h  scl       or  strW  str   fill   palette        
  var palette = getpalette(table, ["WorldExternal", "WorldIngestiona", "WorldInhalation", "WorldTotal"], "BuPu", 9);
  //    (tabinput,             colName,               x,  y, wdth, hgt, zerorat   scal    scal,  offset,strkWght, strkClr, palette)
  bubblePlot(above3000m, "YEAR", "HOB", "YIELD", "MON_NUM", xx, yy, ww, hh, 0, yscale, szescale, 0, 0.2, '#000', palette)

  // bubblePlot(below3000m, "YEAR","HOB","YIELD","MON_NUM", xx, yy, ww, hh, 1    , yscale ,szescale, 0,    0.2,      '#000',   palette)














  // ---------------------------------------Plot right


  xx = xf
  yy = yd;
  ww = xg - xf;
  hh = yd - yb;
  majorint = 2;
  bb = barfrac * 0.5;
  szescale = 0.075;
  yscale = 1;


  drawgrid(otherExposures, xf, yd, ww, hh, otherExposures.getRowCount(), majorint);
  textStyle(NORMAL);
  textAlign(CENTER);
  textSize(16);
  stroke(0);
  fill(0);
  text('Radiation Comparison', (xf + ww / 2), yd - hh - ypadding1)
  textStyle(NORMAL);
  textAlign(RIGHT);
  // xaxislabel(otherExposures, "Years", xx, yy+ypadding1, ww, hh, 12, 0, 1, '#e00',5)
  yaxislabel('Radiation uSv', xx, yy, ww, hh, 12)

  barplotColumn(otherExposures, "mSv", xf, yd, ww, hh, bb, 0.5, '#e00')
  // barplotColumn(table,"WorldIngestiona",xx,yy,ww,hh,bb,1,'#0e0')
  // barplotColumn(table,"WorldInhalation",xx,yy,ww,hh,bb,2,'#00e')






  // Text


  stroke(50)
  fill(50)
  strokeWeight(0.1)
  textFont(fontBody)
  textSize(14)
  textAlign(LEFT)
  let s = 'Atmospheric radiation due to fallout from nuclear weapons testing reached \
 its peak in 1963, but was dramatically reduced after the signing of the Partial \
 Test Ban Treaty (PTBT) in 1963. The treaty banned nuclear tests in the atmosphere,  \
 outer space and under water, which mostly limited subsequent nuclear bomb testing \
 to under ground. However, not all nations signed the treaty and continued atmospheric \
 nuclear testing. France conducted its last atmospheric test in 1974 and China in 1980. \
 Testing below ground also did not prove to be entirely safe and some containment \
 failures occurred, through venting and seepage. A notable blow-out event occurred \
 during the Baneberry test that released gases up to an altitude of 3km (10kft). \
 Worldwide political events and containment failures such as Baneberry kept \
 nuclear testing in the public eye and placed more pressure on nation states \
 to sign the Comprehensive Test Ban Treaty (CTBT), which aims to stop all \
 nuclear tests where explosions occur.';
  text(s, xd, yb + ypadding1 * 3, xe - xd, yc - yb); // Text wraps within text box

  textFont('Helvetica')
  textAlign(CENTER)
  textSize(20)
  // let t = "Radiation fallout effects of atmospheric and upper atmospheric Nuclear testing"
  let t = "ATMOSPHERIC AND UPPER ATMOSPHERIC NUCLEAR TESTING \n AND ASSOCIATED FALLOUT RADIATION"
  text(t, canvaslx / 2, ypadding1 * 2); // Text wraps within text box






  // for (var i=0; i<years.length; i++){
  //   // draw the box
  //   var color = palette.colorForValue(totals[i])
  //   fill(color)
  //   rect(x, y, dim, dim)

  //   // draw the year number on top
  //   fill('white')
  //   text(years[i], x+dim*.5, y+dim*.6)
  //   x+=dim
  // }



  //   // draw country name labels on the left edge of the table
  //   // textStyle(BOLD)
  //   // textAlign(RIGHT)
  //   // for (var c=0; c<table.countries.getRowCount(); c++){
  //   //   var country = table.countries[c]
  //   //   text(country, x-colWidth, y)
  //   //   y += rowHeight
  //   // }








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
  for (var y = 0; y < height / 2; y++) {
    var inter = map(y, 0, height / 2, 0, 1);
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

function legend(legx, legy, barwidth) {
  textStyle(NORMAL)
  textAlign(LEFT)
  push();
  translate(legx, legy)
  fill(255)
  stroke(0)
  strokeWeight(2)
  rect(0, 0, 240, 80)
  fill(0)
  stroke(0)
  strokeWeight(1)
  text('Legend', 20, 20)
  text('Above ground testing', 20, 40)
  text('Below ground testing', 20, 60)
  fill(0)
  rect(200, 40, barwidth, 40 - 50)
  stroke(linestroke);
  strokeWeight(lineweight)
  line(200, 60, 220, 60)
  pop()
}




function ylabel() {
  textStyle(NORMAL)

  stroke(150);
  strokeWeight(0.5);
  fill(0);

  textAlign(LEFT)
  push();
  translate(xzero / 3 * 2, yzero);
  rotate(-pi / 2);
  text('No. above ground', 10, 0);
  pop();

  textAlign(RIGHT)
  push();
  translate(xzero / 3 * 2, yzero);
  rotate(-pi / 2);
  text('No. below ground', -10, 0);
  pop();
}