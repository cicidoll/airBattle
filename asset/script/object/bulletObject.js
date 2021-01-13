class Bullet {
  constructor(size, attack = 3, position={} ){
    this.size = size// 子弹模型的大小，以px为单位
    this.attack = attack// 子弹的威力，默认为3
    this.bullet = {}// 存放生成的DOM节点对象
    this.position = position// 默认生成的初始位置
  }
  /**
   * @param {String} label 定义生成节点的标签名
   */
  creatDom (label) {
    // 生成HTML节点,定义高度、宽度
    this.bullet = document.createElement(label)
    this.bullet.style.cssText += `height:${this.size.height}px;
                                  width:${this.size.width}px;`
  }

  /**
   * @param {String} className 定义需要添加的类名
   */
  addClassN (className) {
    this.bullet.classList.add(className)
  }

  /**
   * @param {String} ElementID 定义需要添加的ID名 
   */
  addElementID (ElementID) {
    this.bullet.setAttribute('id',ElementID)
  }

  /**
   * @param {Object} fatherElement DOM节点对象，定义节点的父节点，并将其添加进DOM树中。
   */
  addFatherDom (fatherElement) {
    // 将节点插入DOM树中
    fatherElement.appendChild(this.bullet)
  }

  addPosition () {
    this.bullet.style.cssText += `top:${this.position.top}px;
                                  left:${this.position.left}px;`
  }
}

export default {
  Bullet
}