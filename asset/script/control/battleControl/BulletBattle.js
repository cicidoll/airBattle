import config from '../../InitSetting/Config'
import myAirMove from '../MoveControl/myAirMove'
import bulletObject from '../../Object/BulletObject'

// 我方战机子弹所属Class
const myAirBulletClass = 'myAirBullet'
// 敌方战机子弹所属Class
const enemyAirBulletClass = 'enemyAirBullet'
/**
 * 创建战机子弹对象，并将其push入相对应的子弹列表
 * @param {Object} AirDom 需要生成子弹的战机对象的DOM节点
 * @param {Boolean} isMy 是否为我方战机生成子弹，true:我方战机生成子弹对象；false:敌方战机生成子弹对象
 * @param {Object} bulletAttack 需要设置子弹的攻击力
 * @returns {Object} 生成的子弹对象
 */
function BulletPushList(AirDom, isMy, bulletAttack){
    let bullet
    if (isMy) {
      bullet = createAirBullet( AirDom, 
                                config.bulletSize[config.myAirBulletSizeSelect], 
                                isMy,
                                bulletAttack)
      bullet.addClassN(myAirBulletClass)
      myAirBulletList.push(bullet)
    }else if (!isMy) {
      bullet = createAirBullet( AirDom, 
                                bulletSize[enemyAirBulletSizeSelect], 
                                isMy, bulletAttack)
      bullet.addClassN(enemyAirBulletClass)
      enemyAirBulletList.push(bullet)
    }
    return bullet
}

/**
 * 创建战机子弹
 * @param {Object} element 需要生成子弹的战机DOM节点
 * @param {Object} bulletSize 生成的子弹模型大小
 * @param {boolean} bulletClass true:我方战机子弹，false:敌方战机子弹。默认为我方战机子弹。
 * @param {Number} bulletAttack 需要设置子弹的攻击力
 * @returns {Object} 生成的子弹对象
 */
function createAirBullet(element, bulletSize, bulletClass=true, bulletAttack){
  let elementTopLeft
  if (bulletClass) {
    elementTopLeft = myAirMove.calculationElementTopLeft(element)
  } else if (!bulletClass) {
    elementTopLeft = myAirMove.calculationEnemyBulletTopLeft(element)
  }
  
  let elementMid = myAirMove.calculationElementMid(element)

  let bulletTop,bulletLeft
  if (bulletClass) {
    bulletTop = elementTopLeft[0]- bulletSize.height
    bulletLeft = elementTopLeft[1]+elementMid[1] - bulletSize.width/2
  } else if (!bulletClass) {
    bulletTop = elementTopLeft[0] + bulletSize.height;
    bulletLeft = elementTopLeft[1] + elementMid[1] - bulletSize.width/2
  }
  let position = {top:bulletTop, left:bulletLeft }

  let airBullet = new bulletObject.Bullet(bulletSize, attack = bulletAttack, position)
  airBullet.creatDom('div')

  airBullet.addFatherDom(bulletFather)
  airBullet.addClassN('bullet')
  airBullet.addPosition()
  return airBullet
}

/**
 * 为子弹DOM节点添加移动动画
 * @param {Object} bullet 需要添加动画的子弹对象
 * @param {Boolean} isMy true:我方战机子弹节点；flase：敌方战机子弹节点
 */
function airBulletMove(bullet,isMy){
    if (isMy) {
      // 为我方战机子弹节点添加移动动画
      bullet.bullet.style.cssText += `transition:all ${myAirBulletMoveTime}s ease` 
                                  += `transform: translateY(${-bullet.position.top-bullet.size.height}px)`
    } else if (!isMy) {//为敌方战机子弹节点添加移动动画
      bullet.bullet.style.cssText += `transition:all ${enemyAirBulletMoveTime}s ease` 
                                  += `transform: translateY(${windowHeight}px)`
      // 让子弹溢出屏幕底部
    }
}

/**
 * 删除子弹节点
 * @param {Object} BulletFather 子弹节点的父战机DOM节点
 * @param {Object} bullet 需要删除的子弹对象
 * @param {Array} airBulletList 子弹对象所在的列表
 * @param {Number} index 子弹在子弹列表的索引
 */
function delAirBullet(BulletFather, bullet, airBulletList, index) {
  try {
    BulletFather.removeChild(bullet.bullet)
    airBulletList.splice(index,1)
    // 子弹置空
    bullet = null
  } catch (error) {}
}

/**
 * 子弹与战机对象的碰撞测定
 * @param {Array} bulletList 子弹列表
 * @param {Array} airList 战机对象列表
 * @param {Object} BulletFather 子弹的父DOM节点
 */
function calculationBulletAndAir(bulletList,airList,BulletFather) {
  if ((bulletList.length == 0) || (airList.length == 0) ) return;
  let airListForEach,bulletListForEach;
  //calculationElementMid(element)获取元素宽高，计算元素中心点
  //getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
  airListForEach = airList.forEach( (air) =>{
    let airTempMid = myAirMove.calculationElementMid(air.air)
    let airCoordinate = [   [ air.air.getBoundingClientRect().x ,
                              air.air.getBoundingClientRect().x + airTempMid[0]*2
                            ] ,
                            [ air.air.getBoundingClientRect().y , 
                              air.air.getBoundingClientRect().y + airTempMid[1]*2
                            ]
                        ]
    
    bulletListForEach = bulletList.forEach( (bullet,bulletIndex) => {
      let bulletTempWidthHeight = [ bullet.size.width, bullet.size.height ]
      let bulletCoordinate =  [   [ bullet.bullet.getBoundingClientRect().x , 
                                    bullet.bullet.getBoundingClientRect().x + bulletTempWidthHeight[0] 
                                  ],
                                  [ bullet.bullet.getBoundingClientRect().y , 
                                    bullet.bullet.getBoundingClientRect().y + bulletTempWidthHeight[1]
                                  ]
                              ]

      if  (   (   ( airCoordinate[1][0] <= bulletCoordinate[1][0] ) &&
                  ( bulletCoordinate[1][0] <= airCoordinate[1][1] ) &&
                  ( airCoordinate[0][0] <= bulletCoordinate[0][0] ) &&
                  ( bulletCoordinate[0][0] <  airCoordinate[0][1] )
              )                                                           ||
              (   ( airCoordinate[1][0] <= bulletCoordinate[1][1] ) && 
                  ( bulletCoordinate[1][1] <= airCoordinate[1][1] ) &&
                  ( airCoordinate[0][0] <= bulletCoordinate[0][0] ) &&
                  ( bulletCoordinate[0][0] <  airCoordinate[0][1] )
              )
          ){
            air.life -= bullet.attack
            // 删除子弹
            delAirBullet(BulletFather, bullet, bulletList, bulletIndex)
          }
    })
    bulletListForEach = null
  })
  airListForEach = null
}

function calculationEnemyBulletTopLeft(element) {
    // getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
    return [ element.getBoundingClientRect().y,
             element.getBoundingClientRect().x ]
}