

// This script creates an interactive Leaflet map that plots earthquake geo locations
// as well as a P5.js graph that shows earthquake depth.



// the data loaded from a USGS-provided CSV file
var table;

// my leaflet.js map
var mymap;
var pi = 3.14;
var track;
// var foldername = "../data/";
// var foldername = "../data/2017/";
// var foldername = "../data/2018/";
var foldername = "../data/2019/";
// var foldername = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/";
// var filebegin = "all_";
// var filebegin = "significant_";
var filebegin = "4.5_";
// var filebegin = "2.5_";
// var filebegin = "1.0_";
// var fileend = "month.csv";
var fileend = "week.csv";
// var fileend = "day.csv";
// var fileend = "hour.csv";
var filename = foldername + filebegin + fileend;

var xorigin = 0;
var yorigin = 150;
var faultlinedata=[];

// controls
var mapViewCoords = {
  _southWest: { lat: -90, lng: 180 },
  _northEast: { lat: 90, lng: 180 }
}
//   _southWest : {lat: 90, lng 90},
//   _northEast :  {lat: 90, lng 90}
// };
let slider;
var slidermax = 1000;
var keepmarker;
var keepline;
var faultlineStyle = {
  "color": "#444",
  "weight": 1.2
};

var canvaswidth = 540;
var graphborder = 100;
var graphwidth = canvaswidth - graphborder;

// ---------------------------------------------------------
// ---------------------------------------------------------
function preload() {
  // load the CSV data into our `table` variable and clip out the header row
  table = loadTable(filename, "csv", "header");
  geojsonFeature = loadJSON("../GIS/PB2002_boundaries.json");
  // geojsonFeature2 = loadJSON("../GIS/gem_active_faults_harmonized.json");
}
// ---------------------------------------------------------
// ---------------------------------------------------------






// ---------------------------------------------------------
// ---------------------------------------------------------
function setup() {


  // sort the rows of the table from largest to smallest magnitude
  table = sortTable(table, 'depth') 
  
  
  // first, call our map initialization function (look in the html's style tag to set its dimensions)
  setupMap()
  print("tectonicplates " + geojsonFeature)
  // print("faultlines " + geojsonFeature)



  // generate a p5 diagram that complements the map, communicating the earthquake data non-spatially
  let mycanvas = createCanvas(canvaswidth, 600)
  // mycanvas.parent('sketch-holder');
  // console.log(mycanvas.position())
  // xpos = mycanvas.position().x;
  // ypos = mycanvas.position().y;
  mycanvas.position(xorigin+740, yorigin+0)
  // mycanvas.position(0, 0)
  frameRate(10);


  // create a slider to select an earthquake
  slider = createSlider(0, slidermax, slidermax * 0.5);
  // slider.position(xpos + 780, ypos + 175);
  slider.position( xorigin+780, yorigin+ 125);
  slider.style('width', graphwidth + 'px');


  // call our function (defined below) that populates the maps with markers based on the table contents
  addFaultlines();
  addCircles();
  // addFaultlines2();



  var icon = L.divIcon({
    iconSize: [20, 20],
    // iconAnchor: [0,0],
    // popupAnchor: [10, 0],
    shadowSize: [0, 0],
    className: 'my-icon-class',
    zIndexOffset: -1000
  })


  //marker latlng
  // use a random value here. It will be updated instantly once the draw loop starts
  var ll = L.latLng(40.795, -73.953)


  // create marker
  var marker = L.marker(ll, {
    icon: icon,
    // id: "animatedIconID",
    title: 'Corresponding Earthquake'
  }).bindPopup("Highlighted");
  keepmarker = marker;
  marker.addTo(mymap)

  var myIcon = document.getElementsByClassName('my-icon-class')
  var keepAnimCoord = myIcon[0].style.transform;
  // console.log("Myicon properties "+ myIcon[0].style.transform)
  // myIcon[0].classList.add("animated-icon");     // creage animated icon - still buggy

  mymap.on('moveend', function() {
    mapViewCoords = mymap.getBounds();
    console.log(mapViewCoords);
  });
  // _northEast: j {lat: 26.902479278214706, lng: 154.79296982288363}
  // _southWest: j {lat: -24.046461550232213, lng: 89.75390732288362}
  
  
  // before querying the Tectonic plate/fault data, you need to let it know which map you're using
    Tectonic.useMap(mymap)
  
  
  // get the distances to the closest fault lines for plotting
      for (var r=0; r<table.rows.length; r++){
        var row = table.getRow(r)
        var lat = row.getNum('latitude')
        var lng = row.getNum('longitude')

        // find the intersection point with the nearest fault
        faultlinedata[r] = Tectonic.findFault(lat, lng)
    }
        // print(faultlinedata);
  
  
        // draw a line connecting two random points
        // this line will be updated instantaneously once the draw loop starts
        var linetokeep = L.polyline([[40.795, -73.953], [40.798, -73.958]], {
            color:'red',
            weight:1
        }).bindTooltip("Highlighted").addTo(mymap);
        // }).bindTooltip(`${closest.distance.toFixed(1)} km from ${closest.name} fault`).addTo(globe)
        keepline = linetokeep;

}
// ---------------------------------------------------------
// ---------------------------------------------------------







