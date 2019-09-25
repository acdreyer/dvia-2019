// generate coordinates of random pattern
var xsp = [];
var ysp = [];

var xsu = [];
var ysu = [];

var xfa = [];
var yfa = [];

var xwi = [];
var ywi = [];

var xwi2 = [];
var ywi2 = [];

var twigT = [];

var rsp = [];
var rsu = [];
var rfa = [];
var rwi = [];
var pi = 3.14;

var canvasx = 300;
var canvasy = 300;

var maxtexture = 200;
var maxtwigL = 50;
var maxtwigt =5;
var maxleaf = 20;


function setup() {
  // set the width & height of the sketch
  createCanvas(canvasx, canvasy)
  frameRate(5);

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock())

  for (let i = 0; i < maxtexture; i++) {
    xsp[i] = random(canvasx);
    ysp[i] = random(canvasy);
    rsp[i] = random(maxleaf);
    
    xsu[i] = random(canvasx);
    ysu[i] = random(canvasy);
    rsu[i] = random(maxleaf);
    
    xfa[i] = random(canvasx);
    yfa[i] = random(canvasy);
    rfa[i] = random(maxleaf);
    
    xwi[i] = random(canvasx);
    ywi[i] = random(canvasy);
    rwi[i] = random(maxleaf);
    
    xwi2[i] = xwi[i]+random(maxtwigL)-random(2*maxtwigL);
    ywi2[i] = ywi[i]+random(maxtwigL)-random(2*maxtwigL);

    twigT[i] = random(maxtwigt);

  }

}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  background('white')

  // set up typography & drawing-color
  textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
  textSize(42) // make it big
  fill(100, 50, 50)

  // draw the time string to the canvas
  // text(now.text.date, 30, 50)
  // text(now.text.time, 30, 100)




  for (let i = 0; i < maxtexture; i++) {
    

    
    
    stroke(165,42,42);
    // text(thisintensity((now.season-1)+now.progress.season), 30, 150)
    strokeWeight(twigT[i]);
    line(xwi[i],ywi[i],xwi2[i],ywi2[i]);
    
    noStroke();
    if (now.season == 1){
    stroke(254,127,156,(thisintensity((now.season-1.3)+now.progress.season))*255);}
    strokeWeight(rsp[i]);
    point(xsp[i],ysp[i]);
    
    
    stroke(57,137,48,(thisintensity((now.season-2)+now.progress.season))*255);
    strokeWeight(rsu[i]);
    point(xsu[i],ysu[i]);

    stroke(207,83,0,(thisintensity((now.season-3)+now.progress.season))*255);
    strokeWeight(rfa[i]);
    point(xfa[i],yfa[i]);


    
  }




  strokeWeight(1);
      text(now.text.month, 30, 50)
    text(now.season + now.progress.season, 30, 100)

}


function thisintensity(thisprogress){ 
  if (cos(thisprogress*pi/2) >= 0 ){
    return cos(thisprogress*pi/2);}
  else {
    return 0;}
  };