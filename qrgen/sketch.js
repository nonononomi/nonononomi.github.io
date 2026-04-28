let qrData;
let urlInput;
let colorInput;
let backgroundInput;

function setup() {
  createCanvas(windowWidth, 400);

  urlInput = select('#url');
  colorInput = select('#color');
  backgroundInput = select('#background')


  console.log(qrData);


}

function draw() {
  background(backgroundInput.value());

  textSize(50);

  let gap = 10;

  fill(colorInput.value());

  qrData = qr.encodeQR(urlInput.value());


  for(let y = 0; y < qrData.length; y++){
    let row = qrData[y];
    for (let x = 0; x < row.length; x++){
      let cell = row[x];

      if(cell){
        rect(x*gap,y*gap,gap); //circle:丸、rect：四角
      }
    }
  }

}

