import config from './Config.js'
import DefaultMethods from '../InitSetting/DefaultMethods.js'

/**
 * 游戏具体参数设置：
 * 敌我战机、子弹参数
 */
class GameModeConfig {
  constructor () {
    // 我方战机生命值
    this.myAirLife = 3
    //生成敌机大小
    this.enemyAirSize = {}
    // 敌方战机子弹攻击力
    this.enemyAirBulletAttack
    // 我方战机射击子弹速率，次数/秒
    this.myAirBulletSpeed = 4
    // 敌方战机射击子弹速率，次数/秒
    this.enemyAirBulletSpeed = 2
    // 敌方战机生成数量
    this.enemyAirNumber
    // 敌方战机生命值
    this.enemyAirLife
    // 设置我方子弹移动速度，默认为4s。
    this.myAirBulletMoveTime = 4
    // 设置敌方子弹移动速度
    this.enemyAirBulletMoveTime
    // 敌方战机移动动画时间
    this.enemyAirMoveTime
    // 设置我方子弹型号选择，默认为0
    this.myAirBulletSizeSelect = 0
    // 设置敌方子弹型号选择，默认为0
    this.enemyAirBulletSizeSelect = 0
    // 敌机生成的随机最大高度
    this.enemyAirMaxTop
    // 敌机生成的随机最大宽度
    this.enemyAirMaxLeft
    this.gameModeSet(5)
    }

  /**
   * 当前公式仅作代码测试用途，
   * 正式发布前，请认真考虑游戏强度并将其修改
   * write by 2021/1/13
   * @param {Number} value 机体综合强度值，值越大，强度越高 
   */
  gameModeSet(value) {
    //1.0版本：使用倍数决定具体参数之间的关联.
    // 以敌机高度参数为基准
    const ratio = DefaultMethods.unitConversion(
      DefaultMethods.getRndInteger(value, 8 * value) + 'vw')
    this.enemyAirSize = { height: ratio , 
                          width: ratio/3}
    // 攻击力，幂函数曲线,取整数
    this.enemyAirBulletAttack = Math.floor(Math.pow(ratio, 1/2))
    // 随机子弹大小
    this.enemyAirBulletSizeSelect = DefaultMethods.getRndInteger(0, config.bulletSize.length -1)
    // 
    this.enemyAirNumber = Math.floor(this.enemyAirBulletAttack * 5 / value) + 1
    this.enemyAirLife = Math.floor(16/this.enemyAirNumber) + 1
    this.enemyAirBulletMoveTime = Math.floor(5 / (this.enemyAirBulletSizeSelect + 1)) + 2
    this.enemyAirMoveTime = Math.floor(16/this.enemyAirNumber) + 1

    this.enemyAirMaxTop = Math.floor(0.3 * config.windowHeight - this.enemyAirSize.height) + 1
    this.enemyAirMaxLeft = Math.floor(1 * config.windowWidth - this.enemyAirSize.width) + 1
  }
}

export default GameModeConfig
