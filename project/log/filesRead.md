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
    Bullet：子弹类

## 二、initSetting文件夹
1、Config.js文件：
  （1）文件描述：
    包含了所有游戏设定的文件。
  （2）模块依赖：
    在设计上，请不要依赖任何模块，做到相对独立。
    避免成为依赖环，对后续维护造成消极影响。
  （3）暴露参数：
    windowWidth, windowHeight,
    myAirSize, myAirLife,
    enemyAirSize,
    fps,
    roundTime,
    myAirBulletSpeed,
    enemyAirBulletSpeed, enemyAirNumber, enemyAirLife,
    enemyAirBulletAttack,
    enemyAirFather, myAirFather, bulletFather,
    enemyAirMaxTop,
    enemyAirMaxLeft,
    enemyAirMoveTime,
    bulletSize,
    myAirBulletSizeSelect,
    enemyAirBulletSizeSelect,
    myAirBulletMoveTime,
    enemyAirBulletMoveTime