// ---------------------------------------------------------
// ---------------------------------------------------------
function draw() {


  // var val;
  val = slider.value();
  print(val);
  // background(val*0.255);
  background(250)
  fill(0)
  textAlign(LEFT);
  noStroke()
  textSize(16)
  text(`Showing ${table.getRowCount()} seismic events`, 40, 60)
  text(`Max. Magnitude: ${columnMax(table, "mag")}`, 40, 80)
  text(`Max. Depth: ${columnMax(table, "depth")}`, 40, 100)






  // Draw the barchart showing depth values:
  //------------Plot  #right
  var barfrac = 1;
  var pi = 3.14;
  xx = 50
  yy = 175;
  ww = graphwidth;
  hh = 200;
  majorint = 2;
  bb = barfrac * 0.5;
  szescale = 0.075;
  yscale = 1;



  // ----------------------------------------------------------------------
  // Draw the bar chart for depth
  // ----------------------------------------------------------------------
  //   drawgrid(table, xf, yd, ww, hh-ypadding2, otherExposures.getRowCount(), majorint);
  textStyle(NORMAL);
  textAlign(CENTER);
  textSize(16);
  stroke(0);
  fill(0);
  text('Earthquake depth (km)', canvaswidth / 2, 20)
  textStyle(NORMAL);
  textAlign(RIGHT);
  // xaxislabel(table, "column", xx, yy, ww, hh    , 12, 0, 1, '#e00',5)
  // yaxislabel('Depth', xx - 25, yy, ww, hh, 12)
  // (tabinput, varName1, x, y, plotwidth, plotheight, ticsize, yoffset,unitscale, strkWght, strkClr, txtsze)
  yaxistics(table, "depth", xx, yy, ww, hh - 20, 20, 0, 1, 0.5, "#000", 8)

  // print("Data: " + table)
  //        (tabinput, colName, x, y, plotwidth, plotheight, barfrac, offset, fillclr) 
  sliderSelectBar = val;
  barplotColumn(table, "depth", xx, yy, ww, hh - 20, bb, 0.5, '#ddd', sliderSelectBar, keepmarker)
  yaxislabel("Depth (km)", xx / 2, yy + hh, ww, hh, 12)
  
  
  
  
  
  // ----------------------------------------------------------------------
  // Draw another barchart showing fault line distance values:
  // ----------------------------------------------------------------------
  var barfrac = 1;
  var pi = 3.14;
  xx = 50
  yy = 375;
  ww = graphwidth;
  hh = 200;
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
  text('Earthquake depth (km)', canvaswidth / 2, 20)
  textStyle(NORMAL);
  textAlign(RIGHT);
  // xaxislabel(table, "column", xx, yy, ww, hh    , 12, 0, 1, '#e00',5)
  // yaxislabel('Depth', xx - 25, yy, ww, hh, 12)
  // (tabinput, varName1, x, y, plotwidth, plotheight, ticsize, yoffset,unitscale, strkWght, strkClr, txtsze)
  yaxistics(table, "mag", xx, yy, ww, hh - 20, 20, 0, 1, 0.5, "#000", 8)

  // print("Data: " + table)
  //        (tabinput, colName, x, y, plotwidth, plotheight, barfrac, offset, fillclr) 
  sliderSelectBar = val;
  // barplotColumn(table, "mag", xx, yy, ww, hh - 20, bb, 0.5, '#ddd', sliderSelectBar, keepmarker)
  barplotFaults(table, "mag", xx, yy, ww, hh - 20, bb, 0.5, '#ddd', sliderSelectBar, keepline)
  yaxislabel("Magnitude (km)", xx / 2, yy + hh, ww, hh, 12)
  

}
  // ----------------------------------------------------------------------
  // ----------------------------------------------------------------------




