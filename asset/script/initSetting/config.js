const windowWidth = window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth
const windowHeight = window.innerHeight ||
                     document.documentElement.clientHeight ||
                     document.body.clientHeight

// 我方战机生成的默认大小
const myAirSize = { height: 0.15 * windowWidth, 
                    width: 0.15 * windowWidth }

// 生成敌机对象的DOM父节点
const enemyAirFather = document.getElementById('newEnemyAirsArea')
// 生成我方战机对象的DOM父节点
const myAirFather = document.getElementById('battle')
// 生成战机子弹对象的DOM父节点
const bulletFather = document.getElementById('battle')

// 我方战机生命值
let myAirLife = 3

//生成敌机大小
let enemyAirSize = {}

// 游戏刷新率
const fps = 60
// 设置关卡回合刷新时间
const roundTime = 6
// 我方战机射击子弹速率，次数/秒
let myAirBulletSpeed = 2
// 敌方战机射击子弹速率，次数/秒
let enemyAirBulletSpeed = 0.5

// 敌方战机生成数量
let enemyAirNumber
// 敌方战机生命值
let enemyAirLife
// 敌方战机子弹攻击力
let enemyAirBulletAttack

// 敌机生成的随机最大高度
let enemyAirMaxTop
// 敌机生成的随机最大宽度
let enemyAirMaxLeft
// 敌方战机移动动画时间
let enemyAirMoveTime

// 设置子弹的大小，三种难度，由小到大。
let bulletSize = [ { height:30, width:10 },
   { height:45, width:20 },
   { height:60, width:30 } ]

// 设置我方子弹型号选择，默认为0
let myAirBulletSizeSelect = 0
// 设置敌方子弹型号选择，默认为0
let enemyAirBulletSizeSelect = 0

// 设置我方子弹移动速度，默认为5s。
let myAirBulletMoveTime = 5
// 设置敌方子弹移动速度
let enemyAirBulletMoveTime

// 当前公式仅作代码测试用途，
// 正式发布前，请认真考虑游戏强度并将其修改
// write by 2021/1/13
function gameModeSet() {
  //1.0版本：使用倍数决定具体参数之间的关联.
  const value = unitConversion(getRndInteger(5, 40)+'vw')//以敌机高度参数为基准
  enemyAirSize = { height: value , 
                    width: value/3   }
  enemyAirBulletAttack = Math.pow(value,1/2)//攻击力，幂函数曲线
  enemyAirBulletSizeSelect = 1
  enemyAirNumber = 8
  enemyAirLife = 3
  enemyAirBulletMoveTime = 4
  enemyAirMoveTime = 3
}
gameModeSet()

export default {
  windowWidth, windowHeight,
  myAirSize, myAirLife,
  enemyAirSize,
  fps,
  roundTime,
  myAirBulletSpeed,
  enemyAirBulletSpeed, enemyAirNumber, enemyAirLife,
  enemyAirBulletAttack,
  enemyAirFather, myAirFather, bulletFather,
  enemyAirMaxTop,
  enemyAirMaxLeft,
  enemyAirMoveTime,
  bulletSize,
  myAirBulletSizeSelect,
  enemyAirBulletSizeSelect,
  myAirBulletMoveTime,
  enemyAirBulletMoveTime
}