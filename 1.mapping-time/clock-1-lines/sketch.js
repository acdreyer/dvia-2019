  var num = 6
  var num2 = 60
  var xtotal = 12;
  var xtotal2 =12;
  var linepmam = 0;

function setup() {
  // set the width & height of the sketch
  createCanvas(300, 300)

}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // set the background to white for am and black for pm
  if (now.pm){
    background(0)
    linepmam = 255;
  }else{
    background(255)
    linepmam = 0;
  }
    

  fill(0);
  
  // Plot Vertical index by iteration
    var y = 0;
  strokeWeight(1); stroke(150);
    for (let i = 0; i <= num2 ; i++) {
    line(0, y, 5+i/2, y);
    if (i%5==0){ strokeWeight(2);  line(0, y, 8+i/2, y); strokeWeight(1)};
    y += height/num2;
  }
  y = 0;   strokeWeight(2); stroke(150);
  for (let j = 0; j <= num ; j++) {
    line(0, y, 8+ (j+1)*5, y);
    y += height/num;
  }


// Plot Horizontal index by iteration
    var xs = 0;   
  strokeWeight(2); stroke(150);
    for (let i = 0; i <= xtotal2 ; i++) {
    line(xs, 0, xs, 8+i*2);
    // if (i%5==0){ strokeWeight(2);  line(xs, 0, xs, i/2); strokeWeight(1)};
    xs += width/xtotal2;
  }


// Initalize the clock variables
  var x = now.sec*width/60;
  var xhr = now.hour*width/12;
  var y = (height - now.min*height/60);
  
  // Draw the clock lines
  strokeWeight(1); stroke(linepmam);
  line(x, 0, x, height);
  strokeWeight(2);
  line(0, y, width, y);
  strokeWeight(3)
  line(xhr, 0, xhr, height);

}