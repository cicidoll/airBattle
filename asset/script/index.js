let myAir// 我方战机对象
let myAirDom// 我方方战机DOM节点
let myAirList = []// 我方战机对象
let enemyAirList = []// 存放生成的敌机对象
let myAirBulletList = []// 存放生成的我方战机发射子弹
let enemyAirBulletList = []// 存放生成的敌方战机发射子弹
let enemyAirBulletRemoveEventListenerList = []// 敌方战机子弹监听事件移除列表

//主线程
window.onload = () => {
    /*****************************************************************/
    setHeightBus();//设置自适应高度，用js实现100vh。

    /*****************************************************************/
    //启动我方战机控制函数
    myAirControl();
    /*****************************************************************/
    //timeBus：延时器、定时器总线控制
    let timeBus;
    gameControl();
    //延时一帧的时间后启动timeBus总线
    timeBus = setTimeout(() => {
        /*****************************************************************/
        //待施工，预计建立关卡控制器
        gameModeSet(0)
        /*****************************************************************/
        //游戏初始化，首次创建敌方战机对象
        lotOfCreateEnemyAir(enemyAirNumber,enemyAirLife);//批量创建敌机对象，创建5个，生命值为3
        let enemyAirMoveTimeOut1;//敌方战机移动延时器1
        enemyAirMoveTimeOut1 = setTimeout(() => {
            enemyAirListMove();//敌机移动函数
            clearTimeout(enemyAirMoveTimeOut1);
            enemyAirMoveTimeOut1 = null;
        }, 1000/fps);//第二帧的时候开始添加敌方战机移动动画
        /*****************************************************************/
        let myAirBulletTime;//我方战机子弹定时器
        let enemyAirTimeSetInterval;//批量创建敌机对象定时器
        let enemyAirBulletTime;//敌方战机子弹定时器
        let enemyAirMoveTimeOut2;//敌方战机移动逻辑延时器
        //定时器总线控制
        let setIntervalBus;
        let clearTempListTimeOut;
        //第二帧开始，负责每一帧执行循环的定时器总线
        setIntervalBus = setInterval( () => {
            /*****************************************************************/
            //批量创建敌机对象
            if (!enemyAirTimeSetInterval){//当定时器不存在时，创建一个新的定时器
                
                enemyAirTimeSetInterval = setInterval(() => {
                    lotOfCreateEnemyAir(enemyAirNumber,enemyAirLife);//批量创建敌机对象，创建enemyAirNumber个，生命值为enemyAirLife
                    clearInterval(enemyAirTimeSetInterval);
                    enemyAirTimeSetInterval = null;
                }, roundTime*1000);                    
            }

            if (!enemyAirMoveTimeOut2){
                enemyAirMoveTimeOut2 = setTimeout(() => {//敌方战机移动逻辑延时器
                    enemyAirListMove();
                    clearTimeout(enemyAirMoveTimeOut2);
                    enemyAirMoveTimeOut2 = null;
                }, enemyAirMoveTime*1000+1000/fps);//延时一帧启动敌机移动动画                
            }
            /*****************************************************************/
            //敌方战机子弹定时器
            if (!enemyAirBulletTime){//当定时器不存在时，创建一个新的定时器
                // let enemyAirBulletTimeOut = Symbol();//子弹移动延时器
                let enemyAirBullet;//生成的敌方子弹对象
                       
                //敌方战机子弹生成定时器
                enemyAirBulletTime = setInterval(()=>{
                    /*****************************************************************/
                    let enemyAirForeach;
                    enemyAirForeach = enemyAirList.forEach(enemyAir =>{
                        enemyAirBullet = BulletPushList(enemyAir.air,isMy=false,bulletAttack = enemyAirBulletAttack);//开始创建子弹对象
                        /*****************************************************************/
                        //定义子弹节点添加动画结束后的节点删除事件
                        function transitionend() {
                            try {bulletFather.removeChild(enemyAirBullet.bullet)} catch (error) {};        
                        };

                        let bulletAddEventListener; 
                        bulletAddEventListener = enemyAirBullet.bullet.addEventListener('transitionend',transitionend);
                        bulletAddEventListener = null;

                        let bulletRemoveEventListener = Symbol();
                        bulletRemoveEventListener = setTimeout( () =>{//移除监听事件
                            enemyAirBullet.bullet.removeEventListener('transitionend',transitionend);
                        },enemyAirBulletMoveTime*1000+3000/fps);//当子弹移动动画时长结束，3帧后移除监听事件
                        enemyAirBulletRemoveEventListenerList.push(bulletRemoveEventListener)
                        /*****************************************************************/
                    })
                    enemyAirForeach = null;
                    /*****************************************************************/
                    let airBulletMoveTimeout;//创建敌方战机子弹移动延时器，延时3帧启动
                    if (!airBulletMoveTimeout){
                        airBulletMoveTimeout = setTimeout(()=>{
                            enemyAirBulletList.forEach( bullet=>{
                                airBulletMove(bullet,isMy=false);
                                clearTimeout(airBulletMoveTimeout);
                                airBulletMoveTimeout = null;
                            });                            
                        },3000/fps)
                    }

                    if (!clearTempListTimeOut) {//创建临时列表清理延时器，清除监听事件已经结束的敌方子弹对象列表
                        clearTempListTimeOut = setTimeout( () =>{
                            enemyAirBulletRemoveEventListenerList.forEach( (obj,index) =>{
                                clearTimeout(obj);
                                obj = null;
                                enemyAirBulletRemoveEventListenerList.splice(index,1);
                            })
                        clearTimeout(clearTempListTimeOut);
                        clearTempListTimeOut = null;
                        },enemyAirBulletMoveTime*1000*2)
                    }
                    clearInterval(enemyAirBulletTime);
                    enemyAirBulletTime = null;
                },1000/enemyAirBulletSpeed);
            }
            /*****************************************************************/
            //敌方战机子弹列表遍历延时器

            /*****************************************************************/
            //开启敌方子弹与我方战机对象碰撞检测函数
            let calculationmyBulletAndEnemyAirInterval = setTimeout( () => {
                let result;
                result = throttle( ()=>{
                    calculationBulletAndAir(enemyAirBulletList,myAirList,bulletFather);
                    //遍历敌方子弹对象列表
                    myAir.air.innerHTML = myAir.life;
                    // DelMyAir(myAir);
                },1000/fps*3)()//每3帧执行一次                    
                result = null;
                clearTimeout(calculationmyBulletAndEnemyAirInterval);
                calculationmyBulletAndEnemyAirInterval = null;
            },1000/fps)//每一帧执行一次
            /*****************************************************************/
            //我方战机子弹定时器
            if (!myAirBulletTime) {
                let myBulletMoveTime;//子弹移动延时器
                let myBullet;
                //我方战机子弹生成定时器
                myAirBulletTime = setInterval( () =>{
                    myBullet = BulletPushList(myAirDom,isMy=true,bulletAttack=3);//开始创建子弹对象

                    //为子弹节点添加动画结束后的节点删除事件
                    function transitionend() {
                        try {bulletFather.removeChild(myBullet.bullet);} catch (error) {};        
                    };

                    let bulletAddEventListener;
                    bulletAddEventListener = myBullet.bullet.addEventListener('transitionend',transitionend);
                    let bulletRemoveEventListener = setTimeout( () => {
                        myBullet.bullet.removeEventListener('transitionend',transitionend);
                        clearTimeout(bulletRemoveEventListener);
                        bulletRemoveEventListener = null;
                    },myAirBulletMoveTime*1000);
                    bulletAddEventListener = null;
                    

                    //子弹移动延时器
                    if (!myBulletMoveTime){
                        myBulletMoveTime = setTimeout( () => {
                            airBulletMove(myBullet, isMy=true)
                            clearTimeout(myBulletMoveTime)
                            myBulletMoveTime = null;
                        }, 1000/fps);//第二帧开始让子弹移动
                    }

                    clearInterval(myAirBulletTime);
                    myAirBulletTime = null;                    
                },1000/myAirBulletSpeed);
            }
            /*****************************************************************/

            //开启我方子弹与敌方战机对象碰撞检测函数
            let calculationBulletAndAirInterval;
            calculationBulletAndAirInterval = setTimeout( ()=>{
                let result;
                result = throttle( ()=>{
                    calculationBulletAndAir(myAirBulletList,enemyAirList,bulletFather);
                    let enemyAirListForEach;
                    enemyAirListForEach = enemyAirList.forEach( (air, index)=>{//启动删除生命值为0的敌机函数
                        DelEnemyAir(air,index);
                    });
                    enemyAirListForEach = null;
                },1000/fps*2)()//每两帧执行一次
                result = null;
                clearTimeout(calculationBulletAndAirInterval)
                calculationBulletAndAirInterval = null;
            },1000/fps)//每一帧执行一次
            /*****************************************************************/
            setIntervalBus = null;
        
        }, 1000/fps);//第二帧开始，执行每帧刷新
        clearTimeout(timeBus);
        timeBus = null;
    }, 1000/fps);

}