// ---------------------------------------------------------
// ---------------------------------------------------------
function setupMap() {
  /*LEAFLET CODE*/
  // create your own map
  mymap = L.map('quake-map', {
    maxZoom: 10,
    minZoom: 1.499,
    worldCopyJump: false,
    maxBounds: [
      //south west
      [-89.9, -220],
      //north east
      [89.9, 220]
    ],
  }).setView([25, 0], 1.49);


  var baselayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
    maxZoom: 13,
    id: 'oceanbasemap'
  }).addTo(mymap);

}


// ---------------------------------------------------------
// ---------------------------------------------------------






// ---------------------------------------------------------
// ---------------------------------------------------------
function addFaultlines() {
  // var myLayer = L.geoJSON().addTo(mymap);
  // myLayer.addData(geojsonFeature,{
  //     style: faultlineStyle
  //   });
  var tectonicPlatelayer = L.geoJSON(geojsonFeature, {
    style: faultlineStyle,
    worldCopyJump: true
  }).addTo(mymap);
}
// ---------------------------------------------------------
// ---------------------------------------------------------









// ---------------------------------------------------------
// ---------------------------------------------------------

function addCircles() {
  
  
  // calculate minimum and maximum values for magnitude and depth
  var magnitudeMin = 0.0;
  var magnitudeMax = columnMax(table, "mag");
  console.log('magnitude range:', [magnitudeMin, magnitudeMax])

  var depthMin = 0.0;
  var depthMax = columnMax(table, "depth");
  console.log('depth range:', [depthMin, depthMax])



  // step through the rows of the table and add a dot for each event
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i)



    // skip over any rows where the magnitude data is missing
    if (row.get('mag') == '') {
      continue
    }



    // create a new dot
    var magnitude = row.getNum('mag');
    var popupdepth = row.getNum('depth')
    var popupdepthError = row.getNum('depthError')
    var circle = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
      color: 'red', // the dot stroke color
      fillColor: '#f03', // the dot fill color
      fillOpacity: 0.05, // use some transparency so we can see overlaps
      radius: row.getNum('mag') * 40000,
      weight: 0.4
    }).bindPopup("Magnitude: " + magnitude + "<br>Depth: " + popupdepth + " km<br>Depth Error: " + popupdepthError + " km");


    var points = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 1,
      radius: magnitude * 40,
      weight: 2
    });
    var circle2 = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.1,
      radius: magnitude * 30000,
      weight: 0.4
    });
    var circle3 = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.15,
      radius: magnitude * 20000,
      weight: 0.6
    });
    var circle4 = L.circle([row.getNum('latitude'), row.getNum('longitude')], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.2,
      radius: magnitude * 10000,
      weight: 0.8
    });

    var allxtraCircles = L.layerGroup([circle2, circle3, circle4]);
    allxtraCircles.addTo(mymap);
    circle.addTo(mymap);

    //   var baseMaps = {
    //     "BaseLayer": baselayer
    // };

    // var overlayMaps = {
    //     "ExtraCircles": allxtraCircles
    // };
    // L.control.layers(baseMaps,overlayMaps).addTo(mymap);



    // // place the new dot on the map
    // if (filebegin == "all_") {
    //   circle.addTo(mymap);
    // }
    // else if (filebegin == "2.5_" || "1.0_") {
    //   points.addTo(mymap);
    //   circle.addTo(mymap);
    // }
    // else if (filebegin == "4.5_") {
    //   // circle.addTo(mymap);
    //   circle2.addTo(mymap);
    //   circle3.addTo(mymap);
    //   circle4.addTo(mymap);
    // }
    // else {
    //   circle.addTo(mymap);
    // }
  }


}
// ---------------------------------------------------------
// ---------------------------------------------------------







