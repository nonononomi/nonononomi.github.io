let url = 'https://suzuri.jp/amekusa/18026468/t-shirt/s/white';

let qrData;

let mouseLocked = false;
let mx = 0;
let my = 0;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('p5-canvas'); // Set HTML element id
  frameRate(15);
  colorMode(HSL, 100);
  qrData = qr.encodeQR(url, 'raw');
}

function draw() {
  // noLoop();
  // background(220);
  clear();

  drawQR(qrData);
}

function drawQR(data) {
  let cellSize = 8;
  let gapX = 10;
  let gapY = 10;

  push();
  let c = color(
    map(mx, 0, width, 0, 100),
    map(my, 0, height, 0, 100),
    50
  );
  fill(c);
  // stroke(c);
  noStroke();

  let rowMax = data.length - 1;
  let colMax = data[0].length - 1;
  for (let row = 0; row <= rowMax; row++) {
    let line = data[row];
    beginShape();
    for (let col = 0; col <= colMax; col++) {
      let cell = line[col];
      let x = col * gapX;
      let y = row * gapY;
      if (cell) {
        // circle(x, y, cellSize);
        y -= 10;
      }
      vertex(x, y);
    }
    endShape();
  }
  pop();
}

function mousePressed() {
  mouseLocked = !mouseLocked;
}

function mouseMoved() {
  if (!mouseLocked) {
    mx = mouseX;
    my = mouseY;
  }
}
