/**
 * 我方战机移动-总线函数
 * diffX、diffY，指代的是触摸点与我方战机所代表的正方体左上顶点的相对距离，
 * 即触摸点的坐标减去左上顶点的坐标。
 */
function myAirMoveBus(){
  // 记录初次点击的坐标值
  let diffX, diffY
  // 我方战机移动Touch事件监听
  const dom = document.getElementById('myAir')
  dom.addEventListener('touchstart',touch, false)
  dom.addEventListener('touchmove',touch, false)

  function touch(event) {
    const ElementTopLeft
    // 定义需要移动的元素ID
    const elementID = 'myAir'
    // 触摸事件分支器
    switch (event.type) {
      case 'touchstart':
        /* 获取元素，计算元素top和left的像素 */
        const element = document.getElementById(elementID)
        ElementTopLeft = calculationElementTopLeft(element)

        diffY = event.touches[0].clientY - ElementTopLeft[0]
        diffX = event.touches[0].clientX - ElementTopLeft[1]
        break;
      case 'touchmove':
        defaultTouchMove(event,elementID,diffX,diffY)
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
  const ElementMidPoint = calculationElementMid(element)

  /* 定义touch事件移动函数 */
  let top = elementStyle.top =  event.touches[0].clientY - diffY + 'px'
  let left = elementStyle.left = event.touches[0].clientX - diffX + 'px'

  /*控制元素移动不超越边界 */
  const topNum = Number(top.substring(0, top.length - 2 ) )
  const leftNum = Number(left.substring(0, left.length - 2 ) )
  if ( topNum < 0 ){
    top = '0px'
  } else if ( topNum > ( windowHeight - ElementMidPoint[1]*2 ) ) {
    top = windowHeight - ElementMidPoint[1]*2 + 'px';
  }
  if ( leftNum < 0 ) {
    left = '0px'
  } else if ( leftNum > (windowWidth - ElementMidPoint[0]*2) ) {
    left = windowWidth - ElementMidPoint[0]*2 + 'px'
  }
}


/**
 * 获取元素宽高，计算元素中心点
 * @param {Object} element 需要计算的DOM节点
 * @returns {Array} [widthpx/2,heightpx/2] 元素中点坐标
 */
function calculationElementMid(element) {
  const style = element.style
  const height = style.height
  const width = style.width
  // 统一将其转化为Number类型、以px为单位的数组。
  // 计算高度像素
  const heightpx = unitConversion(height)
  // 计算宽度像素
  const widthpx = unitConversion(width)
  // 元素中点坐标
  return [widthpx/2,heightpx/2]
}

/**
 * 获取元素，计算元素top和left的像素
 * @param {Object} element 需要计算的DOM节点
 * @returns {Array} [toppx,leftpx]
 */
function calculationElementTopLeft(element) {
  const Win = window.getComputedStyle(element,null)
  const top = Win.top
  const left = Win.left
  //统一将其转化为Number类型、以px为单位的数组。
  // 计算top像素
  const toppx = unitConversion(top)
  // 计算left像素
  const leftpx = unitConversion(left)
  return [toppx, leftpx]
}