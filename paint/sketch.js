//paint

let px ;
let py ;

let sw = 1;

let colorInput;
let weightInput;
let btnClear;  //消去ボタン
let btnSave;

let pickedColor;
let strokes = []; //これまで書いた線を保存
let currenStroke = []; //今描いてる線を一時保存

let undoData; //キャンバス保存用
let btnUndo;

let btnSpot;
let spotMode = false; //スポイトが機能していない状態

<<<<<<< HEAD
//let swText;
let lineWidth
=======
let penColor; //色の保存
>>>>>>> 903cf70d0b90d06ee2773970ae19629ca9f163cd



//最初の処理
function setup() {
  console.log("setup")
  createCanvas(400, 400);
  background(255)
  pixelDensity(1); //ピクセル深度

  let code = getItem('paint'); //保存データをロード
  decodePixels(code);

  colorInput = select('#color');  //色選択UIを取得
  weightInput = select('#weight');  //太さ選択UIを取得

  btnClear = select('#clear'); //消去ボタンを取得
  btnClear.mousePressed(clearAll); //消去関数の予約

  btnSave = select('#save');
  console.log(btnSave); //ログの表示

  btnUndo = select('#undo'); //undoボタンをhtmlから取得
  btnUndo.mousePressed(undo); //押したときに実行

  btnSpot = select('#spot');
  console.log(btnSpot);
  btnSpot.mousePressed(spot);
  console.log("スポイト登録完了");

<<<<<<< HEAD
  //swText = select("#swValue")
  lineWidth = select("#lineWidth");
=======
  penColor = color(colorInput.value());

  colorInput.input(function () {
  penColor = color(colorInput.value());

  
});
>>>>>>> 903cf70d0b90d06ee2773970ae19629ca9f163cd

  btnSave.mousePressed(saveImg);
   //関数があってるのに実行されていない場合は関数名を変更すると良い(p５.jsが既に使っている可能性がある)
   //ID名は被っていなければOK

  sw = Number(weightInput.value());


}

function draw() {
  console.log("draw");
  //background(220);

  //if ( keyIsPressed ){
  //console.log(key);
  //if (key == 'f') { //Fキーが押されていたら
  //  weightInput.value(min(100, Number(weightInput.value()) + 0.1));
  //} else if (key == 'd'){ //Dキーが押されていたら線を細くする
  //  weightInput.value(max(1, Number(weightInput.value()) - 0.1));
  //}

  //swText.html(sw);
  //}


  //sw = constrain(sw,1,100);

  sw = Number(weightInput.value());
  lineWidth.html(sw);

  //stroke(colorInput.value());
  stroke(penColor);
  strokeWeight(sw); //線の太さ

}

//マウス座標を更新
function update(){
  px = mouseX;
  py = mouseY;
}

//線消去の関数
function clearAll(){
  background(255); //白で塗りつぶす
}

function saveImg(){
  console.log("SAVE!!!")
  saveCanvas('paint.png');
}

function mousePressed(){                    //書く前のキャンバスを保存

  console.log("spotMode =", spotMode);



  if (mouseY > height || mouseX > width || mouseX < 0 || mouseY < 0) {
  return;
}

  console.log(mouseX, mouseY);

  currenStroke = []; //一時保存用
  px = mouseX;
  py = mouseY;

  loadPixels();
  undoData = pixels.slice(); //配列のコピー

  console.log("保存",undoData.length);




if (spotMode){
  console.log(mouseX, mouseY);
  pickedColor = get(mouseX,mouseY);
  console.log(pickedColor);                           //色の取得

  penColor = color(pickedColor);

  //let hexColor = hex(pickedColor);                       //色をカラーコードにする
  //console.log(hexColor);

  //colorInput.value(hexColor);
  spotMode = false;
  return;
}



}

function mouseDragged(){                    //線を書く

  if (spotMode) {
  return;
}

  console.log('mouseDragged');
  line(px-10,py-10,mouseX -10,mouseY -10);

  update();
}

function mouseReleased(){                  //保存していたキャンバスを戻す

  console.log('マウスを離しました');
  let code = encodePixels(); //キャンバスを符号化
  strokes.push(currenStroke);
  console.log('code');
  storeItem('paint',code);

  
}

function undo() {
  console.log("undo!");
  console.log(undoData);
  loadPixels();
  for (let i = 0; i< pixels.length; i++){
    pixels[i] = undoData[i];
  }
  updatePixels();
}

function spot(){
  console.log("スポイト");

  spotMode = true;   //箱の中身を変える＝スポイトをonにする
  console.log(spotMode);

  return false;
}




window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseDragged = mouseDragged;
window.mouseReleased = mouseReleased;