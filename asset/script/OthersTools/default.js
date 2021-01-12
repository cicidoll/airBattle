const windowWidth = window.innerWidth|| document.documentElement.clientWidth || document.body.clientWidth;
const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

const myAirSize = { height: 0.15 * windowWidth, 
                    width: 0.15 * windowWidth };//我方战机生成的默认大小
let myAirLife;//我方战机生命值

let enemyAirSize = {};//生成敌机大小

const fps = 60;//游戏刷新率
const roundTime = 10;//设置关卡回合刷新时间
let myAirBulletSpeed = 2;//我方战机射击子弹速率，次数/秒
let enemyAirBulletSpeed = 0.5;//敌方战机射击子弹速率，次数/秒

let enemyAirNumber;//敌方战机生成数量
let enemyAirLife;//敌方战机生命值
let enemyAirBulletAttack;//敌方战机子弹攻击力

const enemyAirFather = document.getElementById('newEnemyAirsArea');//生成敌机对象的DOM父节点
const myAirFather = document.getElementById('battle');//生成我方战机对象的DOM父节点
const bulletFather = document.getElementById('battle');//生成战机子弹对象的DOM父节点

//敌机生成的随机最大高度
let enemyAirMaxTop;
//敌机生成的随机最大宽度
let enemyAirMaxLeft;

let enemyAirMoveTime;//敌方战机移动动画时间

let bulletSize = [ { height:30, width:10 },
                     { height:45, width:20 },
                     { height:60, width:30 } ];//设置子弹的大小，三种难度，由小到大。

let myAirBulletSizeSelect = 0;//设置我方子弹型号选择，默认为0
let enemyAirBulletSizeSelect = 0;//设置敌方子弹型号选择，默认为0

let myAirBulletMoveTime = 5;//设置我方子弹移动速度，默认为5s。
let enemyAirBulletMoveTime;//设置敌方子弹移动速度


/**
 * 输入两个数字，返回包括min和包括max之间的一个随机数
 * @param {Number} min 
 * @param {Number} max 
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * 动态设置DOM节点的高度
 * @param {Object} element 
 * @param {Number} height 
 */
function setHeight(element,height) {
    element.style.cssText += `height:${height}px;`;
};

/**
 * 批量为DOM节点设置自适应高度
 */
function setHeightBus(){
    setHeight(document.getElementsByTagName('body')[0], windowHeight);
    setHeight(document.getElementById('battle'), windowHeight);
    setHeight(document.getElementById('newEnemyAirsArea'), 0.3 * windowHeight);
}

/**
 * 目前支持对三种单位的元素大小进行计算，分别是vh、vw和px。
 *（当数值为0时，支持该情况）
 * 统一将其转化为Number类型
 * @param {String} string 需要转换的style字符串
 * @returns {Number} stringpx 以px为单位，具体的大小，并返回数字类型
 */
function unitConversion(string){
    let stringpx;
    if (string.includes('vw')){
        stringpx = Number(string.substring(0,string.length-2)) / 100 * windowWidth;
    } else if (string.includes('vh')){
        stringpx = Number(string.substring(0,string.length-2)) / 100 * windowHeight;
    }else if (string.includes('px')){
        stringpx = Number(string.substring(0,string.length-2))
    } else if (string == '0' ){
        stringpx = 0;
    }
    return stringpx;
}