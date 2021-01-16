import config from '../../InitSetting/Config.js'
import AirObject from '../../Object/AirObject.js'

/**
 * 批量创建敌机对象
 * @param {Number} airNum 需要生成的敌机对象数量
 * @param {Number} life 敌机的生命值
 */
function lotOfCreateEnemyAir(airNum, life, list, size, enemyAirMaxTop, enemyAirMaxLeft, enemyAirMoveTime) {
  // 使用立即执行函数封装
  ( () => {
    for(let i =0; i<airNum; i++) {
      new AirObject.enemyAirObject(life, list, size,
        enemyAirMaxTop, enemyAirMaxLeft, enemyAirMoveTime)
    }
  })()
}

/**
 * 敌机移动动画批量设置
 * @param {list} list 敌机存放列表
 */
function enemyAirListMove (list) {
  // 使用立即执行函数封装
  list.forEach( air => {
    air.airMove()
  })
}

/**
 * 负责遍历敌机List，将生命值Life为0的对象置空
 * @param {Object} air Dom节点，需要删除的战机对象节点
 * @param {Number} index Dom节点在enemyAirList列表中的索引（可以使用Foreach传入的index进行操作）
 */
function DelEnemyAir(air, index, list) {
  if (air.life <= 0) {
    config.enemyAirFather.removeChild(air.air)
    list.splice(index,1)
    // 战机对象置空
    air = null
  }
}

export default {
  lotOfCreateEnemyAir,
  enemyAirListMove,
  DelEnemyAir
}