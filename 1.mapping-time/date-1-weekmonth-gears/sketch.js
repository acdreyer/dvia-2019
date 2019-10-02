// Code for gear is adapted from p5 code for a star: https://p5js.org/examples/form-star.html
// Additional code was adapted from the supplied examples for rotation

var borderx = 20;
var canvasxinner = 800;
var canvasx = canvasxinner + borderx * 2;
var canvasy = 300;
var x;
var y;
var num;
var pitch;
var pi = 3.141592;
var xl=[];
var count = 0;
var a=true;
var b=true;
var c=true;
var d=true;
var e=true;
var dayboole=true;
var strt=0;

function setup() {
  // set the width & height of the sketch
  createCanvas(canvasx, canvasy)

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock())

frameRate(60);
}


// -------------------- Function -------------------

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  background('white')



  fill(255);
  stroke(0);
  strokeWeight(1);

  var r = 30;
  var d = r * 2;
  var n = 24;
  var p = 6;
  var pitch = PI * d / n;

// rotation
var revs = canvasxinner / (pi * r * 2);
var gearRot = now.progress.month * revs * 2 * pi;

push();
translate(borderx + now.progress.month * canvasxinner, height * 0.5);
rotate(gearRot);
star(0, 0, r - p / 2, r + p / 2, n);
point(0, 0, r - p / 2, r + p / 2, n)
line(0, r / 2, 0, r)
pop();

num = canvasxinner / pitch;
x = +borderx + pitch / 2;
y = canvasy / 2 + r;
for (let i = 0; i < num; i++) {
  line(x, y, x + pitch / 2, y + p);
  line(x + pitch / 2, y + p, x + pitch, y)
  x += pitch;
}



if (now.month == 1 || 3|| 5 || 7 || 8 || 10 || 12){
  totaldays = 31;
}
if (now.month == 4|| 6 || 9 || 11 ){
  totaldays = 30;
}
if (now.month == 2 ){
  totaldays = 28;
}

if(now.day == 1){
  strt=now.weekday;
}


for (let i=0; i <= round(totaldays/7) ; i++){
  xl[i] = borderx + (7*i/totaldays)*canvasxinner; }


// reset counters
if (now.progress.month <1/27 && dayboole){
  count = 0;
  dayboole = false;
  a=true; b=true; c=true; d=true; e=true;
  xl = [];
};
  
  // if (now.weekday == 1 && now.day<7 && a==true ){
  //   a=false;
  //   xl[count] = borderx + now.progress.month*canvasxinner; count++;
  //   // console.log(count);
  // } 
  // if (now.weekday == 1 && now.day>7 && b==true){
  //   b=false;
  //   xl[count] = borderx + now.progress.month*canvasxinner; count++;
  //       // console.log(count);
  // }
  // if (now.weekday == 1 && now.day>14 && c==true){
  //   c=false;
  //   xl[count] = borderx + now.progress.month*canvasxinner; count++;
  //       // console.log(count);
  // }   
  //         // console.log(d);
  // if (now.weekday == 1 && now.day>20 && d==true){
  //   d=false;
  //   xl[count] = borderx + now.progress.month*canvasxinner; count++;

  // }


// console.log(count);
  for (let i = 0; i <= xl.length; i++) { 
    line( xl[i] , canvasy / 2,  xl[i], canvasy / 2 - 50); }


if (now.progress.month > 27/30 && !dayboole){ dayboole = true }

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
