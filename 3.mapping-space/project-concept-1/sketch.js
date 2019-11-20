// the data loaded from a USGS-provided CSV file
var table;

// my leaflet.js map
var mymap;
var pi = 3.14;





function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("../data/all_month.csv", "csv", "header");
}






function setup() {
    // first, call our map initialization function (look in the html's style tag to set its dimensions)
    setupMap()

    // call our function (defined below) that populates the maps with markers based on the table contents
    addCircles();





    // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
    let mycanvas = createCanvas(400, 600)
    mycanvas.position(800,0)
    background(240)

    fill(0)
    noStroke()
    textSize(16)
    text(`Plotting ${table.getRowCount()} seismic events`, 20, 40)
    text(`Largest Magnitude: ${columnMax(table, "mag")}`, 20, 60)
    text(`Greatest Depth: ${columnMax(table, "depth")}`, 20, 80)
    
    
    


  //------------Plot  #right
  var barfrac = 1;
  var pi =3.14;
  xx = 50
  yy = 100;
  ww = 300;
  hh = 500;
  majorint = 2;
  bb = barfrac * 0.5;
  szescale = 0.075;
  yscale = 1;


//   drawgrid(table, xf, yd, ww, hh-ypadding2, otherExposures.getRowCount(), majorint);
  textStyle(NORMAL);
  textAlign(CENTER);
  textSize(16);
  stroke(0);
  fill(0);
  text('Earthquake depth', 200, 20)
  textStyle(NORMAL);
  textAlign(RIGHT);
  // xaxislabel(table, "column", xx, yy, ww, hh    , 12, 0, 1, '#e00',5)
  yaxislabel('Depth', xx-25, yy, ww, hh, 12)
  // (tabinput, varName1, x, y, plotwidth, plotheight, ticsize, yoffset,unitscale, strkWght, strkClr, txtsze)
  yaxistics(table, "depth", xx, yy, ww, hh -20, 20, 0,1,0.5 ,"#000",8)
  
  print("Data: " + table)
  //        (tabinput, colName, x, y, plotwidth, plotheight, barfrac, offset, fillclr) 
  barplotColumn(table, "depth", xx, yy, ww, hh -20, bb, 0.5, '#e00')
    
    
    
    
    
    
    
    
    
}






function setupMap(){
    /*
    LEAFLET CODE

    In this case "L" is leaflet. So whenever you want to interact with the leaflet library
    you have to refer to L first.
    so for example L.map('mapid') or L.circle([lat, long])
    */

    // create your own map
    mymap = L.map('quake-map').setView([51.505, -0.09], 3);

    // load a set of map tiles – choose from the different providers demoed here:
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox.streets',
    //     accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
    // }).addTo(mymap);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
	maxZoom: 13,
	id: 'oceanbasemap'
    }).addTo(mymap);
    
}





function addCircles(){
    // calculate minimum and maximum values for magnitude and depth
    var magnitudeMin = 0.0;
    var magnitudeMax = columnMax(table, "mag");
    console.log('magnitude range:', [magnitudeMin, magnitudeMax])

    var depthMin = 0.0;
    var depthMax = columnMax(table, "depth");
    console.log('depth range:', [depthMin, depthMax])

    // step through the rows of the table and add a dot for each event
    for (var i=0; i<table.getRowCount(); i++){
        var row = table.getRow(i)

        // skip over any rows where the magnitude data is missing
        if (row.get('mag')==''){
            continue
        }

        // create a new dot
        var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
            color: 'red',      // the dot stroke color
            fillColor: '#f03', // the dot fill color
            fillOpacity: 0.25,  // use some transparency so we can see overlaps
            radius: row.getNum('mag') * 40000
        })

        // place the new dot on the map
        circle.addTo(mymap);
        circle.bindPopup("Test");
    }
}





// removes any circles that have been added to the map
function removeAllCircles(){
    mymap.eachLayer(function(layer){
        if (layer instanceof L.Circle){
            mymap.removeLayer(layer)
        }
    })
}





