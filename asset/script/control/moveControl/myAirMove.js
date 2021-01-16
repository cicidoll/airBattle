import config from '../../InitSetting/Config.js'
import DefaultMethods from '../../InitSetting/DefaultMethods.js'
/**
 * 我方战机移动-总线函数
 * diffX、diffY，指代的是触摸点与我方战机所代表的正方体左上顶点的相对距离，
 * 即触摸点的坐标减去左上顶点的坐标。
 */
function myAirMoveBus() {
  // 记录初次点击的坐标值
  let diffX, diffY
  // 我方战机移动Touch事件监听
  const dom = document.getElementById(config.myAirId)
  dom.addEventListener('touchstart',touch, false)
  dom.addEventListener('touchmove',touch, false)

  function touch(event) {
    const ElementTopLeft
    // 触摸事件分支器
    switch (event.type) {
      case 'touchstart':
        /* 获取元素，计算元素top和left的像素 */
        const element = document.getElementById(config.myAirId)
        ElementTopLeft = DefaultMethods.calculationElementTopLeft(element)

        diffY = event.touches[0].clientY - ElementTopLeft[0]
        diffX = event.touches[0].clientX - ElementTopLeft[1]
        break;
      case 'touchmove':
        defaultTouchMove(event, config.myAirId, diffX, diffY)
        break
    }
  }
}

/**
 * 
 * @param {Object} event 
 * @param {String} elementID 需要移动的元素的ID
 * @param {Number} diffX 指代的是触摸点与我方战机所代表的正方体左上顶点的相对距离，即触摸点的坐标减去左上顶点的坐标。
 * @param {Number} diffY 同上
 */
function defaultTouchMove (event, elementID, diffX, diffY) {
  let elementStyle = document.getElementById(elementID).style
  /* 获取元素宽高，计算元素中心点 */
  const ElementMidPoint = DefaultMethods.calculationElementMid(element)

  /* 定义touch事件移动函数 */
  let top = elementStyle.top =  event.touches[0].clientY - diffY + 'px'
  let left = elementStyle.left = event.touches[0].clientX - diffX + 'px'

  /*控制元素移动不超越边界 */
  const topNum = Number(top.substring(0, top.length - 2) )
  const leftNum = Number(left.substring(0, left.length - 2) )
  if ( topNum < 0 ){
    top = '0px'
  } else if ( topNum > (windowHeight - ElementMidPoint[1]*2) ) {
    top = windowHeight - ElementMidPoint[1]*2 + 'px';
  }
  if ( leftNum < 0 ) {
    left = '0px'
  } else if ( leftNum > (windowWidth - ElementMidPoint[0]*2) ) {
    left = windowWidth - ElementMidPoint[0]*2 + 'px'
  }
}

export default {
  myAirMoveBus
}