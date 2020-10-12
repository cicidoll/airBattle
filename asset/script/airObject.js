/**
 * 战机的原型对象
 */
class Air {
    constructor(life,size){
        this.life = life;//生命值
        this.size = size;//机体大小
        this.air = {};
        this.position = {};
    }
    /**
     * @param {String} label 定义生成节点的标签名
     */
    creatDom(label){
        //生成HTML节点,定义高度、宽度
        this.air = document.createElement(label);
        this.air.style.cssText += `height:${this.size.height}px;width:${this.size.width}px;`;
    }

    /**
     * @param {String} className 定义需要添加的类名
     */
    addClassN (className){
        this.air.classList.add(className);
    }

    /**
     * @param {String} ElementID 定义需要添加的ID名 
     */
    addElementID(ElementID){
        this.air.setAttribute('id',ElementID);
    }

    /**
     * @param {Object} fatherElement DOM节点对象，定义节点的父节点，并将其添加进DOM树中。
     */
    addFatherDom(fatherElement){
        //将节点插入DOM树中
        fatherElement.appendChild(this.air);        
    }
}