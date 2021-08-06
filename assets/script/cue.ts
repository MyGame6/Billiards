// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // 挥杆比例系数
    @property
    shoot_power:number = 18;

    body:cc.RigidBody = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.body = this.getComponent(cc.RigidBody);
    }

    shoot_at(dst){
        // 冲量：给球杆一个冲量
        // 冲量的方向: src ----> dst
        var src = this.node.getPosition();
        var dir = dst.sub(src);

        // 冲量大小
        var cue_len_half = this.node.width / 2;
        var len = dir.mag();
        var distance = len - cue_len_half;
        // end

        var power_x = distance * this.shoot_power * dir.x / len;
        var power_y = distance * this.shoot_power * dir.y / len;
        
        // 初始化冲量
        this.body.applyLinearImpulse(cc.v2(power_x,power_y),this.node.convertToNodeSpaceAR(cc.v2(0,0)),true);
    }

    onPreSolve(contact,selfCollider,otherCollider){
        this.node.active = false;
    }

    // update (dt) {}
}
