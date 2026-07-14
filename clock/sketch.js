//clock
let colorInput;
let bg; //背景画像
let tenki;
let sky;


//最初の処理
function setup() {
  createCanvas(windowWidth,windowHeight);

  //画像取得　　　（”リンク",コールバック関数)
  loadJSON("https://dog.ceo/api/breed/shiba/images/random",receive);

  //天気情報
  loadJSON("https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m&models=jma_seamless&timezone=Asia%2FTokyo",function(data) {
  console.log("wether")
    console.log(data);
    tenki = data
  });

  

  loadImage("sky.png",function(img){
    sky = img;
  });

  console.log("loading...")
}

//画像を受け取るオリジナル関数.   function 関数名　　（引数）
function receive(data){

  console.log("get");
  console.log(data);
  console.log(data.message);



  //画像のurl = data.message

  //画像を読み込む

  loadImage(
    data.message,
    function(img){
      console.log("画像読み込み成功");
      bg = img;
    },
    function(err){
      console.error("画像読み込み失敗", err);
    }
  );
}
//フレームごとの処理
function draw() {

  colorInput = select('#color');

  background(220);
  
  //画像の表示
  if (bg) {
    bg.resize(600,0)
    image(bg, bg.width/2 ,bg.height/2);
  } 

  //現在の日付オブジェクト
  let date = new Date();

  let h = date.getHours();  //時間
  let m = date.getMinutes();//分
  let s = date.getSeconds();//秒

    if(sky) {
    background(sky.get(map(h,0,24,0,1000),0) );
  }


  fill(colorInput.value());
  textFont('Georgia');
  textSize(50);
  textAlign(CENTER);

  push(); //キャンバスの状態を保存
  translate(width/2,height/2)
  text(date.getFullYear(),0,-300);
  text(date.getMonth() + "/" + date.getDay(),0,-230);
  text(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),0,0);
  if(tenki){text(tenki.hourly.temperature_2m[date.getHours()] + "℃",0,100);

  }

  pop(); //キャンバスの状態を復元

  beginClip();
  noFill();
  circle(width / 2,height / 2, 400);
  endClip();


//文字盤

//
fill('white');
textSize(20);

for (let i = 1; i <= 12; i++) {
  let r =250 ;            //半径
  let d = (i * 30) -90;   //角度
  let x = cos(d) * r;     //x座標＝cos(角度)*半径
  let y = sin(d) * r;     //y座標＝sin（角度）　*半径
  text(i,x,y);            //数字の描画
}

//分針
strokeWeight(6);
stroke('red');
line(
  0, //x1
  0, //y1
  cos(6 * m - 90) * 220, //x2
  sin(6 * m - 90) * 220 //y2
);

strokeWeight(6);
stroke('blue');
line(
  0, //x1
  0, //y1
  cos(6 * s - 90) * 220, //x2
  sin(6 * s - 90) * 220 //y2
);



}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function mouseClicked(){
  loadJSON("https://dog.ceo/api/breed/shiba/images/random",receive);
  console.log("click")
}
