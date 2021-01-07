// Setting Sounds
let chord = []
let base = 50
let major = [ 4, 5, 10 ]
let minor = [ 1, 12, 20 ]

let n = 100
flies = []
var time = 0;

class Firefly{
  constructor(x, y){
    this.x = x
    this.y = y
    point(this.x, this.y)
  }
  
  makex(x){
    this.x = x
  }
  
  makey(y){
    this.y = y
  }
  
  grow(){
    this.makex(random(this.x - 5, this.x + 5))
    this.makey(random(this.y - 5, this.y + 5))
    point(this.x, this.y)
  }
}

function setup() {
  createCanvas(500, 500);
  noFill();
  stroke(255);
  
  //Set up fireflies
  for (var i = 0; i < 30; i ++){
    fly1 = new Firefly(random(width),random(height))
    flies.push(fly1)
  }
  
  // initialize oscillators
  if (n < 25) {
    for (let i = 0; i < 3; i++)
    	chord[i] = new p5.TriOsc()
  } else {
    for (let i = 0; i < 3; i++)
    	chord[i] = new p5.SinOsc()
  }
  
  // initialize with major chord intervals
  for (let i = 0; i < chord.length; i++) {
    	chord[i].freq(major[i] * base)
        chord[i].amp(0.0)
  		chord[i].stop()
  }
}

function draw() {
  background(0);
  
 // drawing the lines on the screen
  for (i=0; i<=7; i++) {
    stroke(random(0,255));
    //line(random(0, width), 0, 250, 2000);
    line(random(0, width), 0, mouseX, 2000);
    strokeWeight(1);
  }
  
  //Fireflies to the screen
  const st = map(cos(frameCount/100),-0.5,0.5,mouseX,mouseY);
  stroke(st,50,360);
  strokeWeight(3);
  
  for (var i = 0; i < flies.length; i++){
    flies[i]. grow()
  }
  
  // Hourglass
  for (var i = 0; i < 360; i+=3) {
    var x = cos(radians(i)) * mouseX/2 + width / 2;
    var y = sin(radians(i)) * mouseY/2 + height / 2;
    var w = sin(radians(time+i )) * 100;
    w = abs(w);

    var col=map(i,0,mouseX,100,mouseY);
    fill(col,col,col);

    noStroke();
    fill(col,150,200);
    ellipse(x, y, w, w);
  }
  time++;
  
  // distort oscillatiors
  warp()
  for (let i = 0; i < chord.length; i++) {
    chord[i].start()
    chord[i].amp(0.2, 0.5)
  }

}

// change sounds
function warp() {
  let bias = 0
  for (let i = 0; i < n; i++)
  	bias = max(bias, dist(mouseX*1.5, mouseY*1.5, 250, 250));
  
  for (let i = 0; i < chord.length; i++)
    chord[i].freq(map(bias, width, 0, major[i], minor[i]) * base);
}

// add in more fireflies
function mousePressed(){
  fly1 = new Firefly(random(width),random(height))
  flies.push(fly1)
}


/* 
The sound coding is based off OpenProcessing - I've
heavily altered it to fit my project. 
Credit: Alex Waz

The circles animation is used from OpenProcessing - I've
altered the shape and colors to fit my project. 
Credit: Yasai
*/
