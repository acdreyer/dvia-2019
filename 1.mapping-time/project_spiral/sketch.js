

var canvaslx = 500;
var canvasly = 300;
var originx = canvaslx*0.75;
var originy = 20;
var originxmin = canvaslx*0.25;
var originymin = 20;
var persp1 = 4.1/4; //perspective ratio
var taper1 = 1; //taper ratio
var persp2 = 4.1/4; //perspective ratio
var taper2 = 1; //taper ratio

var newx = 0;
var newy = 0;
var xsec = canvaslx;
var ysec = 0;
var xmin = canvaslx;
var ymin = 0;
var countsec = 0;
var count_min = 0;


function setup() {
  // set the width & height of the sketch
  createCanvas(canvaslx, canvasly)
  background(255);
  frameRate(60);
  
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock())
  // print("Time:")

}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  
  var now = clock();

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  // background('white')

  // set up typography & drawing-color
  // textFont("Anonymous Pro"); // ← check index.html to see how it was loaded from google-fonts
  // textSize(42); // make it big
  // fill(100, 50, 50)

  var tmsec = now.ms;
  var tsec = now.sec;
  if (now.progress.sec!==1 ){//
  var tsec_tot = now.sec+now.progress.sec};
    if (now.progress.min!==1){
  var tmin_tot = now.min+now.progress.min};
  var tmin = now.min;
  var thour = now.hour;
  
  // calculate the spiral for seconds/minutes
  xsec = cos(tsec_tot*2*PI*10/60) * canvaslx*9/50*(1-tsec_tot*taper1/60) + originx;
  ysec = -(sin(tsec_tot*2*PI*10/60) * 30*(1-tsec_tot*persp1/60) + tsec_tot*4.1 ) + 250 +originy ;
  // Draw the connecting line for seconds/minutes
  strokeWeight(1);
  stroke(200-now.progress.min*200,30);
  line(originx,originy,xsec,ysec);
    newxsec = xsec;
  newysec = ysec;
 countsec ++;
  

  stroke(255);
  fill(255);
  if (now.progress.min < 0.01){rect(canvaslx/2,0,canvaslx/2,canvasly)}

  
  
    // calculate the spiral for minutes/hours
  xmin = cos(tmin_tot*2*PI*10/60) * canvaslx*9/50*(1-tmin_tot*taper1/60) + originxmin;
  ymin = -(sin(tmin_tot*2*PI*10/60) * 30*(1-tmin_tot*persp2/60) + tmin_tot*4.1 ) + 250 +originymin ;
  stroke(200-now.progress.hour*200,30);
  strokeWeight(1); //set the thickness
  line(originxmin,originymin,xmin,ymin);
    stroke(255);
  if (now.progress.hour < 0.01){rect(0,0,canvaslx/2,canvasly)}
  
  


}


