import config from '../initSetting/Config.js'

/**
 * 战机的原型对象
 */
class Air {
  /**
   * 
   * @param {Number} life 生命值
   * @param {Object} size 机体大小
   */
  constructor(life, size) {
    this.life = life
    this.size = size
    this.air = {}
    this.position = {}
  }
  /**
   * @param {String} label 定义生成节点的标签名
   */
  creatDom (label) {
    // 生成HTML节点,定义高度、宽度
    this.air = document.createElement(label)
    this.air.style.cssText += `height:${this.size.height}px;
                               width:${this.size.width}px;`
  }

  /**
   * @param {String} className 定义需要添加的类名
   */
  addClassN (className) {
    this.air.classList.add(className)
  }

  /**
   * @param {String} ElementID 定义需要添加的ID名 
   */
  addElementID (ElementID) {
    this.air.setAttribute('id', ElementID)
  }

  /**
   * @param {Object} fatherElement DOM节点对象。
   * 定义节点的父节点，并将其添加进DOM树中。
   */
  addFatherDom (fatherElement) {
    //将节点插入DOM树中
    fatherElement.appendChild(this.air)
  }
}

/**
 * 由Air对象继承，新的敌机对象
 */
class enemyAirObject extends Air {
  /**
   * 
   * @param {Number} life 战机生命值
   * @param {Object} list 存放战机对象列表
   * @param {Number} enemyAirMaxTop 敌机生成的随机最大高度
   * @param {Number} enemyAirMaxLeft 敌机生成的随机最大宽度
   * @param {Number} enemyAirMoveTime 敌方战机移动动画时间
   */
  constructor (life, list, enemyAirMaxTop, enemyAirMaxLeft, enemyAirMoveTime) {
    super( life , { height: enemyAirSize.height,
                    width: enemyAirSize.width } )
    // 参数初始化
    this.enemyAirMaxTop = enemyAirMaxTop
    this.enemyAirMaxLeft = enemyAirMaxLeft
    this.enemyAirMoveTime = enemyAirMoveTime
    this.creatDom('div')
    this.addClassN('enemyAir')
    this.addFatherDom(config.enemyAirFather)
    this.addPosition()
    // 添加进敌机列表
    list.push(this)
    // 启动移动函数
    this.airMove()
  }
  /**
   * 添加战机随机移动动画
   * @param {Number} enemyAirMaxTop 敌机生成的随机最大高度
   * @param {Number} enemyAirMaxLeft 敌机生成的随机最大宽度
   * @param {Number} enemyAirMoveTime 敌方战机移动动画时间
   */
  airMove () {
    let position = this.position
    let newtop = getRndInteger( 
      -position.top, this.enemyAirMaxTop - position.top)
    let newLeft = getRndInteger( 
      -position.left, this.enemyAirMaxLeft - position.left)
    this.air.style.cssText += `transition:all ${this.enemyAirMoveTime}s ease 0s` 
                           += `transform: translate(${newLeft}px,${newtop}px)`
  }

  /**
   * 添加敌机坐标
   * @param {Number} enemyAirMaxTop 敌机生成的随机最大高度
   * @param {Number} enemyAirMaxLeft 敌机生成的随机最大宽度
   */
  addPosition () {
    let top = getRndInteger(0, this.enemyAirMaxTop)
    let left = getRndInteger(0, this.enemyAirMaxLeft)
    this.position = { top:top, left:left }
    this.air.style.cssText += `top:${top}px; 
                              left:${left}px;`
  }
}

/**
 * 由Air对象继承，新的我方战机对象
 */
class myAirObject extends Air {
  /**
   * @param {Number} life 战机生命值
   * @param {Object} list 存放战机对象列表
   */
  constructor(life, list) {
    super( life, {  height: config.myAirSize.height, 
                    width: config.myAirSize.width } )
    this.creatDom('div')
    this.addElementID(config.myAirId)
    this.addFatherDom(config.myAirFather)
    list.push(this)
  }
}

export default {
  enemyAirObject,
  myAirObject
}