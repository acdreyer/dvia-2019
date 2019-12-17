// generate coordinates of random pattern

//Initialize variables

// coordinates

// spring
var xsp = [];
var ysp = [];

// summer
var xsu = [];
var ysu = [];

// fall
var xfa = [];
var yfa = [];

// winter
var xwi = [];
var ywi = [];
var xwi2 = [];
var ywi2 = [];
var twigT = [];

// additional
var rsp = [];
var rsu = [];
var rfa = [];
var rwi = [];
var pi = 3.14;

// Initialize sizes/resolution limits
var canvasx = 400;
var canvasy = 400;
var maxtexturewint = 600;
var maxtexture = 300;
var maxtexturesum = maxtexture;
var maxtexturespr = maxtexture;
var maxtexturefal = maxtexture;
var maxtwigL = 25;
var maxtwigt = 3;
var maxleaf = 20;
var circD = canvasx  / 2;
var circR = circD / 2;
var c = 0.55191502449;

// the colors function from supplied examples code
// for reference see: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
// #d4c675	(212,198,117)
// #d09a58	(208,154,88)
// #ab4747	(171,71,71)
// #7e3e3e	(126,62,62)
// #3c3c45	(60,60,69)


// the colorForProgress() function takes a 'progress' value between 0.0 and 1.0 and returns a hex string
// see the chroma.js docs for details: https://vis4.net/chromajs
var seasonsky = [
  [239, 239, 239],
  [200, 200, 200],
  [13, 172, 244],
  [200, 200, 200],
  [239, 239, 239]
]
var skygradient = chroma.scale(seasonsky).mode('lab')
// var seasonsky = ['#C9C9C9', '#E3E3E3', '#9AD3DE', '#718EBB', '#3c3c45']
// var fallcolors = ['#d4c675', '#d09a58', '#ab4747', '#7e3e3e', '#3c3c45']
var fallcolors = [
  [212, 198, 117],
  [208, 154, 88], '#ab4747',
]
var gradient = chroma.scale(fallcolors).mode('lab')

// ------------------ Color Functions ----------------
function colorForProgress(pct) {
  return gradient(pct).hex()
}

function colorForskyProgress(pct) {
  return skygradient(pct).hex()
}


// ------------------ Pattern Function ----------------
function drawleaf(xcoor, ycoor, sze, n) {
  for (let i = 1; i <= n; i++) {

    push();
    strokeWeight(0.2);
    stroke(50);
    let basex = 0.2;
    let basey = 0.15;
    let tipx = 0.15;
    let tipy = 0.25;
    translate(xcoor, ycoor)
    rotate(xcoor + i * pi / 4);
    // if (i==1){circle(0, 0,sze*0.2)}
    bezier(0, 0, 0 - sze * basex, 0 - sze * basey, 0 - sze * tipx, 0 - sze * (1 - tipy), 0, 0 - sze);
    bezier(0, 0, 0 + sze * basex, 0 - sze * basey, 0 + sze * tipx, 0 - sze * (1 - tipy), 0, 0 - sze);
    //     bezier(0,0, xcoor-sze*basex,ycoor-sze*basey, xcoor-sze*tipx , ycoor-sze*(1-tipy),xcoor,ycoor-sze)
    // bezier(xcoor,ycoor, xcoor+sze*basex,ycoor-sze*basey, xcoor+sze*tipx , ycoor-sze*(1-tipy),xcoor,ycoor-sze)
    pop()
  }
};

// ------------------ Clock halfcircle Function ----------------

function drawHalfCirc(prog, rot, strk, fll, alph, fllboole) {

  push();
  translate(canvasx / 2, canvasy / 2)
  rotate(rot);
  // strokeWeight(1);
  if (fllboole) { fill(fll, alph) }
  else { noFill() };

  stroke(strk);

  // leftBezier
  //        x   y   xctrl     yctrl              xctrl  yctrl     x     y
  bezier(-circR, 0, -circR, -circR * c * prog, -circR * c, -circR * prog, 0, -circR * prog)
  // rightBezier
  bezier(0, -circR * prog, circR * c, -circR * prog, circR, -circR * c * prog, circR, 0)
  // fill
  noStroke();
  triangle(-circR, 0, 0, -circR * prog, circR, 0)
  pop();
}






// ------------------ Setup Function ----------------
function setup() {


  // set the width & height of the sketc & set framerate
  createCanvas(canvasx, canvasy)
  frameRate(5);

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock())


  // create the winter texture coordinates (if different from other 3 seasons)
  for (let i = 0; i < maxtexture; i++) {

    xwi[i] = random(canvasx);
    ywi[i] = random(canvasy);
    rwi[i] = random(maxleaf);
    xwi2[i] = xwi[i] + random(maxtwigL) - random(2 * maxtwigL);
    ywi2[i] = ywi[i] + random(maxtwigL) - random(2 * maxtwigL);
    twigT[i] = random(maxtwigt);
  }


  // create coordinates for pattern
  for (let i = 0; i < maxtexture; i++) {
    xsp[i] = random(canvasx);
    ysp[i] = random(canvasy);
    rsp[i] = random(maxleaf);

    xsu[i] = random(canvasx);
    ysu[i] = random(canvasy);
    rsu[i] = random(maxleaf);

    xfa[i] = random(canvasx);
    yfa[i] = random(canvasy);
    rfa[i] = random(maxleaf);

  }
}



// ------------------ Draw Function ----------------

