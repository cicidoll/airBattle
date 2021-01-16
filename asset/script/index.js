import init from './init.js'
import gameModeConfig from './InitSetting/GameModeConfig.js'
import MyAirBattle from './Control/BattleControl/MyAirBattle.js'

// 我方战机对象
let myAir
// 我方方战机DOM节点
let myAirDom
// 我方战机对象列表
let myAirList = []
// 存放生成的敌机对象列表
let enemyAirList = []
// 存放生成的我方战机发射子弹
let myAirBulletList = []
// 存放生成的敌方战机发射子弹
let enemyAirBulletList = []
// 敌方战机子弹监听事件移除列表
let enemyAirBulletRemoveEventListenerList = []

  // 启动初始化函数
  init.initFunc()
  /*****************************************************************/
  // 新建游戏模式参数实例
  let GameModeConfig = new gameModeConfig()
  /*****************************************************************/
  //启动我方战机控制函数
  myAir = MyAirBattle.myAirStart(GameModeConfig.myAirLife, myAirList)
  myAirDom = myAir.air

//主线程
// window.onload = () => {
//   /*****************************************************************/
//   // 启动初始化函数
//   init.initFunc()
//   /*****************************************************************/
//   // 新建游戏模式参数实例
//   let GameModeConfig = new gameModeConfig()
//   /*****************************************************************/
//   //启动我方战机控制函数
//   myAir = MyAirBattle.myAirStart(GameModeConfig.myAirLife, myAirList)
//   myAirDom = myAir.air
//   /*****************************************************************/
//   // timeBus：延时器、定时器总线控制
//   let timeBus
//   // 延时一帧的时间后启动timeBus总线
//   timeBus = setTimeout( () => {
//     /*****************************************************************/
//     //游戏初始化，首次创建敌方战机对象
//     // 批量创建敌机对象，创建5个，生命值为3
//     lotOfCreateEnemyAir(enemyAirNumber,enemyAirLife)
//     // 敌方战机移动延时器1
//     let enemyAirMoveTimeOut1
//     enemyAirMoveTimeOut1 = setTimeout( () => {
//       // 敌机移动函数
//       enemyAirListMove()
//       clearTimeout(enemyAirMoveTimeOut1)
//       enemyAirMoveTimeOut1 = null
//       // 第二帧的时候开始添加敌方战机移动动画
//     }, 1000/fps)
//     /*****************************************************************/
//     // 我方战机子弹定时器
//     let myAirBulletTime
//     // 批量创建敌机对象定时器
//     let enemyAirTimeSetInterval
//     // 敌方战机子弹定时器
//     let enemyAirBulletTime
//     // 敌方战机移动逻辑延时器
//     let enemyAirMoveTimeOut2
//     // 定时器总线控制
//     let setIntervalBus
//     let clearTempListTimeOut
//     // 第二帧开始，负责每一帧执行循环的定时器总线
//     setIntervalBus = setInterval( () => {
//       /*****************************************************************/
//       // 批量创建敌机对象
//       // 当定时器不存在时，创建一个新的定时器
//       if (!enemyAirTimeSetInterval) {
//         enemyAirTimeSetInterval = setInterval( () => {
//           //批量创建敌机对象，创建enemyAirNumber个，生命值为enemyAirLife
//           lotOfCreateEnemyAir(enemyAirNumber,enemyAirLife)
//           clearInterval(enemyAirTimeSetInterval)
//           enemyAirTimeSetInterval = null
//         }, roundTime*1000)
//       }

//       if (!enemyAirMoveTimeOut2){
//         // 敌方战机移动逻辑延时器
//         enemyAirMoveTimeOut2 = setTimeout(() => {
//           enemyAirListMove()
//           clearTimeout(enemyAirMoveTimeOut2)
//           enemyAirMoveTimeOut2 = null
//           // 延时一帧启动敌机移动动画
//         }, enemyAirMoveTime*1000+1000/fps)
//       }
//       /*****************************************************************/
//       // 敌方战机子弹定时器
//       // 当定时器不存在时，创建一个新的定时器
//       if (!enemyAirBulletTime){
//         // let enemyAirBulletTimeOut = Symbol();//子弹移动延时器
//         // 生成的敌方子弹对象
//         let enemyAirBullet
//         //敌方战机子弹生成定时器
//         enemyAirBulletTime = setInterval( () => {
//           /*****************************************************************/
//           let enemyAirForeach;
//           enemyAirForeach = enemyAirList.forEach(enemyAir =>{
//             enemyAirBullet = BulletPushList(enemyAir.air,isMy=false,bulletAttack = enemyAirBulletAttack);//开始创建子弹对象
//             /*****************************************************************/
//             //定义子弹节点添加动画结束后的节点删除事件
//             function transitionend() {
//               try {bulletFather.removeChild(enemyAirBullet.bullet)} catch (error) {};        
//             }

//             let bulletAddEventListener;
//             bulletAddEventListener = enemyAirBullet.bullet.addEventListener('transitionend',transitionend)
//             bulletAddEventListener = null

