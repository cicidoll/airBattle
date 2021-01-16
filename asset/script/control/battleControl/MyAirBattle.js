import config from '../../InitSetting/Config.js'
import AirObject from '../../Object/AirObject.js'
import myAirMove from '../MoveControl/myAirMove.js'

/**
 * 当我方战机生命值为0时，将其删除。
 * @param {Object} air 我方战机对象
 */
function DelMyAir(myAir) {
  if (myAir.life <= 0) {
    try {
      config.myAirFather.removeChild(myAir.air)
      // 战机置空
      return null
    } catch (error) {}
  }
}

/**
 * 我方战机流程控制
 * 初始化我方战机
 * @param {Number} life 战机生命值
 * @param {list} list 战机存储列表
 */
function myAirStart(life, list) {
  // 初始化游戏各类参数
  // 创建我方战机，生命值为myAirLife
  let myAirObject = new AirObject.myAirObject(life, list)
  // 执行对象具体行为
  // 启动我方战机移动控制总线
  myAirMove.myAirMoveBus()
  return myAirObject
}

export default {
  myAirStart,
  DelMyAir
}