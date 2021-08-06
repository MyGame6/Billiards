
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/enable_phy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4693fxv6vVHrraBJAUwECy5', 'enable_phy');
// script/enable_phy.ts

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
        _this.is_debug = false;
        _this.gravity = cc.v2(0, -320);
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        // 开启物理引擎
        var phyManager = cc.director.getPhysicsManager();
        phyManager.enabled = true;
        if (this.is_debug) {
            // 要显示的类型
            var Bits = cc.PhysicsManager.DrawBits;
            phyManager.debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
        }
        else {
            // 关闭调试信息
            phyManager.debugDrawFlags = 0;
        }
        // 重力加速度的配置
        phyManager.gravity = this.gravity;
    };
    NewClass.prototype.start = function () {
    };
    __decorate([
        property()
    ], NewClass.prototype, "is_debug", void 0);
    __decorate([
        property
    ], NewClass.prototype, "gravity", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxlbmFibGVfcGh5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBK0JDO1FBNUJHLGNBQVEsR0FBVyxLQUFLLENBQUM7UUFFekIsYUFBTyxHQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBeUJoQyxpQkFBaUI7SUFDckIsQ0FBQztJQXhCRyx3QkFBd0I7SUFFeEIseUJBQU0sR0FBTjtRQUNJLFNBQVM7UUFDVCxJQUFJLFVBQVUsR0FBc0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3BFLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUNiLFNBQVM7WUFDVCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztZQUN0QyxVQUFVLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNqRTthQUFJO1lBQ0QsU0FBUztZQUNULFVBQVUsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsV0FBVztRQUNYLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxDQUFDO0lBRUQsd0JBQUssR0FBTDtJQUVBLENBQUM7SUF6QkQ7UUFEQyxRQUFRLEVBQUU7OENBQ2M7SUFFekI7UUFEQyxRQUFROzZDQUN1QjtJQUxmLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0ErQjVCO0lBQUQsZUFBQztDQS9CRCxBQStCQyxDQS9CcUMsRUFBRSxDQUFDLFNBQVMsR0ErQmpEO2tCQS9Cb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3Q2xhc3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBpc19kZWJ1Zzpib29sZWFuID0gZmFsc2U7XHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdyYXZpdHk6Y2MuVmVjMiA9IGNjLnYyKDAsLTMyMCk7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICAvLyDlvIDlkK/niannkIblvJXmk45cclxuICAgICAgICB2YXIgcGh5TWFuYWdlcjogY2MuUGh5c2ljc01hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHBoeU1hbmFnZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5pc19kZWJ1Zyl7XHJcbiAgICAgICAgICAgIC8vIOimgeaYvuekuueahOexu+Wei1xyXG4gICAgICAgICAgICB2YXIgQml0cyA9IGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzO1xyXG4gICAgICAgICAgICBwaHlNYW5hZ2VyLmRlYnVnRHJhd0ZsYWdzID0gQml0cy5lX2pvaW50Qml0IHwgQml0cy5lX3NoYXBlQml0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyDlhbPpl63osIPor5Xkv6Hmga9cclxuICAgICAgICAgICAgcGh5TWFuYWdlci5kZWJ1Z0RyYXdGbGFncyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmHjeWKm+WKoOmAn+W6pueahOmFjee9rlxyXG4gICAgICAgIHBoeU1hbmFnZXIuZ3Jhdml0eSA9IHRoaXMuZ3Jhdml0eTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19