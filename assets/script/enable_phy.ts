// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property()
    is_debug:boolean = false;
    @property
    gravity:cc.Vec2 = cc.v2(0,-320);

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 开启物理引擎
        var phyManager: cc.PhysicsManager = cc.director.getPhysicsManager();
        phyManager.enabled = true;
        
        if(this.is_debug){
            // 要显示的类型
            var Bits = cc.PhysicsManager.DrawBits;
            phyManager.debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
        }else{
            // 关闭调试信息
            phyManager.debugDrawFlags = 0;
        }
        // 重力加速度的配置
        phyManager.gravity = this.gravity;
    }

    start () {

    }

    // update (dt) {}
}
