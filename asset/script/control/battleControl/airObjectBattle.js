/**
 * 批量创建敌机对象
 * @param {Number} airNum 需要生成的敌机对象数量
 * @param {Number} life 敌机的生命值
 */
function lotOfCreateEnemyAir(airNum,life){
  // 使用赋值的行为将for循环赋值给变量，当循环结束时，手动将变量置空，清理内存
  // 使用立即执行函数封装
  ( () => {
    for(let i =0; i<airNum; i++) {
      createAir(isMy=false, life)
    }
  })()
}

/**
 * 创建战机对象,取默认大小值。
 * @param {Boolean} isMy true:我方战机；false:敌方战机
 * @param {Number} life 战机生命值
 * @returns {Object} myAir 返回的是创建后的战机对象
 */
function createAir(isMy, life){
  let myAir
  if (isMy) {
    myAir = new myAirObject(life)
  } else if (!isMy) {
    myAir = new enemyAirObject(life)
  }
  return myAir
}

/**
 * 敌机移动动画设置
 */
function enemyAirListMove(){
  // 使用立即执行函数封装
  (enemyAirList.forEach( air => {
    air.airMove()
  }))()
}

/**
 * 负责遍历敌机List，将生命值Life为0的对象置空
 * @param {Object} air Dom节点，需要删除的战机对象节点
 * @param {Number} index Dom节点在enemyAirList列表中的索引（可以使用Foreach传入的index进行操作）
 */
function DelEnemyAir(air, index) {
  if (air.life <= 0) {
    enemyAirFather.removeChild(air.air)
    enemyAirList.splice(index,1)
    // 战机对象置空
    air = null
  }
}

/**
 * 当我方战机生命值为0时，将其删除。
 * @param {Object} air 我方战机对象
 */
function DelMyAir(myAir) {
  if (myAir.life <= 0) {
    try {
      myAirFather.removeChild(myAir.air)
      // 战机置空
      myAir = null
      alert('游戏结束！')
      window.location.reload()
    } catch (error) {}
  }
}