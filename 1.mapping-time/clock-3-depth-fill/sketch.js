
var canvaslx = 640;
var canvasly = 220;
var sizesec = 11;
var sizehr = 11;

var xcsec = (canvaslx-40)*5/6+30;
var xcmin = (canvaslx-40)/2+20;
var xchr = (canvaslx-40)*1/6+10;
var yc = (canvasly-20)/2+10;

var maxsqwidth = (canvaslx-40)/3;
var maxsqheight = (canvasly-20);



function setup() {
  // set the width & height of the sketch
  createCanvas(canvaslx, canvasly)

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock())

}

function draw() {
  // check the clock for the current time and unpack some of its fields to generate a time-string
  var now = clock()

  
  // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // note that setting the background also clears the canvas from our previous round of drawing
    fill(255)
    if (now.pm){
    background(230)
  }else{
    background(255)
  }


  // set up typography & drawing-color
  // textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
  // textSize(42) // make it big
  // fill(100, 50, 50)

  // draw the time string to the canvas
  // text(now.text.date, 30, 50)
  // text(now.text.time, 30, 100)
  
  rectMode(CENTER);
  
  stroke(0)
  for (let i = 1; i < sizesec ; i++){
    fill(140-140*i/sizesec,40)
    rect(xcsec,yc, maxsqwidth*i/sizesec, maxsqheight*i/sizesec)
  };
  for (let i = 1; i < sizesec ; i++){
    fill(140-140*i/sizesec,40)
    rect(xcmin,yc, maxsqwidth*i/sizesec, maxsqheight*i/sizesec)
  };
  for (let i = 1; i < sizehr ; i++){
    fill(140-140*i/sizesec,30)
    rect(xchr,yc, maxsqwidth*i/sizehr, maxsqheight*i/sizehr)
  };
  
  noStroke();
  fill(0+80*now.progress.sec+30*now.progress.min,99)
  rect(xcsec,yc, maxsqwidth*now.progress.min*10/sizesec, maxsqheight*now.progress.min*10/sizesec);


  fill(0+80*now.progress.hour,99)
  rect(xcmin,yc, maxsqwidth*now.progress.hour*10/sizesec, maxsqheight*now.progress.hour*10/sizesec);
  
  fill(0+10*now.hour/12,99)
  rect(xchr,yc, maxsqwidth*now.progress.halfday*10/sizehr, maxsqheight*now.progress.halfday*10/sizehr);

}