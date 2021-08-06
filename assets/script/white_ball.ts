// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    cue:cc.Node = null;
    // 白球最小拖动距离
    mix_dst : number = 20;

    start_pos:cc.Vec2 = cc.v2(0,0);

    body:cc.RigidBody = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // 白球起始位置
        this.start_pos.x = this.node.x;
        this.start_pos.y = this.node.y;

        // 获得刚体
        this.body = this.getComponent(cc.RigidBody);

        // 获取 cue 实体
        let cue_inst = this.cue.getComponent('cue');
        
        // START(点击下去),MOVE(phyManager.debugDrawFlags触摸移动),ENDED(触摸在节点范围内弹起),CANCEL(节点范围外弹起)
        this.node.on(cc.Node.EventType.TOUCH_START,function(e){

        }.bind(this),this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e){
            var w_pos = e.getLocation();
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);
            var src = this.node.getPosition();
            // 计算两个点之间的向量
            var dir = dst.sub(src);
            // 向量的模
            let len = dir.mag();
            
            // 球杆拖动距离太短
            if(len < this.mix_dst){
                this.cue.active = false;//设置球杆为隐藏
                return;
            }else{
                this.cue.active = true;
            }

            var r = Math.atan2(dir.y,dir.x);
            var degree = r * (180 / Math.PI);
            // degree = 360 - degree;

            // 球杆旋转角度
            this.cue.angle = degree + 180;
            // 球杆的位置
            var cue_pos = dst;
            var cue_len_half = this.cue.width * 0.5;
            cue_pos.x += (cue_len_half * dir.x / len);
            cue_pos.y += (cue_len_half * dir.y / len);

            // 设置球杆位置
            this.cue.setPosition(cue_pos);
        }.bind(this),this);

        this.node.on(cc.Node.EventType.TOUCH_END,function(e){
            if(this.cue.active === false){
                return;
            }
            cue_inst.shoot_at(this.node.getPosition());
        }.bind(this),this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
            if(this.cue.active === false){
                return;
            }
            cue_inst.shoot_at(this.node.getPosition());
            // this.cue.shoot_at(this.node.getPosition());
        }.bind(this),this);
    }

    reset(){
        this.node.scale = 1;
        this.node.x = this.start_pos.x;
        this.node.y = this.start_pos.y; 

        // 速度设置为0
        this.body.linearVelocity = cc.v2(0,0);
        this.body.angularVelocity = 0;
    }

    onBeginContact(contact,selfCollider,otherCollider){
        // 白球有可能碰到  球杆，球，台球边，球袋
        // 第2组是球袋
        if(otherCollider.node.groupIndex == 2){
            // 隔1秒，要把球放回去
            this.node.scale = 0;
            this.scheduleOnce(this.reset.bind(this),1);
            
            return;
        }
    }

    // update (dt) {}
}
