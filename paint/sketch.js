//paint

let px ;
let py ;

let sw = 1;

let colorInput;
let weightInput;
let btnClear;  //消去ボタン
let btnSave;

let inputColor;


//最初の処理
function setup() {
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

  btnSave.mousePressed(saveImg);
   //関数があってるのに実行されていない場合は関数名を変更すると良い(p５.jsが既に使っている可能性がある)
   //ID名は被っていなければOK


}

function draw() {
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
  
  //noStroke(); //境界線を消す
  // stroke(colorInput.value()); //塗りの色
  // strokeWeight(weightInput.value());

  if ( mouseIsPressed ){
//条件がtrueだったら実行
//circle(mouseX,mouseY,10);

//前のフレームの位置から
//今のフレームの位置まで線を引く
    line(px,py,mouseX,mouseY, sw * random(0.5,2));
  }
  update();
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

function mouseReleased(){
  console.log('マウスを離しました');
  let code = encodePixels(); //キャンバスを符号化
  console.log('code');

  storeItem('paint',code);
}