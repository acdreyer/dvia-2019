

// Initialize variables
var canvaslx = 600;
var canvasly = 300;
var originxsec = canvaslx*5/6;
var originysec = 20;
var originxmin = canvaslx*0.5;
var originymin = 20;
var originxhr = canvaslx*1/6;
var originyhr = 20;
var persp1 = 4.1/4; //perspective ratio
var taper1 = 1; //taper ratio
var persp2 = 4.1/4; //perspective ratio
var taper2 = 1; //taper ratio
var coord = [];
var newx = 0;
var newy = 0;
var xsec = canvaslx;
var ysec = 0;
var xmin = canvaslx;
var ymin = 0;
var countsec = 0;
var count_min = 0;

// Initialize cooridnate arrays
var x1 = [];
var y1 = [];
var x2 = [];
var y2 = [];
var x3 = [];
var y3 = [];

var ires = 1000; //number of points on 1st spiral
var jres = 1000; //number of points on 2nd spiral
var kres = 1000; //number of points on 3rd spiral
iscale = 60;
jscale = 60;
kscale = 60;



function setup() {
  // set the width & height of the sketch
  createCanvas(canvaslx, canvasly)
  background(255);
  frameRate(60);
  
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock())
  // print("Time:")
  
  // To optimize performance, first construct arrays containing coordinate lists
  // Construct the spiral coordinates
  for( let i=0; i<ires ; i++ ){
  var param = iscale*i/ires;
  x1[i] = cos(param*2*PI*10/60)*90*(1-param*taper1/60) + originxsec;
  y1[i] = -( sin(param*2*PI*10/60)*30*(1-param*persp1/60) + param*4.1 ) + 250 + originysec ;
  }
  
    // Construct the 2nd spiral coordinates
  for( let j=0; j<ires ; j++ ){
  var param = jscale*j/jres;
  x2[j] = cos(param*2*PI*10/60)*90*(param*taper1/60) + originxmin;
  y2[j] = +( sin(param*2*PI*10/60)*30*(param*persp1/60) - param*3.5 ) + 250 + originymin +10 ;
  }
  
    // Construct the 3rd spiral coordinates
  for( let k=0; k<kres ; k++ ){
  var param = kscale*k/kres;
  x3[k] = cos(param*2*PI*10/60)*90*(1-param*taper1/60) + originxhr;
  y3[k] = -( sin(param*2*PI*10/60)*30*(1-param*persp1/60) + param*4.1 ) + 250 + originyhr ;
  }
  

}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  
  var now = clock();

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  background('white')

  var tmsec = now.ms;
  var tsec = now.sec;
  if (now.progress.sec!==1 ){//
  var tsec_tot = now.sec+now.progress.sec};
    if (now.progress.min!==1){
  var tmin_tot = now.min+now.progress.min};
  var tmin = now.min;
  var thour = now.hour;
  
  for( let i=0; i < now.progress.min*ires ; i++ ){
    stroke(0); strokeWeight(3);
  point(x1[i],y1[i]) 
  
  }
  
    for( let j=0; j < now.progress.hour*jres ; j++ ){
    stroke(0); strokeWeight(3);
  point(x2[j],y2[j]) 
  }
  
  for( let k=0; k < now.progress.halfday*kres ; k++ ){
    stroke(0); strokeWeight(3);
  point(x3[k],y3[k]) 
  }
  
  // calculate the spiral for seconds/minutes
//   xsec = cos(tsec_tot*2*PI*10/60) * canvaslx*9/50*(1-tsec_tot*taper1/60) + originxsec;
//   ysec = -(sin(tsec_tot*2*PI*10/60) * 30*(1-tsec_tot*persp1/60) + tsec_tot*4.1 ) + 250 +originysec ;
//   // Draw the connecting line for seconds/minutes
//   strokeWeight(1);
//   stroke(200-now.progress.min*200,30);
//   line(originxsec,originysec,xsec,ysec);
//     newxsec = xsec;
//   newysec = ysec;
// countsec ++;
  

  stroke(255);
  fill(255);
  if (now.progress.min < 0.02){rect(canvaslx*2/3,0,canvaslx/3,canvasly)}

  stroke(255);
  fill(255);
  if (now.progress.hour < 0.02){rect(canvaslx/3,0,canvaslx/3,canvasly)}
  
  stroke(255);
  fill(255);
  if (now.progress.halfday < 0.02){rect(0,0,canvaslx/3,canvasly)}
  
  
    // calculate the spiral for minutes/hours
  // xmin = cos(tmin_tot*2*PI*10/60) * canvaslx*9/50*(1-tmin_tot*taper1/60) + originxmin;
  // ymin = -(sin(tmin_tot*2*PI*10/60) * 30*(1-tmin_tot*persp2/60) + tmin_tot*4.1 ) + 250 +originymin ;
  // stroke(200-now.progress.hour*200,30);
  // strokeWeight(1); //set the thickness
  // line(originxmin,originymin,xmin,ymin);
  //   stroke(255);
  // if (now.progress.hour < 0.01){rect(0,0,canvaslx/2,canvasly)}
  
  
    // line(0, 100,200,300);
  
  
  
  


}


