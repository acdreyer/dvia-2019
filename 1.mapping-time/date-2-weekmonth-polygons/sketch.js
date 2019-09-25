var canvasx = 600;
var canvasy = 600;

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

  // set up typography & drawing-color
  textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
  textSize(42) // make it big
  fill(100, 50, 50)

  // draw the time string to the canvas
  // text(now.text.date, 30, 50)
  // text(now.text.time, 30, 100)


  var x = canvasx/2;
  var y = canvasy/2;
  var sizefact;

fill(255);
strokeWeight(1)

if (now.day > 7 && now.day < 15){
  strokeWeight(3);
  sizefact = 1.5;
}
  else if (now.day>14 && now.day <22){
  strokeWeight(5)
      sizefact = 2;
  }
  else if (now.day>21 && now.day <29){
  strokeWeight(7)
        sizefact = 2.5;
    
  }
  else if (now.day>28  ){
  strokeWeight(9)
          sizefact = 3;
  }
  else {
    strokeWeight(1)
          sizefact = 1;
  };
  
  
  
  if (now.weekday == 1) {
    point(x, y)
  }
  else if (now.weekday == 2) {
    line(x, y, x + 30*sizefact, y)
  }
  else {
    polygon(x, y, 30*sizefact, now.weekday);
  }

}



// polygon function from https://p5js.org/examples/form-regular-polygon.html

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}