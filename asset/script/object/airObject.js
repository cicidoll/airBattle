/**
 * 战机的原型对象
 */
class Air {
  constructor(life,size){
    this.life = life//生命值
    this.size = size//机体大小
    this.air = {}
    this.position = {}
  }
  /**
   * @param {String} label 定义生成节点的标签名
   */
  creatDom(label){
    //生成HTML节点,定义高度、宽度
    this.air = document.createElement(label)
    this.air.style.cssText += `height:${this.size.height}px;width:${this.size.width}px;`
  }

  /**
   * @param {String} className 定义需要添加的类名
   */
  addClassN (className){
    this.air.classList.add(className)
  }

  /**
   * @param {String} ElementID 定义需要添加的ID名 
   */
  addElementID(ElementID){
    this.air.setAttribute('id',ElementID)
  }

  /**
   * @param {Object} fatherElement DOM节点对象，定义节点的父节点，并将其添加进DOM树中。
   */
  addFatherDom(fatherElement){
    //将节点插入DOM树中
    fatherElement.appendChild(this.air)
  }
}

/**
 * 由Air对象继承，新的敌机对象
 */
class enemyAirObject extends Air {
  constructor(life){
    super( life , { height: enemyAirSize.height,
                    width: enemyAirSize.width } )
    //参数初始化                
    this.creatDom('div')
    this.addClassN('enemyAir')
    this.addFatherDom(enemyAirFather)
    this.addPosition()
    //添加进敌机列表
    enemyAirList.push(this)
    this.airMove()//初次移动
  }
  /**
   * 添加战机随机移动动画
   */
  airMove(){
    let position = this.position
    let newtop = getRndInteger( 
      -position.top, enemyAirMaxTop - position.top)
    let newLeft = getRndInteger( 
      -position.left, enemyAirMaxLeft - position.left)
    this.air.style.cssText += `transition:all ${enemyAirMoveTime}s ease 0s` 
                           += `transform: translate(${newLeft}px,${newtop}px)`
  }

  addPosition(){
    let top = getRndInteger(0, enemyAirMaxTop)
    let left = getRndInteger(0, enemyAirMaxLeft)
    this.position = { top:top, left:left }
    this.air.style.cssText += `top:${top}px; left:${left}px;`
  }
}

/**
 * 由Air对象继承，新的我方战机对象
 */
class myAirObject extends Air {
  constructor(life){
    super( life, {  height: myAirSize.height, 
                    width: myAirSize.width } )
    this.creatDom('div')
    this.addElementID('myAir')
    this.addFatherDom(myAirFather)
    myAirList.push(this)
  }
}