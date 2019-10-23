var data
var pi = 3.14

var canvaslx = 1400;
var canvasly = 400;
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
  data = loadJSON('data/all-activity.json')
}




// -------------------------------------------------------------------------
function drawgrid(colwidth,xaxistics){
    stroke(gridstroke);
    strokeWeight(gridweight);
    let x = xzero;
    // let y = ybottom;
    // columns
      for (let i=0; i< xaxistics; i++){
        line(x,ybottom,x,ytop);
        x += canvaslx/data.years.length;
      };
          
    // rows
      for (let i=ybottom; i<ytop; i+=50){
        line(0,i,canvaslx,i);
      };
}




// -------------------------------------------------------------------------
function setup(){
  createCanvas(canvaslx, canvasly)
  background(200)
  // c1 = color(255, 204, 0);
  c1 = color(100, 100, 100);
  c2 = color(255);
  setGradientTop(c1, c2);
  setGradientBottom(c1,c2);
  
  
  
  // log the whole dataset to the console so we can poke around in it
  print(data)
  print(data.years.length)
  drawgrid(colwidth,data.years.length);




  // set up typography
  textFont("Rokkitt")
  textSize(16)
  fill(30)
  noStroke()



  var x = xzero;
  var y = 100
  var rowweight = 20
  var barfrac = 0.5;
  // var colWidth = 10
  var colwidth = canvaslx/data.years.length;
  var barwidth = colwidth*barfrac;



  // draw country name labels on the left edge of the table
  // textStyle(BOLD)
  // textAlign(RIGHT)
  // for (var c=0; c<data.countries.length; c++){
  //   var country = data.countries[c]
  //   text(country, x-colWidth, y)
  //   y += rowHeight
  // }



  for (var i=0; i<data.years.length; i++){
    var info = data.years[i] // grab the next year's data
    var thisyearatm = 0;
    var thisyearund = 0;
    
    y = 100

    // draw the year labels on the base---------------------------
    fill(30)
    push();
    strokeWeight(0.5);
    textStyle(NORMAL)
    textAlign(RIGHT)
    translate(x, canvasly-ybottom);
    rotate(-pi/2);
    text(info.year, 0,0);
    pop()
    
    // draw the zero axis labels on the base---------------------------
    stroke(150);
    strokeWeight(0.5);
    line(0,yzero,canvaslx,yzero)




    // calculate totals one column at a time---------------------------
    data.countries.forEach(function(country){
      thisyearatm += info.details[country].atmosphere;
      thisyearund += info.details[country].underground;
    })
    
    fill(0);
    rect(x,yzero,barwidth,-thisyearatm);
    // rect(x,yzero,barwidth,thisyearund);

    x += colwidth // shift rightward to next col
  }
  
  
  
  // --------------------draw linegraph
  strokeWeight(lineweight);
  stroke(linestroke);
  var x2 = xzero;
   for (var i=0; i < (data.years.length-1); i++){
       
    var thisinfo = data.years[i] // grab the data
    var nextinfo = data.years[i+1] // grab the next data
    var thisyearund = 0; 
    var nextyearund = 0; 
    var colwidth = canvaslx/data.years.length;
        // calculate totals one column at a time---------------------------
    data.countries.forEach(function(country){
      thisyearund += thisinfo.details[country].underground;
      nextyearund += nextinfo.details[country].underground;
          print(thisyearund + ' ' + nextyearund + ' ' + colwidth)
    })
    line(x2,yzero+thisyearund,x2+colwidth,yzero+nextyearund)
     x2 += colwidth;
   }
  
  
textStyle(NORMAL)
textAlign(CENTER)
stroke(230);
strokeWeight(0.5);
fill(230)
text('TOTAL AMOUNT OF NUCLEAR TESTS PER YEAR', canvaslx/2,20);

legend(900,50,barwidth)
ylabel()

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