// ---------------------------------------------------------
// ---------------------------------------------------------
// removes any circles that have been added to the map
function removeAllCircles() {
  mymap.eachLayer(function(layer) {
    if (layer instanceof L.Circle) {
      mymap.removeLayer(layer)
    }
  })
}
// ---------------------------------------------------------
// ---------------------------------------------------------





// ---------------------------------------------------------
// ---------------------------------------------------------
// get the maximum value within a column
function columnMax(tableObject, columnName) {

  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName);

  // convert to a list of numbers by running each element through the `float` function
  var colValues = _.map(colStrings, float);

  // find the largest value in the column
  return _.max(colValues);
}
// ---------------------------------------------------------
// ---------------------------------------------------------




// ---------------------------------------------------------
// ---------------------------------------------------------
// get the minimum value within a column
function columnMin(tableObject, columnName) {

  // get the array of strings in the specified column
  var colStrings = tableObject.getColumn(columnName);

  // convert to a list of numbers by running each element through the `float` function
  var colValues = _.map(colStrings, float);

  // find the largest value in the column
  return _.min(colValues);
}
// ---------------------------------------------------------
// ---------------------------------------------------------






// ---------------------------------------------------------
// ---------------------------------------------------------
// This function was supplied by Prof. Swineheart
function sortTable(origTable, columnName) {

  // Returns a copy of a Table object whose rows are ordered according to values in the specified column
  // By default the rows in the table will be sorted in ascending order. If you pass a 
  // column name with a '-' at the start of it, the rows will be sorted in descending order.
  // 
  const key = _.trim(columnName, '-'),
    table = _.extend(new p5.Table(), { columns: origTable.columns }),
    columnVal = ({ obj }) => _.isNaN(_.toNumber(obj[key])) ? obj[key] : _.toNumber(obj[key]),
    cloneRow = ({ obj, arr }) => _.extend(new p5.TableRow(), { obj, arr, table }),
    sorted = _.sortBy(origTable.rows, columnVal).map(cloneRow),
    rows = _.startsWith(columnName, '-') ? _.reverse(sorted) : sorted;

  return _.extend(table, { rows })
}
// ---------------------------------------------------------
// ---------------------------------------------------------







// ---------------------------------------------------------
// ---------------------------------------------------------
function addCircleHighlight(circLat, circLong, magnitude) {
  var circleHighlight = L.circleMarker([circLat, circLong], {
    color: 'red', // the dot stroke color
    fillColor: '#f03', // the dot fill color
    fillOpacity: 0.05, // use some transparency so we can see overlaps
    radius: magnitude * 40000,
    weight: 0.4
  });

  var highlightlayer = L.layerGroup([circleHighlight]);
  highlightlayer.addTo(mymap);
  // mymap.removeLayer(highlightlayer)
}
// ---------------------------------------------------------
// ---------------------------------------------------------






// ------------------------------------------------
// Barplot      Barplot     Barplot    #barplot
// ------------------------------------------------

