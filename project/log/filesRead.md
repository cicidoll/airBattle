# 好像还没更新到最新。先别管这个文件了

## 一、Object文件夹  
### 1.AirObject.js文件：  
#### (1)文件描述：  
    Air类，是战机类对象的父类，其子类有：  
      ①我方战机类  
      ②敌方战机类  
#### （2）模块依赖：  
    ①../initSetting/Config.js模块中的myAirFather enemyAirFather  
#### （3）暴露参数：  
    ①enemyAirObject：敌方战机类  
    ②myAirObject：我方战机类  
### 2.BulletObject.js文件：  
#### （1）文件描述：  
    Bullet类，是子弹对象的类。  
#### （2）模块依赖：不依赖。  
#### （3）暴露参数：  
      Bullet  

## 二、InitSetting文件夹  
### 1.Config.js文件：  
#### （1）文件描述：  
    包含了所有游戏设定的文件。  
####  （2）模块依赖：  
    不依赖  
    ~~在设计上，请不要依赖任何模块，做到相对独立。~~  
    ~~避免成为依赖环，对后续维护造成消极影响。~~  
#### （3）暴露参数：  
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
### 2.DefaultMethods.js文件：  
#### （1）文件描述：  
    存放项目初始化时，需要的默认function函数：  
      ①getRndInteger：范围内返回随机数\[min，max\]  
      ②setHeightBus：主页面设置宽高-控制总线  
      ③unitConversion：传入元素大小字符串（包括px、vw、vh单位），统一输出为Number类型的元素大小。  
#### （2）模块依赖：  
    ①../initSetting/Config.js模块中的windowWidth windowHeight AirFatherID enemyAirFatherID  
#### （3）暴露参数：  
    getRndInteger,  
    setHeightBus,  
    unitConversion  
### 3.UnderScore.js文件  
#### （1）文件描述：  
    防抖与节流函数。  
#### （2）模块依赖：  
    不依赖  
#### （3）暴露参数：  
    debounce,  
    throttle  

## 三、Control文件夹  
### 1.BattleControl文件夹  
#### (1)AirBattle.js文件：
##### ①文件描述：  
功能：批量创建敌机对象；敌机移动动画批量设置；批量删除生命值为0的敌机;我方战机流程控制,初始化我方战机  
##### ②模块依赖：  
###### （一）  
../../InitSetting/Config.js中的enemyAirFather myAirFather myAirLife  
###### （二）  
../../Object/AirObject.js中的myAirObject enemyAirObject  
###### （三） 
../MoveControl/myAirMove.js中的myAirMoveBus  
##### ③暴露参数：  
  lotOfCreateEnemyAir,  
  enemyAirListMove,  
  DelEnemyAir,  
  DelMyAir,  
  myAirControl  
#### (2)BulletBattle.js文件：
##### ①文件描述：  

##### ②模块依赖：  
###### （一）  

###### （二）  

###### （三） 

##### ③暴露参数：  
### 2.MoveControl文件夹  
#### (1)myAirMove.js文件：
##### ①文件描述：  
我方战机移动-总线函数  
（同时对外暴露两个函数：获取元素宽高，计算元素中心点；获取元素，计算元素top和left的像素）  
##### ②模块依赖：  
###### （一）  
../../InitSetting/Config.js中的myAirId  
###### （二）  
../../InitSetting/DefaultMethods.js中的unitConversion  
##### ③暴露参数：  
  myAirMoveBus,  
  calculationElementMid,  
  calculationElementTopLeft  