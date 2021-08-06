"use strict";
cc._RF.push(module, '02236LgZv1M6qRrIhJks6xY', 'ball');
// script/ball.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = 0;
        _this.body = null;
        // 初始位置
        _this.start_pos = cc.v2(0, 0);
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        // 记住初始位置
        this.start_pos.x = this.node.x;
        this.start_pos.y = this.node.y;
        // 获得刚体
        this.body = this.getComponent(cc.RigidBody);
    };
    // update (dt) {}
    NewClass.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        // 白球有可能碰到  球杆，球，台球边，球袋
        // 第2组是球袋
        if (otherCollider.node.groupIndex == 2) {
            this.node.active = false;
        }
    };
    NewClass.prototype.reset = function () {
        // 重置后 球 出现，并且位置重置
        this.node.active = true;
        this.node.x = this.start_pos.x;
        this.node.y = this.start_pos.y;
        this.node.angle = 0;
        // 速度设置为0
        this.body.linearVelocity = cc.v2(0, 0);
        this.body.angularVelocity = 0;
    };
    __decorate([
        property()
    ], NewClass.prototype, "value", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();