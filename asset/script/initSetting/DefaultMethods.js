import config from './Config.js'

/**
 * 输入两个数字，返回包括min和包括max之间的一个随机数
 * @param {Number} min 
 * @param {Number} max 
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

/**
 * 动态设置DOM节点的高度
 * @param {Object} element 
 * @param {Number} height 
 */
function setHeight(element,height) {
  element.style.cssText += `height:${height}px;`
}

/**
 * 批量为DOM节点设置自适应高度
 */
function setHeightBus(){
  const height = config.windowHeight
  setHeight(document.getElementsByTagName('body')[0], height)
  setHeight(document.getElementById(config.AirFatherID), height)
  setHeight(document.getElementById(config.enemyAirFatherID), 0.3 * height)
}

/**
 * 目前支持对三种单位的元素大小进行计算，分别是vh、vw和px。
 *（当数值为0时，支持该情况）
 * 统一将其转化为Number类型
 * @param {String} string 需要转换的style字符串
 * @returns {Number} stringpx 以px为单位，具体的大小，并返回数字类型
 */
function unitConversion(string){
  let stringpx
  const stringNum = Number(string.substring(0,string.length-2))
  if ( string.includes('vw') ) {
    stringpx = stringNum / 100 * config.windowWidth
  } else if (string.includes('vh')) {
    stringpx = stringNum / 100 * config.windowHeight
  }else if ( string.includes('px') ) {
    stringpx = stringNum
  } else if ( string == '0' ){
    stringpx = 0
  }
  return stringpx
}

export default {
  getRndInteger,
  setHeightBus,
  unitConversion
}