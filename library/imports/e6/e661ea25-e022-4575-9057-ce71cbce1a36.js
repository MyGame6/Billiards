"use strict";
cc._RF.push(module, 'e661eol4CJFdZBXznHLzho2', 'cue');
// script/cue.ts

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
        // 挥杆比例系数
        _this.shoot_power = 18;
        _this.body = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        this.body = this.getComponent(cc.RigidBody);
    };
    NewClass.prototype.shoot_at = function (dst) {
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
        this.body.applyLinearImpulse(cc.v2(power_x, power_y), this.node.convertToNodeSpaceAR(cc.v2(0, 0)), true);
    };
    NewClass.prototype.onPreSolve = function (contact, selfCollider, otherCollider) {
        this.node.active = false;
    };
    __decorate([
        property
    ], NewClass.prototype, "shoot_power", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();