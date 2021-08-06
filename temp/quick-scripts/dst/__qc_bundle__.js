
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/script/ball');
require('./assets/script/cue');
require('./assets/script/enable_phy');
require('./assets/script/game_controll');
require('./assets/script/white_ball');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/white_ball.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6210hN3ahB84HzPbk9CiF+', 'white_ball');
// script/white_ball.ts

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
        _this.cue = null;
        // 白球最小拖动距离
        _this.mix_dst = 20;
        _this.start_pos = cc.v2(0, 0);
        _this.body = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        // 白球起始位置
        this.start_pos.x = this.node.x;
        this.start_pos.y = this.node.y;
        // 获得刚体
        this.body = this.getComponent(cc.RigidBody);
        // 获取 cue 实体
        var cue_inst = this.cue.getComponent('cue');
        // START(点击下去),MOVE(phyManager.debugDrawFlags触摸移动),ENDED(触摸在节点范围内弹起),CANCEL(节点范围外弹起)
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation();
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);
            var src = this.node.getPosition();
            // 计算两个点之间的向量
            var dir = dst.sub(src);
            // 向量的模
            var len = dir.mag();
            // 球杆拖动距离太短
            if (len < this.mix_dst) {
                this.cue.active = false; //设置球杆为隐藏
                return;
            }
            else {
                this.cue.active = true;
            }
            var r = Math.atan2(dir.y, dir.x);
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
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            if (this.cue.active === false) {
                return;
            }
            cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            if (this.cue.active === false) {
                return;
            }
            cue_inst.shoot_at(this.node.getPosition());
            // this.cue.shoot_at(this.node.getPosition());
        }.bind(this), this);
    };
    NewClass.prototype.reset = function () {
        this.node.scale = 1;
        this.node.x = this.start_pos.x;
        this.node.y = this.start_pos.y;
        // 速度设置为0
        this.body.linearVelocity = cc.v2(0, 0);
        this.body.angularVelocity = 0;
    };
    NewClass.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        // 白球有可能碰到  球杆，球，台球边，球袋
        // 第2组是球袋
        if (otherCollider.node.groupIndex == 2) {
            // 隔1秒，要把球放回去
            this.node.scale = 0;
            this.scheduleOnce(this.reset.bind(this), 1);
            return;
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "cue", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx3aGl0ZV9iYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBdUdDO1FBcEdHLFNBQUcsR0FBVyxJQUFJLENBQUM7UUFDbkIsV0FBVztRQUNYLGFBQU8sR0FBWSxFQUFFLENBQUM7UUFFdEIsZUFBUyxHQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9CLFVBQUksR0FBZ0IsSUFBSSxDQUFDOztRQTZGekIsaUJBQWlCO0lBQ3JCLENBQUM7SUE1Rkcsd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix3QkFBSyxHQUFMO1FBQ0ksU0FBUztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRS9CLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLFlBQVk7UUFDWixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU1QyxvRkFBb0Y7UUFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFD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QyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRS9CLFNBQVM7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxPQUFPLEVBQUMsWUFBWSxFQUFDLGFBQWE7UUFDN0MsdUJBQXVCO1FBQ3ZCLFNBQVM7UUFDVCxJQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBQztZQUNsQyxhQUFhO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0MsT0FBTztTQUNWO0lBQ0wsQ0FBQztJQWpHRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lDQUNDO0lBSEYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXVHNUI7SUFBRCxlQUFDO0NBdkdELEFBdUdDLENBdkdxQyxFQUFFLENBQUMsU0FBUyxHQXVHakQ7a0JBdkdvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjdWU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAvLyDnmb3nkIPmnIDlsI/mi5bliqjot53nprtcclxuICAgIG1peF9kc3QgOiBudW1iZXIgPSAyMDtcclxuXHJcbiAgICBzdGFydF9wb3M6Y2MuVmVjMiA9IGNjLnYyKDAsMCk7XHJcblxyXG4gICAgYm9keTpjYy5SaWdpZEJvZHkgPSBudWxsO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICAvLyDnmb3nkIPotbflp4vkvY3nva5cclxuICAgICAgICB0aGlzLnN0YXJ0X3Bvcy54ID0gdGhpcy5ub2RlLng7XHJcbiAgICAgICAgdGhpcy5zdGFydF9wb3MueSA9IHRoaXMubm9kZS55O1xyXG5cclxuICAgICAgICAvLyDojrflvpfliJrkvZNcclxuICAgICAgICB0aGlzLmJvZHkgPSB0aGlzLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG5cclxuICAgICAgICAvLyDojrflj5YgY3VlIOWunuS9k1xyXG4gICAgICAgIGxldCBjdWVfaW5zdCA9IHRoaXMuY3VlLmdldENvbXBvbmVudCgnY3VlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU1RBUlQo54K55Ye75LiL5Y67KSxNT1ZFKHBoeU1hbmFnZXIuZGVidWdEcmF3RmxhZ3Pop6bmkbjnp7vliqgpLEVOREVEKOinpuaRuOWcqOiKgueCueiMg+WbtOWGheW8uei1tyksQ0FOQ0VMKOiKgueCueiMg+WbtOWkluW8uei1tylcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIH0uYmluZCh0aGlzKSx0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIHZhciB3X3BvcyA9IGUuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdmFyIGRzdCA9IHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod19wb3MpO1xyXG4gICAgICAgICAgICB2YXIgc3JjID0gdGhpcy5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vIOiuoeeul+S4pOS4queCueS5i+mXtOeahOWQkemHj1xyXG4gICAgICAgICAgICB2YXIgZGlyID0gZHN0LnN1YihzcmMpO1xyXG4gICAgICAgICAgICAvLyDlkJHph4/nmoTmqKFcclxuICAgICAgICAgICAgbGV0IGxlbiA9IGRpci5tYWcoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIOeQg+adhuaLluWKqOi3neemu+WkquefrVxyXG4gICAgICAgICAgICBpZihsZW4gPCB0aGlzLm1peF9kc3Qpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdWUuYWN0aXZlID0gZmFsc2U7Ly/orr7nva7nkIPmnYbkuLrpmpDol49cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgciA9IE1hdGguYXRhbjIoZGlyLnksZGlyLngpO1xyXG4gICAgICAgICAgICB2YXIgZGVncmVlID0gciAqICgxODAgLyBNYXRoLlBJKTtcclxuICAgICAgICAgICAgLy8gZGVncmVlID0gMzYwIC0gZGVncmVlO1xyXG5cclxuICAgICAgICAgICAgLy8g55CD5p2G5peL6L2s6KeS5bqmXHJcbiAgICAgICAgICAgIHRoaXMuY3VlLmFuZ2xlID0gZGVncmVlICsgMTgwO1xyXG4gICAgICAgICAgICAvLyDnkIPmnYbnmoTkvY3nva5cclxuICAgICAgICAgICAgdmFyIGN1ZV9wb3MgPSBkc3Q7XHJcbiAgICAgICAgICAgIHZhciBjdWVfbGVuX2hhbGYgPSB0aGlzLmN1ZS53aWR0aCAqIDAuNTtcclxuICAgICAgICAgICAgY3VlX3Bvcy54ICs9IChjdWVfbGVuX2hhbGYgKiBkaXIueCAvIGxlbik7XHJcbiAgICAgICAgICAgIGN1ZV9wb3MueSArPSAoY3VlX2xlbl9oYWxmICogZGlyLnkgLyBsZW4pO1xyXG5cclxuICAgICAgICAgICAgLy8g6K6+572u55CD5p2G5L2N572uXHJcbiAgICAgICAgICAgIHRoaXMuY3VlLnNldFBvc2l0aW9uKGN1ZV9wb3MpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSx0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCxmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdWUuYWN0aXZlID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VlX2luc3Quc2hvb3RfYXQodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSx0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCxmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5jdWUuYWN0aXZlID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VlX2luc3Quc2hvb3RfYXQodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmN1ZS5zaG9vdF9hdCh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICB0aGlzLm5vZGUueCA9IHRoaXMuc3RhcnRfcG9zLng7XHJcbiAgICAgICAgdGhpcy5ub2RlLnkgPSB0aGlzLnN0YXJ0X3Bvcy55OyBcclxuXHJcbiAgICAgICAgLy8g6YCf5bqm6K6+572u5Li6MFxyXG4gICAgICAgIHRoaXMuYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsMCk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmFuZ3VsYXJWZWxvY2l0eSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdCxzZWxmQ29sbGlkZXIsb3RoZXJDb2xsaWRlcil7XHJcbiAgICAgICAgLy8g55m955CD5pyJ5Y+v6IO956Kw5YiwICDnkIPmnYbvvIznkIPvvIzlj7DnkIPovrnvvIznkIPoootcclxuICAgICAgICAvLyDnrKwy57uE5piv55CD6KKLXHJcbiAgICAgICAgaWYob3RoZXJDb2xsaWRlci5ub2RlLmdyb3VwSW5kZXggPT0gMil7XHJcbiAgICAgICAgICAgIC8vIOmalDHnp5LvvIzopoHmiornkIPmlL7lm57ljrtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5yZXNldC5iaW5kKHRoaXMpLDEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/cue.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxjdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUF3Q0M7UUF0Q0csU0FBUztRQUVULGlCQUFXLEdBQVUsRUFBRSxDQUFDO1FBRXhCLFVBQUksR0FBZ0IsSUFBSSxDQUFDOztRQWlDekIsaUJBQWlCO0lBQ3JCLENBQUM7SUFoQ0csd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix3QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsMkJBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixhQUFhO1FBQ2IsdUJBQXVCO1FBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2QixPQUFPO1FBQ1AsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLFFBQVEsR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLE1BQU07UUFFTixJQUFJLE9BQU8sR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4RCxJQUFJLE9BQU8sR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUV4RCxRQUFRO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxPQUFPLEVBQUMsWUFBWSxFQUFDLGFBQWE7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFqQ0Q7UUFEQyxRQUFRO2lEQUNlO0lBSlAsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXdDNUI7SUFBRCxlQUFDO0NBeENELEFBd0NDLENBeENxQyxFQUFFLENBQUMsU0FBUyxHQXdDakQ7a0JBeENvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy8g5oyl5p2G5q+U5L6L57O75pWwXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHNob290X3Bvd2VyOm51bWJlciA9IDE4O1xyXG5cclxuICAgIGJvZHk6Y2MuUmlnaWRCb2R5ID0gbnVsbDtcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgdGhpcy5ib2R5ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG9vdF9hdChkc3Qpe1xyXG4gICAgICAgIC8vIOWGsumHj++8mue7meeQg+adhuS4gOS4quWGsumHj1xyXG4gICAgICAgIC8vIOWGsumHj+eahOaWueWQkTogc3JjIC0tLS0+IGRzdFxyXG4gICAgICAgIHZhciBzcmMgPSB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB2YXIgZGlyID0gZHN0LnN1YihzcmMpO1xyXG5cclxuICAgICAgICAvLyDlhrLph4/lpKflsI9cclxuICAgICAgICB2YXIgY3VlX2xlbl9oYWxmID0gdGhpcy5ub2RlLndpZHRoIC8gMjtcclxuICAgICAgICB2YXIgbGVuID0gZGlyLm1hZygpO1xyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IGxlbiAtIGN1ZV9sZW5faGFsZjtcclxuICAgICAgICAvLyBlbmRcclxuXHJcbiAgICAgICAgdmFyIHBvd2VyX3ggPSBkaXN0YW5jZSAqIHRoaXMuc2hvb3RfcG93ZXIgKiBkaXIueCAvIGxlbjtcclxuICAgICAgICB2YXIgcG93ZXJfeSA9IGRpc3RhbmNlICogdGhpcy5zaG9vdF9wb3dlciAqIGRpci55IC8gbGVuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOWIneWni+WMluWGsumHj1xyXG4gICAgICAgIHRoaXMuYm9keS5hcHBseUxpbmVhckltcHVsc2UoY2MudjIocG93ZXJfeCxwb3dlcl95KSx0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY2MudjIoMCwwKSksdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QcmVTb2x2ZShjb250YWN0LHNlbGZDb2xsaWRlcixvdGhlckNvbGxpZGVyKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ball.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxiYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBNkNDO1FBMUNHLFdBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsVUFBSSxHQUFpQixJQUFJLENBQUM7UUFFMUIsT0FBTztRQUNQLGVBQVMsR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7SUFxQ3JDLENBQUM7SUFuQ0csd0JBQXdCO0lBRXhCLGVBQWU7SUFFZix3QkFBSyxHQUFMO1FBQ0ksU0FBUztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRS9CLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxpQkFBaUI7SUFFakIsaUNBQWMsR0FBZCxVQUFlLE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYTtRQUMvQyx1QkFBdUI7UUFDdkIsU0FBUztRQUNULElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQ0ksa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFcEIsU0FBUztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBekNEO1FBREMsUUFBUSxFQUFFOzJDQUNPO0lBSEQsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTZDNUI7SUFBRCxlQUFDO0NBN0NELEFBNkNDLENBN0NxQyxFQUFFLENBQUMsU0FBUyxHQTZDakQ7a0JBN0NvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgdmFsdWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgYm9keTogY2MuUmlnaWRCb2R5ID0gbnVsbDtcclxuXHJcbiAgICAvLyDliJ3lp4vkvY3nva5cclxuICAgIHN0YXJ0X3BvczogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIC8vIOiusOS9j+WIneWni+S9jee9rlxyXG4gICAgICAgIHRoaXMuc3RhcnRfcG9zLnggPSB0aGlzLm5vZGUueDtcclxuICAgICAgICB0aGlzLnN0YXJ0X3Bvcy55ID0gdGhpcy5ub2RlLnk7XHJcblxyXG4gICAgICAgIC8vIOiOt+W+l+WImuS9k1xyXG4gICAgICAgIHRoaXMuYm9keSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpIHtcclxuICAgICAgICAvLyDnmb3nkIPmnInlj6/og73norDliLAgIOeQg+adhu+8jOeQg++8jOWPsOeQg+i+ue+8jOeQg+iii1xyXG4gICAgICAgIC8vIOesrDLnu4TmmK/nkIPoootcclxuICAgICAgICBpZiAob3RoZXJDb2xsaWRlci5ub2RlLmdyb3VwSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIC8vIOmHjee9ruWQjiDnkIMg5Ye6546w77yM5bm25LiU5L2N572u6YeN572uXHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLnN0YXJ0X3Bvcy54O1xyXG4gICAgICAgIHRoaXMubm9kZS55ID0gdGhpcy5zdGFydF9wb3MueTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gMDtcclxuXHJcbiAgICAgICAgLy8g6YCf5bqm6K6+572u5Li6MFxyXG4gICAgICAgIHRoaXMuYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuYm9keS5hbmd1bGFyVmVsb2NpdHkgPSAwO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/game_controll.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '785c5mA7dRLrpKHjNB/67vF', 'game_controll');
// script/game_controll.ts

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
        _this.ball_root = null;
        _this.white_ball = null;
        _this.is_game_started = true;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
        this.is_game_started = true;
    };
    NewClass.prototype.restart_game = function () {
        for (var i = 0; i < this.ball_root.childrenCount; i++) {
            var b = this.ball_root.children[i];
            b.getComponent('ball').reset();
        }
        // 重置白球
        this.white_ball.getComponent('white_ball').reset();
        this.is_game_started = true;
    };
    NewClass.prototype.checkGameOver = function () {
        for (var i = 0; i < this.ball_root.childrenCount; i++) {
            var b = this.ball_root.children[i];
            if (b.active === true) {
                return;
            }
        }
        // game over
        this.is_game_started = false;
        // 5秒 后 重开
        this.scheduleOnce(this.restart_game.bind(this), 5);
    };
    NewClass.prototype.update = function (dt) {
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "ball_root", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "white_ball", void 0);
    __decorate([
        property
    ], NewClass.prototype, "is_game_started", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lX2NvbnRyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBNENDO1FBekNHLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFFMUIscUJBQWUsR0FBWSxJQUFJLENBQUM7O0lBcUNwQyxDQUFDO0lBbkNHLHdCQUF3QjtJQUV4QixlQUFlO0lBRWYsd0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCwrQkFBWSxHQUFaO1FBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25ELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDbEM7UUFDRCxPQUFPO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBRyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksRUFBQztnQkFDakIsT0FBTzthQUNWO1NBQ0o7UUFDRCxZQUFZO1FBQ1osSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsVUFBVTtRQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBTyxFQUFFO0lBRVQsQ0FBQztJQXhDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNRO0lBRTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ1E7SUFFMUI7UUFEQyxRQUFRO3FEQUN1QjtJQVBmLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E0QzVCO0lBQUQsZUFBQztDQTVDRCxBQTRDQyxDQTVDcUMsRUFBRSxDQUFDLFNBQVMsR0E0Q2pEO2tCQTVDb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBiYWxsX3Jvb3Q6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB3aGl0ZV9iYWxsOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBpc19nYW1lX3N0YXJ0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIC8vIG9uTG9hZCAoKSB7fVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIHRoaXMuaXNfZ2FtZV9zdGFydGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0YXJ0X2dhbWUoKXtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYmFsbF9yb290LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYiA9IHRoaXMuYmFsbF9yb290LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBiLmdldENvbXBvbmVudCgnYmFsbCcpLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOmHjee9rueZveeQg1xyXG4gICAgICAgIHRoaXMud2hpdGVfYmFsbC5nZXRDb21wb25lbnQoJ3doaXRlX2JhbGwnKS5yZXNldCgpO1xyXG5cclxuICAgICAgICB0aGlzLmlzX2dhbWVfc3RhcnRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tHYW1lT3ZlcigpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYmFsbF9yb290LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYiA9IHRoaXMuYmFsbF9yb290LmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZihiLmFjdGl2ZSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2FtZSBvdmVyXHJcbiAgICAgICAgdGhpcy5pc19nYW1lX3N0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICAvLyA156eSIOWQjiDph43lvIBcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnJlc3RhcnRfZ2FtZS5iaW5kKHRoaXMpLDUpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdCkgeyBcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------