function draw() {
  // check the clock for the current time
  var now = clock()

  // set the background 
  // background(colorForskyProgress(now.progress.year));
  // background('white');
  // background(240);

  if (now.pm) {
    background(240)
  }
  else {
    background(255)
  }


  // set up typography & drawing-color
  textFont("Anonymous Pro") // ← check index.html to see how it was loaded from google-fonts
  textSize(42) // make it big
  fill(100, 50, 50)

  // draw the time string to the canvas
  // text(now.text.date, 30, 50)
  // text(now.text.time, 30, 100)

  // for (let i = 0; i < maxtexturewint; i++) {
  //   // winter
  //   // stroke(165,42,42); 
  //   stroke('#785027');
  //   // text(thisintensity((now.season-1)+now.progress.season), 30, 150)
  //   strokeWeight(twigT[i]);
  //   line(xwi[i], ywi[i], xwi2[i], ywi2[i]);
  // }
  springI = thisintensity((now.season - 1) + now.progress.season);
  summerI = thisintensity((now.season - 2) + now.progress.season)
  fallI = thisintensity((now.season - 3) + now.progress.season);
  winterI = thisintensity((now.season) + now.progress.season);



  // ------------------ Spring pattern ----------------
  // Draw spring background
  if (springI > 0.01) {
    for (let i = 0; i < round(maxtexture * springI); i++) {
      stroke(254, 127, 156, springI * 255);
      fill(254, 127, 156, springI * 255);
      // strokeWeight(rsp[i]);
      drawleaf(xsp[i], ysp[i], rsp[i], now.weekday);
    };
  };

  // // ------------------ Summer pattern ---------------- 57, 137, 48

  if (summerI > 0.01) {
    for (let i = 0; i < round(maxtexture * summerI); i++) {
      stroke(201,220,135, summerI * 255);
      fill(201,220,135, summerI * 255);
      // strokeWeight(rsu[i]);
      drawleaf(xsu[i], ysu[i], rsu[i], now.weekday);
    };
  };

  // ------------------ Fall pattern ----------------
  if (fallI > 0.01) {
    for (let i = 0; i < round(maxtexture * fallI); i++) {
      var facolor = colorForProgress(thisintensity((now.season - 3) + now.progress.season))
      stroke(facolor);
      fill(facolor);
      // strokeWeight(rfa[i]);
      drawleaf(xfa[i], yfa[i], rfa[i], now.weekday);
    };
  };


  // ------------------ Winter pattern  ----------------
  if (winterI > 0.01) {
    for (let i = 0; i < round(maxtexture * winterI); i++) {
      stroke(150);
      // fill(200, 200, 200, winterI * 255);
            fill(179, 218, 241, winterI * 255);
      // strokeWeight(rwi[i]);
      drawleaf(xwi[i], ywi[i], rsp[i], now.weekday);
    };
  };



  // // ------------------ Clock circles  ----------------
  cSec = now.progress.min * 2 - 1;
  cMin = now.progress.hour * 2 - 1;
  cHr = now.progress.halfday * 2 - 1;


  // Create backdrop/ball circle effect
  push();
  translate(canvasx / 2, canvasy / 2);
  stroke(0, 150)
  strokeWeight(0.5);
  fill(230, 150)
  circle(0, 0, circD);
  // stroke(230)
  line(-circR, 0, circR, 0)
  pop();
  push();
  stroke(150, 150)
  translate(canvasx / 2, canvasy / 2);
  rotate(pi / 3);
  line(-circR, 0, circR, 0)
  pop();
  push();
  stroke(150, 150)
  translate(canvasx / 2, canvasy / 2);
  rotate(2 * pi / 3);
  line(-circR, 0, circR, 0)
  pop();


  // // ------------------ Clock animation  ----------------
  // Add clock lines for animation
  strokeWeight(1);
  drawHalfCirc(-cHr, 0, 200, 255, 0, 0);
  if (now.min % 2) {
    drawHalfCirc(cSec, pi / 3, 0, 220, 150, 1);
    drawHalfCirc(-cSec, pi / 3, 200, 220, 150, 1);
    drawHalfCirc(-cSec, pi / 3, 200, 220, 150, 1);
  }
  else {
    drawHalfCirc(-cSec, pi / 3, 200, 220, 150, 1);
    drawHalfCirc(-cSec, pi / 3, 200, 220, 150, 1);
    drawHalfCirc(cSec, pi / 3, 0, 200, 150, 1);
  }

  strokeWeight(1.5);
  if (now.hour % 2) {
    drawHalfCirc(cMin, 2 * pi / 3, 0, 255, 0, 0);
    drawHalfCirc(-cMin, 2 * pi / 3, 220, 255, 0, 0);
    if (now.min % 2) { drawHalfCirc(cSec, pi / 3, 0, 220, 150, 0); }
    else { drawHalfCirc(cSec, pi / 3, 0, 220, 150, 0); }
  }
  else {
    drawHalfCirc(cMin, 2 * pi / 3, 0, 255, 0, 0);
    drawHalfCirc(-cMin, 2 * pi / 3, 220, 255, 0, 0);
    if (now.min % 2) { drawHalfCirc(cSec, pi / 3, 0, 220, 150, 0); }
    else { drawHalfCirc(cSec, pi / 3, 0, 220, 150, 0); }
  }

  strokeWeight(2);
  drawHalfCirc(cHr, 0, 0, 255, 0, 0);



  // push()
  // strokeWeight(1);
  // stroke(1);
  // text(springI, 30, 50)
  // text(summerI, 30, 100)
  // text(fallI, 30, 150)
  // text(winterI, 30, 200)
  // // text(now.season + now.progress.season, 30, 100)
  // pop();

}


// This function ramps up a cosine from 0-1 to gradually enter a season
function thisintensity(thisprogress) {
  if (cos(thisprogress * pi / 2) >= 0) {
    return cos(thisprogress * pi / 2);
  }
  else {
    return 0;
  }
};
