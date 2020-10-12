/**
 * 我方战机移动-总线函数
 * diffX、diffY，指代的是触摸点与我方战机所代表的正方体左上顶点的相对距离，即触摸点的坐标减去左上顶点的坐标。
 */
function myAirMoveBus(){
    let diffX,diffY;//记录初次点击的坐标值    
    document.getElementById('myAir').addEventListener('touchstart',touch, false);//我方战机移动Touch事件监听
    document.getElementById('myAir').addEventListener('touchmove',touch, false);

    function touch(event) {
        let ElementTopLeft;
        let elementID = 'myAir';//定义需要移动的元素ID
        //触摸事件分支器
        switch (event.type) {
            case 'touchstart':
                /* 获取元素，计算元素top和left的像素 */
                let element = document.getElementById(elementID)
                ElementTopLeft = calculationElementTopLeft(element);

                diffY = event.touches[0].clientY - ElementTopLeft[0];
                diffX = event.touches[0].clientX - ElementTopLeft[1];
                break;
            case 'touchmove':
                defaultTouchMove(event,elementID,diffX,diffY);        
                break;
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
function defaultTouchMove (event,elementID,diffX,diffY){
    let element = document.getElementById(elementID);

    /* 获取元素宽高，计算元素中心点 */
    let ElementMidPoint = calculationElementMid(element);

    /* 定义touch事件移动函数 */

    element.style.top =  event.touches[0].clientY - diffY + 'px';
    element.style.left = event.touches[0].clientX - diffX + 'px';

    /*控制元素移动不超越边界 */
    if ( Number(element.style.top.substring(0,element.style.top.length - 2) ) < 0 ){
        element.style.top = '0px'
    } else if ( Number(element.style.top.substring(0,element.style.top.length - 2) ) > (windowHeight - ElementMidPoint[1]*2) ) {
        element.style.top = windowHeight - ElementMidPoint[1]*2 + 'px';
    };

    if ( Number(element.style.left.substring(0,element.style.left.length - 2)) < 0 ) {
        element.style.left = '0px'
    } else if ( Number(element.style.left.substring(0,element.style.left.length - 2) ) > (windowWidth - ElementMidPoint[0]*2) ) {
        element.style.left = windowWidth - ElementMidPoint[0]*2 + 'px'
    };
}


/**
 * 获取元素宽高，计算元素中心点
 * @param {Object} element 需要计算的DOM节点
 * @returns {Array} [widthpx/2,heightpx/2] 元素中点坐标
 */
function calculationElementMid(element) {
    let height = element.style.height;
    let width = element.style.width;
    //统一将其转化为Number类型、以px为单位的数组。
    let heightpx = unitConversion(height);//计算高度像素
    
    let widthpx = unitConversion(width);//计算宽度像素
    return [widthpx/2,heightpx/2];//元素中点坐标
}

/**
 * 获取元素，计算元素top和left的像素
 * @param {Object} element 需要计算的DOM节点
 * @returns {Array} [toppx,leftpx]
 */
function calculationElementTopLeft(element) {
    let top = window.getComputedStyle(element,null).top;
    let left = window.getComputedStyle(element,null).left;

    //统一将其转化为Number类型、以px为单位的数组。
    let toppx = unitConversion(top);//计算top像素
    let leftpx = unitConversion(left);//计算left像素

    return [toppx,leftpx];
}