//             let bulletRemoveEventListener = Symbol()
//             bulletRemoveEventListener = setTimeout( () =>{
//               // 移除监听事件
//               enemyAirBullet.bullet.removeEventListener('transitionend',transitionend)
//               // 当子弹移动动画时长结束，3帧后移除监听事件
//             }, enemyAirBulletMoveTime*1000+3000/fps)
//             enemyAirBulletRemoveEventListenerList.push(bulletRemoveEventListener)
//             /*****************************************************************/
//           })
//           enemyAirForeach = null
//           /*****************************************************************/
//           // 创建敌方战机子弹移动延时器，延时3帧启动
//           let airBulletMoveTimeout
//           if (!airBulletMoveTimeout) {
//             airBulletMoveTimeout = setTimeout( () => {
//               enemyAirBulletList.forEach( bullet=>{
//                 airBulletMove(bullet,isMy=false)
//                 clearTimeout(airBulletMoveTimeout)
//                 airBulletMoveTimeout = null
//               })
//             },3000/fps)
//           }

//           // 创建临时列表清理延时器，清除监听事件已经结束的敌方子弹对象列表
//           if (!clearTempListTimeOut) {
//             clearTempListTimeOut = setTimeout( () =>{
//               enemyAirBulletRemoveEventListenerList.forEach( (obj,index) =>{
//                 clearTimeout(obj)
//                 obj = null
//                 enemyAirBulletRemoveEventListenerList.splice(index,1)
//               })
//               clearTimeout(clearTempListTimeOut)
//               clearTempListTimeOut = null
//             }, enemyAirBulletMoveTime*1000*2)
//           }
//           clearInterval(enemyAirBulletTime)
//           enemyAirBulletTime = null
//         }, 1000/enemyAirBulletSpeed)
//       }
//       /*****************************************************************/
//       //敌方战机子弹列表遍历延时器

//       /*****************************************************************/
//       //开启敌方子弹与我方战机对象碰撞检测函数
//       let calculationmyBulletAndEnemyAirInterval = setTimeout( () => {
//         let result
//         result = throttle( () => {
//           calculationBulletAndAir(enemyAirBulletList,myAirList,bulletFather)
//           // 遍历敌方子弹对象列表
//           myAir.air.innerHTML = myAir.life
//           // DelMyAir(myAir);
//           // 每3帧执行一次
//         },1000/fps*3)()
//         result = null
//         clearTimeout(calculationmyBulletAndEnemyAirInterval)
//         calculationmyBulletAndEnemyAirInterval = null
//         // 每一帧执行一次
//       },1000/fps)
//       /*****************************************************************/
//       //我方战机子弹定时器
//       if (!myAirBulletTime) {
//         // 子弹移动延时器
//         let myBulletMoveTime
//         let myBullet
//         // 我方战机子弹生成定时器
//         myAirBulletTime = setInterval( () => {
//           // 开始创建子弹对象
//           myBullet = BulletPushList(myAirDom,isMy=true,bulletAttack=3)

//           //为子弹节点添加动画结束后的节点删除事件
//           function transitionend() {
//               try {bulletFather.removeChild(myBullet.bullet)} catch (error) {}
//           }

//           let bulletAddEventListener
//           bulletAddEventListener = myBullet.bullet.addEventListener('transitionend',transitionend)
//           let bulletRemoveEventListener = setTimeout( () => {
//             myBullet.bullet.removeEventListener('transitionend',transitionend)
//             clearTimeout(bulletRemoveEventListener)
//             bulletRemoveEventListener = null
//           }, myAirBulletMoveTime*1000)
//           bulletAddEventListener = null
          

//           // 子弹移动延时器
//           if (!myBulletMoveTime) {
//             myBulletMoveTime = setTimeout( () => {
//               airBulletMove(myBullet, isMy=true)
//               clearTimeout(myBulletMoveTime)
//               myBulletMoveTime = null
//               // 第二帧开始让子弹移动
//             }, 1000/fps)
//           }

//           clearInterval(myAirBulletTime)
//           myAirBulletTime = null
//         },1000/myAirBulletSpeed)
//       }
//       /*****************************************************************/

//       //开启我方子弹与敌方战机对象碰撞检测函数
//       let calculationBulletAndAirInterval
//       calculationBulletAndAirInterval = setTimeout( () => {
//         let result
//         result = throttle( () => {
//           calculationBulletAndAir(myAirBulletList, enemyAirList, bulletFather)
//           let enemyAirListForEach
//           enemyAirListForEach = enemyAirList.forEach( (air, index) => {
//             // 启动删除生命值为0的敌机函数
//             DelEnemyAir(air,index)
//           })
//           enemyAirListForEach = null
//           // 每两帧执行一次
//         },1000/fps*2)()
//         result = null
//         clearTimeout(calculationBulletAndAirInterval)
//         calculationBulletAndAirInterval = null
//         // 每一帧执行一次
//       },1000/fps)
//       /*****************************************************************/
//       setIntervalBus = null
//       // 第二帧开始，执行每帧刷新
//     }, 1000/fps)
//     clearTimeout(timeBus)
//     timeBus = null
//   }, 1000/fps)
// }