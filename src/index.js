import Phaser from "phaser";
import pixel from "../assets/16x16.png";
import backgroundImg from "../assets/back_five_dogs.jpg";
import dogImg from "../assets/doggy.png";
import charImg from "../assets/char.png";
import logoImg from "../assets/logo.png";
import circleImg1 from "../assets/circle_1.png";
import circleImg2 from "../assets/circle_2.png";
import circleImg3 from "../assets/circle_3.png";
import circleImg4 from "../assets/circle_4.png";
import circleImg5 from "../assets/circle_5.png";
import circleImg6 from "../assets/circle_6.png";
import circleImg7 from "../assets/circle_7.png";
import circleImg8 from "../assets/circle_8.png";
import circleImg from "../assets/circle.png";
import btnImg from "../assets/btn.png";

const gameConfig = {
  orientation: null,
  dogsTotalCount: 5,
  dog0: {
    "0": {x: 430, y: 200, scaleX: 1, scaleY: 1},
    "1": {x: 180, y: 180, scaleX: 1, scaleY: 1}
  },
  dog1: {
    "0": {x: -300, y: 225, scaleX: 1, scaleY: 1},
    "1": {x: -20, y: 70, scaleX: 0.8, scaleY: 0.8}
  },
  dog2: {
    "0": {x: -370, y: -120, scaleX: -0.75, scaleY: 0.75},
    "1": {x: -30, y: -165, scaleX: -0.6, scaleY: 0.6}
  },
  dog3: {
    "0": {x: 10, y: -60, scaleX: -0.75, scaleY: 0.75},
    "1": {x: 170, y: 0, scaleX: 0.55, scaleY: 0.55}
  },
  dog4: {
    "0": {x: 410, y: -133, scaleX: 0.75, scaleY: 0.75},
    "1": {x: 270, y: -140, scaleX: 0.55, scaleY: 0.55}
  },
  introText: {
    "0": {x: -400, y: -70, scaleX: 1.5, scaleY: 1.5},
    "1": {x: -187, y: -50, scaleX: 0.7, scaleY: 0.7}
  },
  introDog: {
    "0": {x: 260, y: -70, scaleX: 1.5, scaleY: 1.5},
    "1": {x: 117, y: -50, scaleX: 0.7, scaleY: 0.7}
  },
  outroLady: {
    "0": {x: -460, y: 0, scaleX: 1, scaleY: 1},
    "1": {x: 0, y: 20, scaleX: -0.55, scaleY: 0.55}
  },
  outroLogo: {
    "0": {x: 0, y: -240, scaleX: 1.2, scaleY: 1.2},
    "1": {x: 0, y: -300, scaleX: 0.7, scaleY: 0.7}
  },
  outroTitleText: {
    "0": {x: -260, y: -120, scaleX: 1, scaleY: 1},
    "1": {x: -205, y: -20, scaleX: 0.75, scaleY: 0.75}
  },
  outroText: {
    "0": {x: -230, y: 50, scaleX: 1, scaleY: 1},
    "1": {x: -187, y: 90, scaleX: 0.7, scaleY: 0.7}
  },
  btnPlayNow: {
    "0": {x: 0, y: 340, scaleX: 1.25, scaleY: 1.25},
    "1": {x: 0, y: 340, scaleX: 1.1, scaleY: 1.1}
  }
};
const bgSize = {};
const outroSize = {};

let onChangeOrientationActive = false;
const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
      mode: Phaser.Scale.RESIZE,
      parent: 'phaser-example',
      width: '100%',
      height: '100%'
  },
  scene: {
      preload: preload,
      create: create
  }
};
const game = new Phaser.Game(config);

function preload() {
  this.load.image("pixel", pixel);
  this.load.image("backgroundImg", backgroundImg);
  this.load.image("dog", dogImg);
  this.load.image("outroLady", charImg);
  this.load.image("outroLogo", logoImg);

  this.load.image('circle1', circleImg1);
  this.load.image('circle2', circleImg2);
  this.load.image('circle3', circleImg3);
  this.load.image('circle4', circleImg4);
  this.load.image('circle5', circleImg5);
  this.load.image('circle6', circleImg6);
  this.load.image('circle7', circleImg7);
  this.load.image('circle8', circleImg8);
  this.load.image('circle', circleImg);
  this.load.image('btnPlayNow', btnImg);
}

