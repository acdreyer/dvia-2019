
// Code for gear is adapted from p5 code for a star: https://p5js.org/examples/form-star.html
// Additional code was adapted from the supplied examples for rotation

var borderx = 20;
var canvasxinner = 600;
var canvasx = canvasxinner + borderx*2;
var canvasy = 300;
var x;
var y;
var num;
var pitch;
var pi =3.14;

function setup() {
  // set the width & height of the sketch
  createCanvas(canvasx, canvasy)

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  print('starting time:', clock())


}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  background('white')






  fill(255);
  stroke(0); strokeWeight(1);
  
  var r = 30;
  var d = r*2;
  var n = 24;
  var p = 6;
  var pitch =PI*d/n;
  
    // rotation
  var revs = canvasxinner/(pi*r*2);
  var gearRot = now.progress.month*revs*2*pi;
  
  push();
  translate(borderx+now.progress.month*canvasxinner, height * 0.5);
  rotate(gearRot);
  star(0, 0, r-p/2, r+p/2, n);
  point(0, 0, r-p/2, r+p/2, n)
  pop();
  
  num = canvasxinner/pitch;
  x=+borderx+pitch/2;
  y=canvasy/2+r;
  for (let i = 0; i < num; i++) {
    line(x,y,x+pitch/2, y+p);
    line(x+pitch/2,y+p,x+pitch,y)
    x += pitch;
  }


xl=borderx;
  for (let i = 0; i < 5; i++) {
    line(xl,canvasy/2,xl, canvasy/2-50);
    if (now.month ==1||now.month ==3||now.month ==5||now.month ==7||now.month ==8||now.month ==10||now.month ==12){
    xl += canvasxinner/31*7;
    }
    else if (now.month ==2 )
    {xl += canvasxinner/28*7;}    // doesn't account for leap years
    else{xl += canvasxinner/30*7;}
  }


}




function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
