//防抖
//事件响应函数在一段时间后才执行，如果在这段时间内再次调用，则重新计算执行时间；
//当预定时间内没有再次调用该函数，则执行。
//应用场景
//1、scroll事件滚动触发
//2、搜索输入框查询
//3、表单验证
//4、按钮提交事件
//5、浏览器窗口缩放，resize事件

/**
 * 
 * @param {function} func 需要执行的函数
 * @param {Number} wait 等待的时间
 * @param {boolean} immediate 设置是否立即执行。true:立即执行；false:不会立即执行
 * @method {cancel} 取消执行
 * @return {Object} 返回传入函数执行后的结果
 */
function debounce (func, wait, immediate) {
    let timeout, result;//timeout定时器，result为函数执行返回结果
    let debounced = function () {
        let args = arguments;//定义函数当前参数
        let context = this;//定义函数当前上下文
        if (timeout) clearTimeout(timeout);//当定时器存在，将其清除，重新计时。

        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(()=>{
                timeout = null;//将定时器置空
            },wait);
            //立即执行
            if (callNow) result = func.apply(context,args);
        } else {
            //不会立即执行
            timeout = setTimeout(() => {//箭头函数
                result = func.apply(context,args);
            },wait);
        }
        return result;
    };
    debounced.cancel = function (){
        clearTimeout(timeout);//清除定时器
        timeout = null;//因为timeout在闭包环境内，置null防止内存泄露
    }
    return debounced;
}

//节流
//原理：如果持续触发事件，每隔一段时间，只执行一次事件。
//应用场景
//1、DOM元素的拖拽功能实现
//2、射击游戏
//3、计算鼠标移动距离
//4、监听scroll滚动事件


/**
 * 
 * @param {function} func 需要执行的函数
 * @param {Number} wait 等待的时间
 * @param {Object} options 设置是否立即执行。true:执行；false:不执行。leading为首次，trailing为最后一次。
 * @return {Object} 返回传入函数执行后的结果
 */
function throttle(func, wait, options) {
    let context, args, timeout ,result;
    let old = 0;//创建一个时间戳
    if (!options) options = {};//若使用时未传参，则默认为空。

    return ()=>{
        context = this;//定义函数执行上下文
        args = arguments;//定义函数执行的参数
        let now = new Date().valueOf();//创建新的时间戳

        //1、第一次不会执行
        if (options.leading === false && old === 0) {
            old = now;
        };//更新旧时间戳。

        //2、主要负责利用时间戳，执行func函数。
        if (now - old > wait) {
            //第一次会直接执行
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }//当定时器存在时，将其清除并置null，防止内存泄露。

            result = func.apply(context, args);//执行函数
            old = now;//更新旧时间戳

        }else if (!timeout && options.trailing === true) {
            //3、最后一次会被执行
            timeout = setTimeout(()=>{
                old = new Date().valueOf();//更新旧时间戳
                timeout = null;//将定时器置空
                result = func.apply(context, args);//执行func函数
            },wait);
        };
        return result;
    };
}