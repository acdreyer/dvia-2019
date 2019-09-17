var canvaslx = 640;
var canvasly = 240;
let y;
let numsec = 11;
let nummin = 11;
let numhr = 13;
var xsec = (canvaslx-40)*5/6+30;
var xmin = (canvaslx-40)*3/6+20;
var xhr = (canvaslx-40)*1/6+10;
var yall = (canvasly-20)/2+10;
var totalwidth = (canvaslx-40)/3;
var totalheight = (canvasly-20);

function setup() {
  // set the width & height of the sketch
  createCanvas(canvaslx, canvasly)
  background('white')

  // Initialize
  frameRate(60);
  fill(100, 50, 50)
    


}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
  background('white')
    if (now.pm){
    background(255)
  }else{
    background(200,99)
  }
    
  rectMode(CENTER);
  var y = 10;
  noFill();
  strokeWeight(1);
  stroke(0);
  
  // Create boxes for sec/min/hour. This needs to be re-drawn every frame to get the right effect. 
  // The seconds box
  for (let i = 1; i < numsec; i++) {
    fill( 10 + i/numsec*125,90);
    rect(xsec,yall , totalwidth*i/numsec, totalheight*i/numsec);
  }
  // The minutes box
    for (let i = 1; i < nummin; i++) {
    fill(10+  i/numsec*100,95);
    rect(xmin, yall, totalwidth*i/nummin, totalheight*i/nummin);
  }
  // The hours box
    for (let i = 1; i < numhr; i++) {
    fill( 10+ i/numsec*75,95);
    rect(xhr, yall, totalwidth*i/numhr, totalheight*i/numhr);
  }

  // The seconds box takes a minute to grow
  fill(now.progress.min*100,70)
  noStroke()
  rect(xsec,yall, now.progress.min*totalwidth*10/11, now.progress.min*totalheight*10/11)
  
  // The minutes box takes an hour to grow
    fill(now.progress.hour*50,70)
  noStroke()
  rect(xmin,yall, now.progress.hour*totalwidth*10/11, now.progress.hour*totalheight*10/11)
  
  // The hours box needs to be updated hour by hour (12 in total)
    fill(now.hour/12*5,95)
  noStroke()
  rect(xhr,yall, now.hour*totalwidth/13, now.hour*totalheight/13)

}