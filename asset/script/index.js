import config from './InitSetting/Config.js'
import init from './init.js'
import gameModeConfig from './InitSetting/GameModeConfig.js'
import UnderScore from './InitSetting/UnderScore.js'
import MyAirBattle from './Control/BattleControl/MyAirBattle.js'
import EnemyAirBattle from './Control/BattleControl/EnemyAirBattle.js'
import BulletBattle from './Control/BattleControl/BulletBattle.js'

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
// 我方战机子弹监听事件移除列表
let myAirBulletRemoveEventListenerList = []

//主线程
window.onload = () => {
  /*****************************************************************/
  // 启动初始化函数
  init.initFunc()
  /*****************************************************************/
  // 新建游戏模式参数实例
  let GameModeConfig = new gameModeConfig()
  /*****************************************************************/
  //启动我方战机控制函数
  myAir = MyAirBattle.myAirStart(GameModeConfig.myAirLife, myAirList)
  myAirDom = myAir.air
  /*****************************************************************/
  // timeBus：延时器、定时器总线控制
  let timeBus
  // 延时一帧的时间后启动timeBus总线
  timeBus = setTimeout( () => {
    /*****************************************************************/
    //游戏初始化，首次创建敌方战机对象
    // 批量创建敌机对象，使用GameModeConfig中参数
    EnemyAirBattle.lotOfCreateEnemyAir( GameModeConfig.enemyAirNumber,
                                        GameModeConfig.enemyAirLife,
                                        enemyAirList,
                                        GameModeConfig.enemyAirSize,
                                        GameModeConfig.enemyAirMaxTop,
                                        GameModeConfig.enemyAirMaxLeft,
                                        GameModeConfig.enemyAirMoveTime)
    // 敌方战机移动延时器1
    let enemyAirMoveTimeOut1
    enemyAirMoveTimeOut1 = setTimeout( () => {
      // 敌机移动函数
      EnemyAirBattle.enemyAirListMove(enemyAirList)
      clearTimeout(enemyAirMoveTimeOut1)
      enemyAirMoveTimeOut1 = null
      // 第二帧的时候开始添加敌方战机移动动画
    }, 1000/config.fps)

    /*****************************************************************/
    // 我方战机子弹定时器
    let myAirBulletTime
    // 批量创建敌机对象定时器
    let enemyAirTimeSetInterval
    // 敌方战机子弹定时器
    let enemyAirBulletTime
    // 敌方战机移动逻辑延时器
    let enemyAirMoveTimeOut2
    // 定时器总线控制
    let setIntervalBus
    let clearTempEnemyListTimeOut
    let clearTempMyListTimeOut
    // 第二帧开始，负责每一帧执行循环的定时器总线
    setIntervalBus = setInterval( () => {
      /*****************************************************************/
      // 批量创建敌机对象
      // 当定时器不存在时，创建一个新的定时器
      if (!enemyAirTimeSetInterval) {
        enemyAirTimeSetInterval = setInterval( () => {
          // 批量创建敌机对象
          EnemyAirBattle.lotOfCreateEnemyAir( GameModeConfig.enemyAirNumber,
                                              GameModeConfig.enemyAirLife,
                                              enemyAirList,
                                              GameModeConfig.enemyAirSize,
                                              GameModeConfig.enemyAirMaxTop, 
                                              GameModeConfig.enemyAirMaxLeft,
                                              GameModeConfig.enemyAirMoveTime)
          clearInterval(enemyAirTimeSetInterval)
          enemyAirTimeSetInterval = null
        }, config.roundTime*1000)
      }

      if (!enemyAirMoveTimeOut2){
        // 敌方战机移动逻辑延时器
        enemyAirMoveTimeOut2 = setTimeout( () => {
          EnemyAirBattle.enemyAirListMove(enemyAirList)
          clearTimeout(enemyAirMoveTimeOut2)
          enemyAirMoveTimeOut2 = null
          // 延时一帧启动敌机移动动画
        }, GameModeConfig.enemyAirMoveTime*1000 + 1000/config.fps)
      }
      /*****************************************************************/
      // 敌方战机子弹定时器
      // 当定时器不存在时，创建一个新的定时器
      if (!enemyAirBulletTime) {
        // 生成的敌方子弹对象
        let enemyAirBullet
        //敌方战机子弹生成定时器
        enemyAirBulletTime = setInterval( () => {
          /*****************************************************************/
          enemyAirList.forEach( enemyAir => {
            // 开始创建子弹对象
            enemyAirBullet = BulletBattle.BulletPushList( enemyAir.air,
                                                          false,
                                                          GameModeConfig.enemyAirBulletAttack,
                                                          config.bulletSize,
                                                          GameModeConfig.enemyAirBulletSizeSelect,
                                                          enemyAirBulletList)
            /*****************************************************************/
            // 定义子弹节点添加动画结束后的节点删除事件
            function transitionend () {
              try {
                config.bulletFather.removeChild(enemyAirBullet.bullet)
              } catch (error) {}
            }

            enemyAirBullet.bullet.addEventListener('transitionend', transitionend)

            let bulletRemoveEventListener = Symbol()
            bulletRemoveEventListener = setTimeout( () => {
              // 移除监听事件
              enemyAirBullet.bullet.removeEventListener('transitionend', transitionend)
              clearTimeout(bulletRemoveEventListener)
              bulletRemoveEventListener = null
              // 当子弹移动动画时长结束，移除监听事件
            }, GameModeConfig.enemyAirBulletMoveTime*1000)
            enemyAirBulletRemoveEventListenerList.push(bulletRemoveEventListener)
            /*****************************************************************/
          })
          /*****************************************************************/
          // 创建敌方战机子弹移动延时器，延时3帧启动
          let airBulletMoveTimeout
          if (!airBulletMoveTimeout) {
            airBulletMoveTimeout = setTimeout( () => {
              enemyAirBulletList.forEach( bullet => {
                BulletBattle.airBulletMove( bullet, false,
                                            GameModeConfig.enemyAirBulletMoveTime, 
                                            config.windowHeight)
                clearTimeout(airBulletMoveTimeout)
                airBulletMoveTimeout = null
              })
            }, 3000/config.fps)
          }

          // 创建临时列表清理延时器，清除监听事件已经结束的敌方子弹对象列表
          if (!clearTempEnemyListTimeOut) {
            clearTempEnemyListTimeOut = setTimeout( () => {
              enemyAirBulletRemoveEventListenerList.forEach( (obj, index) => {
                clearTimeout(obj)
                enemyAirBulletRemoveEventListenerList[index] = null
                enemyAirBulletRemoveEventListenerList.splice(index, 1)
              })
              clearTimeout(clearTempEnemyListTimeOut)
              clearTempEnemyListTimeOut = null
            }, GameModeConfig.enemyAirBulletMoveTime * 1000 * 2)
          }
          clearInterval(enemyAirBulletTime)
          enemyAirBulletTime = null
        }, 1000 / GameModeConfig.enemyAirBulletSpeed)
      }
      /*****************************************************************/
      //敌方战机子弹列表遍历延时器
      /*****************************************************************/
      //开启敌方子弹与我方战机对象碰撞检测函数
      let calculationmyBulletAndEnemyAirInterval
      calculationmyBulletAndEnemyAirInterval = setTimeout( () => {
        UnderScore.throttle( () => {
          BulletBattle.calculationBulletAndAir( enemyAirBulletList,
                                                myAirList,
                                                config.bulletFather)
          // 遍历敌方子弹对象列表
          myAirDom.innerHTML = myAir.life
          // 每3帧执行一次
        }, 3000/config.fps)()
        clearTimeout(calculationmyBulletAndEnemyAirInterval)
        calculationmyBulletAndEnemyAirInterval = null
        // 每一帧执行一次
      }, 1000/config.fps)
      /*****************************************************************/
      //我方战机子弹定时器
      if (!myAirBulletTime) {
        // 生成的我方子弹对象
        let myBullet
        // 我方战机子弹生成定时器
        myAirBulletTime = setInterval( () => {
          /*****************************************************************/
          // 开始创建子弹对象
          myBullet = BulletBattle.BulletPushList(myAirDom,
                                                 true,
                                                 GameModeConfig.myAirBulletAttack,
                                                 config.bulletSize, 
                                                 GameModeConfig.myAirBulletSizeSelect,
                                                 myAirBulletList)

          // 为子弹节点添加动画结束后的节点删除事件
          function transitionend() {
            try {
              config.bulletFather.removeChild(myBullet.bullet)
            } catch (error) {}
          }

          myBullet.bullet.addEventListener('transitionend', transitionend)
          
          let myBulletRemoveEventListener = Symbol()
          myBulletRemoveEventListener = setTimeout( () => {
            // 移除监听事件
            myBullet.bullet.removeEventListener('transitionend', transitionend)
            clearTimeout(myBulletRemoveEventListener)
            myBulletRemoveEventListener = null
            // 当子弹移动动画时长结束，移除监听事件
          }, GameModeConfig.myAirBulletMoveTime * 1000)
          myAirBulletRemoveEventListenerList.push(myBulletRemoveEventListener)


          /*****************************************************************/
          // 子弹移动延时器
          let myBulletMoveTime
          if (!myBulletMoveTime) {
            myBulletMoveTime = setTimeout( () => {
              BulletBattle.airBulletMove( myBullet,
                                          true,
                                          GameModeConfig.myBulletMoveTime)
              clearTimeout(myBulletMoveTime)
              myBulletMoveTime = null
              // 第二帧开始让子弹移动
            }, 3000/config.fps)
          }

          // 创建临时列表清理延时器，清除监听事件已经结束的我方子弹对象列表
          if (!clearTempMyListTimeOut) {
            clearTempMyListTimeOut = setTimeout( () => {
              myAirBulletRemoveEventListenerList.forEach( (obj, index) => {
                clearTimeout(obj)
                myAirBulletRemoveEventListenerList[index] = null
                myAirBulletRemoveEventListenerList.splice(index, 1)
              })
              clearTimeout(clearTempMyListTimeOut)
              clearTempMyListTimeOut = null
            }, GameModeConfig.myAirBulletMoveTime * 1000 * 2)
          }
          clearInterval(myAirBulletTime)
          myAirBulletTime = null
        }, 1000 / GameModeConfig.myAirBulletSpeed)
      }
      /*****************************************************************/

      //开启我方子弹与敌方战机对象碰撞检测函数
      let calculationBulletAndAirInterval
      calculationBulletAndAirInterval = setTimeout( () => {
        UnderScore.throttle( () => {
          BulletBattle.calculationBulletAndAir( myAirBulletList,
                                                enemyAirList,
                                                config.bulletFather)
          enemyAirList.forEach( (air, index) => {
            // 启动删除生命值为0的敌机函数
            EnemyAirBattle.DelEnemyAir( air,
                                        index,
                                        enemyAirList)
          })
          // 每3帧执行一次
        }, 3000/config.fps)()
        clearTimeout(calculationBulletAndAirInterval)
        calculationBulletAndAirInterval = null
        // 每一帧执行一次
      }, 1000/config.fps)
      /*****************************************************************/
      setIntervalBus = null
      // 第二帧开始，执行每帧刷新
    }, 1000 / config.fps)
    clearTimeout(timeBus)
    timeBus = null
  }, 1000 / config.fps)
}