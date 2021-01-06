//游戏参数初始化函数
/*function gameModeSet(select){
    let modeList = []
    //Mode设置，由易到难
    let Mode1 = ()=>{//蜂群阵型：高移速中攻速中攻中弹
        enemyAirSize = { height: 54 , 
                         width: 18   };
        enemyAirBulletAttack = 1;
        enemyAirBulletSizeSelect = 1;
        enemyAirNumber = 8;
        enemyAirLife = 3;
        enemyAirBulletMoveTime = 4;
        enemyAirMoveTime = 3;
    };
    modeList.push(Mode1);
    let Mode2 = ()=>{//五将阵型：中移速中攻速中攻大弹
        enemyAirSize = { height: 90 , 
                         width: 50   };
        enemyAirBulletAttack = 2;
        enemyAirBulletSizeSelect = 1;
        enemyAirNumber = 5;
        enemyAirLife = 8;
        enemyAirBulletMoveTime = 4;
        enemyAirMoveTime = 4;
    };
    modeList.push(Mode2);
    let Mode3 = ()=>{//BOSS：中移速高攻速低攻小弹
        enemyAirSize = { height: 120 , 
                         width: 60   };
        enemyAirBulletAttack = 0.5;
        enemyAirBulletSizeSelect = 0;
        enemyAirNumber = 1;
        enemyAirLife = 14;
        enemyAirBulletMoveTime = 1;
        enemyAirMoveTime = 4;
    };
    modeList.push(Mode3);
    //启动阵型选择
    modeList[select]();
    enemyAirMaxTop = 0.3 * windowHeight - enemyAirSize.height;
    enemyAirMaxLeft = 1 * windowWidth - enemyAirSize.width;
}*/

function gameModeSet() {
    //1.0版本：使用倍数决定具体参数之间的关联.
    let value = unitConversion(getRndInteger(5, 40)+'vw');//以敌机高度参数为基准
    enemyAirSize = { height: value , 
                     width: value/3   };
    enemyAirBulletAttack = Math.pow(value,1/2);//攻击力，幂函数曲线
    enemyAirBulletSizeSelect = 1;
    enemyAirNumber = 8;
    enemyAirLife = 3;
    enemyAirBulletMoveTime = 4;
    enemyAirMoveTime = 3;
}

//游戏流程控制总线
async function gameControl() {
    /*****************************************************************/
    //初始化游戏各类参数
    gameModeSet(0);
    /*****************************************************************/

    /*****************************************************************/
    //执行对象具体行为
    /*****************************************************************/
}

//我方战机流程控制
//初始化我方战机
function myAirControl() {
    /*****************************************************************/
    //初始化游戏各类参数
    myAirLife = 5;//设置我方战机生命值
    //创建对象
    myAir = createAir(isMy=true, myAirLife);//创建我方战机，生命值为myAirLife
    myAirDom = myAir.air;//定义节点
    //执行对象具体行为
    myAirMoveBus();//启动我方战机移动控制总线
    /*****************************************************************/
}

//游戏流程控制函数
async function enemyAirControl() {
    /*****************************************************************/
    //初始化游戏各类参数
    //待施工
    gameModeSet();
    /*****************************************************************/
    //创建对象
    /*****************************************************************/
    //执行对象具体行为
    /*****************************************************************/
}