function create() {
  game.scale.resize(window.innerWidth, window.innerHeight);
  let backgroundImg = this.add.image(0, 0, "backgroundImg");

  //======== circle animation =============
  game.anims.create({
    key: 'circleAnim',
    frames: [
        { key: 'circle1', frame: null },
        { key: 'circle2', frame: null },
        { key: 'circle3', frame: null },
        { key: 'circle4', frame: null },
        { key: 'circle5', frame: null },
        { key: 'circle6', frame: null },
        { key: 'circle7', frame: null },
        { key: 'circle8', frame: null },
        { key: 'circle', frame: null, duration: 50 }
    ],
    frameRate: 24,
    repeat: 0
  });
  let currentDogIndex = 0;
  let dogsIterator = 0;
  let circleAnim = this.add.sprite(0, 0, 'circle').on('animationcomplete', ()=>{
    circles[currentDogIndex].visible = true;
    circleAnim.visible = false;
    dogsIterator++;
    if(dogsIterator === gameConfig.dogsTotalCount){
      outroTween.play();
      buttonTween.play();
    }
    circleAnim.isPlaying = false;
  }, this);
  // ============ adding dogs & circles here ==========
  let dogs = new Array();
  let circles = new Array();
  for( let i = 0; i < gameConfig.dogsTotalCount; i++){
    let circle = this.add.image(0, 0, "circle8");
    circle.name = "dog"+i;
    circle.visible = false;
    circles.push(circle);
    let dog = this.add.image(0, 0, "dog");
    dog.name = "dog"+i;
    dog.on('pointerup', function (pointer) {
      if(circleAnim.isPlaying) return;
      dogs[i].removeInteractive();
      currentDogIndex = i;
      circles[i].setPosition(gameConfig["dog"+i][gameConfig.orientation].x, gameConfig["dog"+i][gameConfig.orientation].y);
      circleAnim.setPosition(gameConfig["dog"+i][gameConfig.orientation].x, gameConfig["dog"+i][gameConfig.orientation].y);
      circleAnim.setScale(gameConfig["dog"+i][gameConfig.orientation].scaleX, gameConfig["dog"+i][gameConfig.orientation].scaleY);
      circleAnim.visible = true;
      circleAnim.play('circleAnim');
      circleAnim.isPlaying = true;
    });
    dogs.push(dog);
  }
  circleAnim.visible = false;

  let container = this.add.container(backgroundImg.displayWidth/2, backgroundImg.displayHeight/2, 
    [ backgroundImg, dogs[0], dogs[1], dogs[2], dogs[3], dogs[4],
      circleAnim, circles[0], circles[1], circles[2], circles[3], circles[4]]);
  bgSize.width = container.getBounds().width;
  bgSize.height = container.getBounds().height;

  this.scale.on('resize', resizeBackground, container);
  resizeBackground.call(container);

  let graphics = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 1} });
  
  // ========= outro =======
  let outroLogo = this.add.image(0, 0, "outroLogo");
  outroLogo.name = "outroLogo";
  let outroLady = this.add.image(0, 0, "outroLady");
  outroLady.name = "outroLady";

  let outroPixel = this.add.image(0, 220, "pixel");
  outroPixel.setScale(30, 6.3);
  
  let outroTitleText = this.add.text(200, 0, 'Great Job', { font: "bold 116px Arial", align:'center'});
  outroTitleText.name = "outroTitleText";
  outroTitleText.setTint(0xffd480, 0xffd480, 0xffb31a, 0xffb31a);

  let outroText = this.add.text(0, 0, 'Can you solve\nevery mystery?', { font: "bold 72px Arial", fill: "#fff", align:'center'});
  outroText.name = "outroText";
  
  let outroContainer = this.add.container(backgroundImg.displayWidth/2, backgroundImg.displayHeight/2,
    [outroLogo, outroLady, outroTitleText, outroPixel, outroText]);
    outroContainer.setAlpha(0);

  outroSize.width = outroContainer.getBounds().width;
  outroSize.height = outroContainer.getBounds().height;
  
  this.scale.on('resize', outroResize, outroContainer);
  outroResize.call(outroContainer);

  let outroTween = this.tweens.add({
    targets: [graphics, outroContainer],
    paused: true,
    duration: 300,
    delay: 0,
    alpha: 1,
    repeat: 0
  });
  // ============ intro ============
  let rect = new Phaser.Geom.Rectangle(0, 0, 3000, 3000);
  
  graphics.fillRectShape(rect);
  let introText = this.add.text(0, 0, '5 Hidden Dogs\n Can you spot them?', { font: "bold 54px Arial", fill: "#fff"});
  introText.name = "introText";
  let introDog = this.add.image(0, 0, "dog");
  introDog.name = "introDog";
  this.tweens.add({
    targets: [graphics, introText, introDog],
    duration: 1000,
    delay: 2000,
    alpha: 0,
    repeat: 0,
    onComplete: ()=>{
      for( let i = 0; i < gameConfig.dogsTotalCount; i++){
        dogs[i].setInteractive()
      }
    }
  });
  
  let introContainer = this.add.container(backgroundImg.displayWidth/2, backgroundImg.displayHeight/2, [ introText, introDog ]);
  this.scale.on('resize', outroResize, introContainer);
  outroResize.call(introContainer);

  //============== Button =========
  let btnPlayNow = this.add.image(0, 0, "btnPlayNow").setInteractive();
  btnPlayNow.name = "btnPlayNow";

  let btnPlayNowText = this.add.text(0, 0, 'Play Now', { font: "bold 48px Arial", fill: "#eeee99",}).setOrigin(0.5, 0.5);
  btnPlayNowText.name = "btnPlayNow";
  let btnContainer = this.add.container(backgroundImg.displayWidth/2, backgroundImg.displayHeight/2,
    [btnPlayNow, btnPlayNowText]);

  this.scale.on('resize', outroResize, btnContainer);
  outroResize.call(btnContainer);
  const buttonTween = this.tweens.add({
    targets: [btnPlayNow, btnPlayNowText],
    duration: 700,
    paused: true,
    scaleX: 1.15,
    scaleY: 1.15,
    repeat: -1,
    yoyo: true
  });
  btnPlayNow.on('pointerup', ()=>{
      window.open("https://www.g5e.com/");
    });
}

