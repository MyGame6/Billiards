// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property()
    value: number = 0;

    body: cc.RigidBody = null;

    // 初始位置
    start_pos: cc.Vec2 = cc.v2(0, 0);

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // 记住初始位置
        this.start_pos.x = this.node.x;
        this.start_pos.y = this.node.y;

        // 获得刚体
        this.body = this.getComponent(cc.RigidBody);
    }

    // update (dt) {}

    onBeginContact(contact, selfCollider, otherCollider) {
        // 白球有可能碰到  球杆，球，台球边，球袋
        // 第2组是球袋
        if (otherCollider.node.groupIndex == 2) {
            this.node.active = false;
        }
    }

    reset() {
        // 重置后 球 出现，并且位置重置
        this.node.active = true;
        this.node.x = this.start_pos.x;
        this.node.y = this.start_pos.y;

        this.node.angle = 0;

        // 速度设置为0
        this.body.linearVelocity = cc.v2(0, 0);
        this.body.angularVelocity = 0;
    }
}
