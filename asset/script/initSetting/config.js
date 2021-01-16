const windowWidth = window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth
const windowHeight = window.innerHeight ||
                     document.documentElement.clientHeight ||
                     document.body.clientHeight

// 我方战机生成的默认大小
const myAirSize = { height: 0.15 * windowWidth, 
                    width: 0.15 * windowWidth }

// 生成敌机对象的DOM父节点ID
const enemyAirFatherID = 'newEnemyAirsArea'
// 生成战机对象的DOM父节点ID
const AirFatherID = 'battle'
// 生成我方战机对象节点ID
const myAirId = 'myAir'
// 生成敌机对象的DOM父节点
const enemyAirFather = document.getElementById(enemyAirFatherID)
// 生成我方战机对象的DOM父节点
const myAirFather = document.getElementById(AirFatherID)
// 生成战机子弹对象的DOM父节点
const bulletFather = document.getElementById(AirFatherID)

// 游戏刷新率
const fps = 60
// 设置关卡回合刷新时间
const roundTime = 6
// 设置子弹的大小，三种难度，由小到大。
const bulletSize = 
  [ { height:30, width:10 },
    { height:45, width:20 },
    { height:60, width:30 } ]

export default {
  windowWidth, windowHeight,
  myAirSize,
  enemyAirFatherID, AirFatherID,
  myAirId,
  enemyAirFather, myAirFather, bulletFather,
  fps, roundTime,
  bulletSize
}