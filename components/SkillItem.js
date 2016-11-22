"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var SkillItem = (function (_super) {
    __extends(SkillItem, _super);
    function SkillItem() {
        _super.apply(this, arguments);
    }
    SkillItem.prototype.render = function () {
        return React.createElement("li", null, 
            " ", 
            this.props.name, 
            " ");
    };
    return SkillItem;
}(React.Component));
exports.SkillItem = SkillItem;
//# sourceMappingURL=SkillItem.js.map