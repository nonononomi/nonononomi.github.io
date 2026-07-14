
import { drawBody } from './util.js';
//let {Engine, Bodies, Composite} = Matter; // モジュールを変数化

let engine; // 物理エンジン

let Engine = Matter.Engine;
let Bodies = Matter.Bodies;
let Body = Matter.Body;
let Composite = Matter.Composite;
let Events = Matter.Events;



let moon = [
  [
    { x: 85, y: 33 },
    { x: 55, y: 78 },
    { x: -40, y: 77 },
    { x: -90, y: 21 },
    { x: -88, y: -77 },
    { x: -25, y: -115 },
    { x: 39, y: -110 },
    { x: 93, y: -68 },
    { x: 91, y: -45 },
    { x: 58, y: -68 },
    { x: 25, y: -68 },
    { x: 3, y: -45 },
    { x: 1, y: 0 },
    { x: 30, y: 31 },
    { x: 63, y: 32 },
    { x: 87, y: 15 },
  ],
]

let hitSE; //衝突音
let isPaused = false; //ポーズ中か否か（フラグ）

let scene = 'title'; //現在のシーン　

function setup() {
  createCanvas(400, 400);

  loadSound('se.wav',data =>{
    hitSE = data; //変数に保存
  })

  // 物理エンジン（世界）を初期化
  engine = Engine.create();

  // 箱を生成 (X, Y, 幅, 高さ)
  let boxA   = Bodies.rectangle(150, 200, 120, 120); // 箱（大）
  let boxB   = Bodies.rectangle(200,   0,  80,  80); // 箱（小） 
  let ground = Bodies.rectangle(200, 350, 380,  50, { isStatic: true }); // 地面

  // 箱を世界に配置
  Composite.add(engine.world, [boxA, boxB, ground]);

  Events.on(engine,'collisionStart',ev => {
    for (let i = 0; i < ev.pairs.length; i++) {
      let pair = ev.pairs[i]; //衝突したペア
      let a = pair.bodyA.parent; //衝突物A
      let b =pair.bodyB.parent; //衝突物B

      if (hitSE) {
        hitSE.play(); //衝突音を鳴らす
      }
    }
  });

}
function draw() {

  if (scene == 'title'){
    //タイトル画面
    background(220);
    text('MyGame',200,200);
  

  } else if (scene == 'play'){
    //プレイ画面
    background(220);

    // 世界に配置された全ての物体を取得（配列） 
  let bodies = Composite.allBodies(engine.world);

  // 全ての物体を描画（配列をスキャン）
  for (let i = 0; i < bodies.length; i++) {
    let body = bodies[i];
    if (body.color){
      fill(body.color);
    }
    drawBody(bodies[i]);
  }
  
  // 世界の更新（1 フレーム時間を進める）
  if (isPaused){
    //何もしない
    textSize(50);
    fill('white');
    textAlign(CENTER);
    text('PAUSE',200,200)

  } else { //そうでなければ
    Engine.update(engine,15);
  }


  }else if (scene == 'gameover'){
    //ゲームオーバー画面
    
  }




}



// 自作関数: 引数で渡された物体を描画する
//function drawBody(body) {
  //let v = body.vertices; // 物体の頂点（配列）
  //beginShape(); // 多角形描画開始
  //for (let i = 0; i < v.length; i++) {
    //vertex(v[i].x, v[i].y);
  //}
  //endShape(CLOSE); // 多角形描画終了
//}

//マウスを押したら箱を生成
function mousePressed(){
  console.log('マウスが押されました')

    if(isPaused){
    return;
  }

if (scene == 'title') { //タイトル画面だったら
  scene = 'play';  //プレイ画面に移動
  return; //関数終了
}


  //物体の生成
  let body = Bodies.fromVertices(mouseX, mouseY, moon);
  Body.scale(body, .5, .5);
  body.name = '三日月'
  body.color = [
    random(0,255),
    random(0,255),
    random(0,255)
  ]

  Composite.add(engine.world, body);
}

function keyPressed(){
  console.log('キーが押されました');
  console.log('押されたキー：', key);

  if (scene == 'play'){
    if (key == ' '){
      isPaused = !isPaused;
    }
  }
}

//type="module"の場合は以下が必要　
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;