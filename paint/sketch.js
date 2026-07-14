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
  btnSpot.mousePressed(spot);



  btnSave.mousePressed(saveImg);
   //関数があってるのに実行されていない場合は関数名を変更すると良い(p５.jsが既に使っている可能性がある)
   //ID名は被っていなければOK


}

function draw() {
  console.log("draw");
  //background(220);

  if ( keyIsPressed ){
  console.log(key);
  if (key == 'f') { //Fキーが押されていたら
    sw +=2;
  } else if (key == 'd'){ //Dキーが押されていたら線を細くする
    sw -= 2;
  }
  }


  sw = constrain(sw,1,100);

  stroke(colorInput.value());
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
  currenStroke = []; //一時保存用
  px = mouseX;
  py = mouseY;

  loadPixels();
  undoData = pixels.slice(); //配列のコピー

  console.log("保存",undoData.length);


if (spotMode){
  pickedColor = get(mouseX,mouseY);       //色の取得
  let hexColor = hex(pickedColor);                       //色をカラーコードにする

  console.log(hexColor);

  colorInput.value(hexColor);
  spotMode = false;
}



}

function mouseDragged(){                    //線を書く
  console.log('mouseDragged');
  line(px,py,mouseX,mouseY);

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
}




window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseDragged = mouseDragged;
window.mouseReleased = mouseReleased;