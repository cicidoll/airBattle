## 一、Object文件夹  
1、AirObject.js文件：  
  (1)文件描述：  
    Air类，是战机类对象的父类，其子类有：  
      ①我方战机类  
      ②敌方战机类  
  （2）模块依赖：  
    ①../initSetting/Config.js模块中的myAirFather enemyAirFather  
  （3）暴露参数：  
    ①enemyAirObject：敌方战机类  
    ②myAirObject：我方战机类  
2、BulletObject.js文件：  
  （1）文件描述：  
    Bullet类，是子弹对象的类。  
  （2）模块依赖：不依赖。  
  （3）暴露参数：  
      Bullet  

## 二、initSetting文件夹  
1、Config.js文件：  
  （1）文件描述：  
    包含了所有游戏设定的文件。  
  （2）模块依赖：  
    不依赖  
    ~~在设计上，请不要依赖任何模块，做到相对独立。~~  
    ~~避免成为依赖环，对后续维护造成消极影响。~~  
  （3）暴露参数：  
      windowWidth, windowHeight,  
      myAirSize, myAirLife,  
      enemyAirSize,  
      fps,  
      roundTime,  
      myAirBulletSpeed,  
      enemyAirBulletSpeed, enemyAirNumber, enemyAirLife,  
      enemyAirBulletAttack,  
      enemyAirFatherID, AirFatherID,  
      enemyAirFather, myAirFather, bulletFather,  
      enemyAirMaxTop,  
      enemyAirMaxLeft,  
      enemyAirMoveTime,  
      bulletSize,  
      myAirBulletSizeSelect,  
      enemyAirBulletSizeSelect,  
      myAirBulletMoveTime,  
      enemyAirBulletMoveTime  
  
2、DefaultMethods.js文件：  
  （1）文件描述：  
    存放项目初始化时，需要的默认function函数：  
      ①getRndInteger：范围内返回随机数\[min，max\]  
      ②setHeightBus：主页面设置宽高-控制总线  
      ③unitConversion：传入元素大小字符串（包括px、vw、vh单位），统一输出为Number类型的元素大小。  
  （2）模块依赖：  
    ①../initSetting/Config.js模块中的windowWidth windowHeight AirFatherID enemyAirFatherID  
  （3）暴露参数：  
    getRndInteger,  
    setHeightBus,  
    unitConversion  
  
3、UnderScore.js文件  
  （1）文件描述：  
    防抖与节流函数。  
  （2）模块依赖：  
    不依赖  
  （3）暴露参数：  
    debounce,  
    throttle  