function barplotColumn(tabinput, colName, x, y, plotwidth, plotheight, barfrac, offset, fillclr, sliderSelectBar, marker) {



  // Table column data matching
  col = tabinput.columns.indexOf(colName);
  col2 = tabinput.columns.indexOf("latitude");
  col3 = tabinput.columns.indexOf("longitude");
  col4 = tabinput.columns.indexOf("mag");
  col5 = tabinput.columns.indexOf("depthError");



  // Map zoom parameters for graph filetering
  // console.log(mapViewCoords)
  var mapLatSW = mapViewCoords._southWest.lat;
  var mapLongSW = mapViewCoords._southWest.lng;
  var mapLatNE = mapViewCoords._northEast.lat;
  var mapLongNE = mapViewCoords._northEast.lng;


  // Other initializiations
  var yzero = y;
  var colwidth = plotwidth / tabinput.getRowCount();
  var barwidth = colwidth * barfrac;
  var totalN = tabinput.getRowCount();



  // draw the zero axis labels on the base-----------------------------------
  stroke(150);
  strokeWeight(0.5);
  line(x, yzero, x + plotwidth, yzero)



  // get the minimum and maximum values for scales --------------------------
  let miny1 = 3000000;
  let maxy1 = -300000;

  for (var i = 0; i < (totalN); i++) {
    if (tabinput.getNum(i, col) <= miny1) {
      miny1 = tabinput.getNum(i, col);
    }
    if (tabinput.getNum(i, col) >= maxy1) {
      maxy1 = tabinput.getNum(i, col);
    }
  }



  // loop through all the data points----------------------------------------
  for (let i = 0; i < totalN; i++) {

    var place = tabinput.getString(i, 0) // grab the data
    var value = tabinput.getNum(i, col)
    var lgndval = tabinput.getString(i, 2)
    var thisBari = round(map(sliderSelectBar, 0, slidermax, 0, totalN - 1));


    // hardcode the qualitative pallet, since colorforvalue doesnt work..
    var Dark2 = {
      3: ["#1b9e77", "#d95f02", "#7570b3"],
      4: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
      5: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e"],
      6: ["#810f7c", "#810f7c", "#810f7c", "#e7298a", "#66a61e", "#e6ab02"],
      7: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d"],
      8: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"]
    };


    // get the lat and long from the table
    var latval = tabinput.getNum(i, col2)
    var longval = tabinput.getNum(i, col3)



    // determine if selection is highlighted then change bar color
    if (mapLatSW <= latval && mapLongSW <= longval && mapLatNE >= latval && mapLongNE >= longval) {
      fillclr = 130;
      // fill(Dark2[6][i]);
      console.log("Highlighted selection")
    }
    else {
      fillclr = 200;
    }



    // Create color for selected bar using slider value-----------------------
    if ((thisBari ) == i) {

      // get the rest of the values from the table
      var magval = tabinput.getNum(i, col4)
      var popupdepthError = tabinput.getNum(i, col5)
      var latlng = L.latLng(latval, longval);

      // change map icon marker position and content
      marker.setLatLng(latlng);
      // marker.bindPopup("Magnitude: " + magval + "<br>Depth: " + value + " km<br>Depth Error: " + popupdepthError + " km").openPopup();
      marker.setPopupContent("Magnitude: " + magval + "<br>Depth: " + value + " km<br>Depth Error: " + popupdepthError + " km<br><br>Tectonic plate line:<br> "+faultlinedata[i].name);

      // add text legend to the graph
      stroke(0);
      fill(0);
      textSize(10)
      strokeWeight(0.3)
      textAlign(RIGHT)
      text(value + "km", x + offset * barwidth, y -10);

      // Change colors for the highlighted bar
      fill('red');
      stroke('red');

    }

    // draw the bar on the barchart--------------------------------------------------
    rect(x + offset * barwidth, yzero, barwidth, (map(value, 0, maxy1, 0, plotheight)));

    // reset the colors for the rest of the bars
    fill(fillclr);
    stroke(fillclr);


    x += colwidth // shift rightward to next col
  }

}
// ---------------------------------------------------------
// ---------------------------------------------------------










// ------------------------------------------------
// Barplot      Barplot     Barplot    #barplot
// ------------------------------------------------
// this function is very similar to the preceding barplot function, however it
// uses a global variable of faultline distance to plot the chart instead of
// loading data from a CSV file.

