
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