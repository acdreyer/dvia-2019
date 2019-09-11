


function setup() {
  // set the width & height of the sketch
  createCanvas(500, 500)

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())

}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  // background('white')

  // set up typography & drawing-color
  textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
  textSize(42) // make it big
  fill(100, 50, 50)

  var tsec = now.sec;
  var tmin = now.min;
  var thour = now.hour;
  
  // draw the time string to the canvas
  // text(now.text.date, 30, 50)
  // text(now.text.time, 30, 100)
  stroke(200);

  var x = cos(tsec*PI*2/60) * 100 + width/2;
  var y = sin(tsec*PI*2/60) * 100 + tmin*50/60 + height/3 ;
  line(width/2,height,x,y);

}


// Spiral code sourced from:
// https://discourse.processing.org/t/how-to-draw-3d-spiral-in-p5-js-in-2d-without-webgl-or-any-3d-engine/9339/5