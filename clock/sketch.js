//clock

//最初の処理
function setup() {
  createCanvas(windowWidth,windowHeight);
}

//フレームごとの処理
function draw() {
  background(220);

  fill(0,0,0);
  textFont('Georgia');
  textSize(50);
  textAlign(CENTER);
  text("12:35",width / 2 ,height / 2);

  noFill();
  circle(width / 2,height / 2, 400);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}