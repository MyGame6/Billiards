// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ball_root: cc.Node = null;
    @property(cc.Node)
    white_ball:cc.Node = null;
    @property
    is_game_started: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.is_game_started = true;
    }

    restart_game(){
        for (var i = 0; i < this.ball_root.childrenCount; i++) {
            var b = this.ball_root.children[i];
            b.getComponent('ball').reset();
        }
        // 重置白球
        this.white_ball.getComponent('white_ball').reset();

        this.is_game_started = true;
    }

    checkGameOver() {
        for (var i = 0; i < this.ball_root.childrenCount; i++) {
            var b = this.ball_root.children[i];
            if(b.active === true){
                return;
            }
        }
        // game over
        this.is_game_started = false;
        // 5秒 后 重开
        this.scheduleOnce(this.restart_game.bind(this),5);
    }

    update(dt) { 
        
    }
}