/// ======= magic happens here =========
function onChangeOrientation(rebuildObjectsArray){
  rebuildObjectsArray.map((asset) => {
    if(typeof gameConfig[asset.name] == 'undefined') return;
    if(typeof gameConfig[asset.name][gameConfig.orientation].x != 'undefined' 
          && typeof gameConfig[asset.name][gameConfig.orientation].x != 'undefined'){
            asset.setPosition(gameConfig[asset.name][gameConfig.orientation].x, gameConfig[asset.name][gameConfig.orientation].y);
          }
    if(typeof gameConfig[asset.name][gameConfig.orientation].scaleX != 'undefined'
        && typeof gameConfig[asset.name][gameConfig.orientation].scaleY != 'undefined'){
      asset.setScale(gameConfig[asset.name][gameConfig.orientation].scaleX, gameConfig[asset.name][gameConfig.orientation].scaleY);
    }
  });

}
function outroResize()
{
  let ratioH = window.innerHeight / outroSize.height;
  if(onChangeOrientationActive){
    onChangeOrientation(this.list);
  }
  this.scaleX = ratioH;
  this.scaleY = ratioH;
  this.x = window.innerWidth / 2;
  this.y = window.innerHeight / 2;
}

function resizeBackground()
{
  let ratioW = window.innerWidth / bgSize.width;
  let ratioH = window.innerHeight / bgSize.height;
  let currentOrientation = window.innerHeight < window.innerWidth ? "0" : "1";
  if(gameConfig.orientation !== currentOrientation){
    gameConfig.orientation = currentOrientation;
    onChangeOrientationActive = true;
    onChangeOrientation(this.list);
  }
  if(ratioW >= ratioH){

    this.scaleX = ratioW;
    this.scaleY = ratioW;
  }
  else{
    this.scaleX = ratioH;
    this.scaleY = ratioH;
    
  }
  this.x = window.innerWidth / 2;
  this.y = window.innerHeight / 2;
  if(ratioH > 1.5 )this.x -= 180;
}