function barplotFaults(tabinput, colName, x, y, plotwidth, plotheight, barfrac, offset, fillclr, sliderSelectBar, linetokeep) {


  // Table column data matching
  col = tabinput.columns.indexOf(colName);
  col2 = tabinput.columns.indexOf("latitude");
  col3 = tabinput.columns.indexOf("longitude");
  col4 = tabinput.columns.indexOf("mag");
  col5 = tabinput.columns.indexOf("depthError");


  // Map zoom parameters for graph filetering
  // console.log(mapViewCoords)
  var mapLatSW = mapViewCoords._southWest.lat;
  var mapLongSW = mapViewCoords._southWest.lng;
  var mapLatNE = mapViewCoords._northEast.lat;
  var mapLongNE = mapViewCoords._northEast.lng;


  // Other initializiations
  var yzero = y;
  var colwidth = plotwidth / faultlinedata.length;
  var barwidth = colwidth * barfrac;
  // var totalN = tabinput.getRowCount();
  var totalN = faultlinedata.length;



  // draw the zero axis labels on the base-----------------------------------
  stroke(150);
  strokeWeight(0.5);
  line(x, yzero, x + plotwidth, yzero)



  // get the minimum and maximum values for scales --------------------------
  let miny1 = 3000000;
  let maxy1 = -300000;

  for (var i = 0; i < (totalN); i++) {
    if (faultlinedata[i].distance <= miny1) {
      miny1 = faultlinedata[i].distance;
    }
    if (faultlinedata[i].distance >= maxy1) {
      maxy1 = faultlinedata[i].distance;
    }
  }



  // loop through all the data points----------------------------------------
  for (let i = 0; i < totalN; i++) {

    // var place = tabinput.getString(i, 0) // grab the data
    var value = faultlinedata[i].distance;
    // var lgndval = tabinput.getString(i, 2)
    var thisBari = round(map(sliderSelectBar, 0, slidermax, 0, totalN - 1));



    // get the lat and long from the table
    var latval = tabinput.getNum(i, col2)
    var longval = tabinput.getNum(i, col3)
    var latval2 = faultlinedata[i].latitude;
    var longval2 = faultlinedata[i].longitude;



    // determine if selection is highlighted then change bar color
    if (mapLatSW <= latval && mapLongSW <= longval && mapLatNE >= latval && mapLongNE >= longval) {
      fillclr = 130;
      console.log("Highlighted selection")
    }
    else {
      fillclr = 200;
    }



    // Create color for selected bar using slider value-----------------------
    if ((thisBari ) == i) {

      // get the rest of the values from the table

      // change map icon line position and content
      linetokeep.setLatLngs([{lat:latval,lng:longval},{lat:latval2,lng:longval2}]);

      // add text legend to the graph
      stroke(0);
      fill(0);
      textSize(10)
      strokeWeight(0.3)
      textAlign(RIGHT)
      text(value + "km", x + offset * barwidth, y -10);

      // Change colors for the highlighted bar
      fill('red');
      stroke('red');

    }

    // draw the bar on the barchart--------------------------------------------------
    rect(x + offset * barwidth, yzero, barwidth, (map(value, 0, maxy1, 0, plotheight)));

    // reset the colors for the rest of the bars
    fill(fillclr);
    stroke(fillclr);


    x += colwidth // shift rightward to next col
  }

}
// ---------------------------------------------------------
// ---------------------------------------------------------






















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
// ---------------------------------------------------------
// ---------------------------------------------------------



// ---------------------------------------------------------
// ---------------------------------------------------------
function yaxislabel(input, x, y, plotwidth, plotheight, txtsze) {
  push();
  stroke(0);
  strokeWeight(0.5);
  fill(0);
  textStyle(NORMAL)
  textAlign(CENTER)
  textSize(txtsze);
  translate(x, y - plotheight / 2);
  rotate(-pi / 2);
  text(input, 0, -5);
  pop()
}
// ---------------------------------------------------------
// ---------------------------------------------------------




// ---------------------------------------------------------
// ---------------------------------------------------------
function yaxistics(tabinput, varName1, x, y, plotwidth, plotheight, ticsize, yoffset, unitscale, strkWght, strkClr, txtsze) {

  stroke(strkClr);
  strokeWeight(strkWght);
  textSize(txtsze)

  // find the column number (counting from 0)
  let col1 = tabinput.columns.indexOf(varName1);
  textAlign(RIGHT)

  // ---------------------------
  let miny1 = 3000000;
  let maxy1 = -300000;


  for (var i = 0; i < (tabinput.getRowCount()); i++) {
    if (tabinput.getNum(i, col1) <= miny1) {
      miny1 = tabinput.getNum(i, col1);
      // print("The min is: " + miny1)
    }
    if (tabinput.getNum(i, col1) >= maxy1) {
      maxy1 = tabinput.getNum(i, col1);
      // print("The max is: " + maxy1)
    }
  }


  let yzero = y - map(0, miny1, maxy1, 0, plotheight)

  let j = miny1 + yoffset;
  let k = j;
  // Add tics for axis here....
  while (j <= maxy1) {
    ytic = map(j, miny1, maxy1, 0, plotheight)
    line(x - 2, y + ytic, x + 2, y + ytic);
    text(round(k) * unitscale, x - 4, y + ytic)
    j += ticsize;
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
// ---------------------------------------------------------
// ---------------------------------------------------------