// get the maximum value within a column
function columnMax(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.max(colValues);
}





// get the minimum value within a column
function columnMin(tableObject, columnName){
    // get the array of strings in the specified column
    var colStrings = tableObject.getColumn(columnName);

    // convert to a list of numbers by running each element through the `float` function
    var colValues = _.map(colStrings, float);

    // find the largest value in the column
    return _.min(colValues);
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
    var place = tabinput.getString(i, 0) // grab the data
    var value = tabinput.getNum(i, col)
    var lgndval = tabinput.getString(i, 2)


    // // draw the year labels on the base---------------------------
    // fill(30)
    // push();
    // strokeWeight(0.5);
    // textStyle(NORMAL)
    // textAlign(RIGHT)
    // textSize(10)
    // translate(x +5, y +3 );
    // rotate(-pi / 4);
    // text(place, 5, 12);
    // pop()



    // draw the values labels on the top---------------------------
    // fill(30)
    // push();
    // strokeWeight(0.5);
    // textStyle(NORMAL)
    // textAlign(CENTER)
    // textSize(10)
    // translate(x + barwidth, y + 5);
    // // rotate(-pi / 2);
    // text(value, 0, -(map(value, 0, maxy1, 0, plotheight)) -10  );
    // pop()


    // hardcode the qualitative pallet, since colorforvalue doesnt work..
    var Dark2 = {
                3: ["#1b9e77", "#d95f02", "#7570b3"],
                4: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
                5: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e"],
                6: ["#810f7c", "#810f7c", "#810f7c", "#e7298a", "#66a61e", "#e6ab02"],
                7: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
                8: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"] 
      
    };

    // fill(Dark2[6][i]);
    fill(150)
    rect(x + offset * barwidth, yzero, barwidth, (map(value, 0, maxy1, 0, plotheight)));
    
// if (i==2 ){
//     //draw the legend as well while were at it..
//     strokeWeight(0.5);
//     textStyle(NORMAL)
//     textAlign(RIGHT)
//     textSize(10)
//     rect(xlegend - barwidth*2, y + 50, 20, barwidth)
//     text(lgndval,xlegend - barwidth*3, y + 90)
//     rect(x,yzero,barwidth,thisyearund);
// }


    x += colwidth // shift rightward to next col
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

  // if (colName == "YEAR") {
  //   push();
  //   stroke(0);
  //   strokeWeight(0.5);
  //   textStyle(NORMAL)
  //   textAlign(CENTER)
  //   textSize(txtsze);
  //   translate(x2, y - ypadding1);
  //   // rotate(-pi / 2);
  //   text("1966", 0, 12);
  //   pop()
  // }
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






function yaxistics(tabinput, varName1,  x, y, plotwidth, plotheight, ticsize, yoffset,unitscale, strkWght, strkClr, txtsze) {

  stroke(strkClr);  strokeWeight(strkWght);  textSize(txtsze)
  
  // find the column number (counting from 0)
  let col1 = tabinput.columns.indexOf(varName1);
  textAlign(RIGHT)
  
  // ---------------------------
  let miny1 = 3000000;
  let maxy1 = -300000;


  for (var i = 0; i < (tabinput.getRowCount()); i++) {
    if (tabinput.getNum(i, col1) <= miny1) {
      miny1 = tabinput.getNum(i, col1);
      print("The min is: " + miny1)
    }
    if (tabinput.getNum(i, col1) >= maxy1) {
      maxy1 = tabinput.getNum(i, col1);
      print("The max is: " + maxy1)
    }
  }


  let yzero = y - map(0, miny1, maxy1, 0, plotheight)

    let j = miny1+yoffset;
    let k = j;
    // Add tics for axis here....
    while (j <= maxy1) {
      ytic = map(j, miny1, maxy1, 0, plotheight)
      line(x - 2, y + ytic  , x + 2, y + ytic );
      text(round(k)*unitscale,x-4,y+ytic )
      j +=ticsize;
      k += ticsize;
    }

}


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------





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