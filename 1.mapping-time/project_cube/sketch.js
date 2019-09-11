var box_lx = 100;
var box_ly = 100;
var box_lz = 400;

var canvassize = 400;

function setup() {
  // set the width & height of the sketch
  createCanvas(canvassize, canvassize, WEBGL)

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

  // set up typography & drawing-color
  textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
  textSize(42) // make it big
  fill(100, 50, 50)

  // draw the time string to the canvas
  // text(now.text.date, 30, 50)
  // text(now.text.time, 30, 100)

  noFill();
  // rotateX(-0.3);
  rotateY(-0.2);
  translate(35,0,0)
  box(box_lx, box_ly, box_lz);

  var x = now.sec;
  var y = now.min;
  var z = now.hour;
  

  box(x * box_lx / 60, box_ly, box_lz);
  box(box_lx , y*box_ly/ 60, box_lz);
  box(box_lx, box_ly, z*box_lz/12);
  plane(100)



}

