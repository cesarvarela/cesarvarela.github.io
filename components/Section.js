"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Section = (function (_super) {
    __extends(Section, _super);
    function Section() {
        _super.apply(this, arguments);
    }
    Section.prototype.render = function () {
        return React.createElement("section", {id: this.props.id}, 
            React.createElement("div", {className: "container-fluid"}, 
                React.createElement("p", {className: "pre-heading"}, this.props.preHeading), 
                React.createElement("h2", {className: "line-heading"}, this.props.heading), 
                React.createElement("p", {className: "sub-line-heading"}, this.props.postHeading)), 
            React.createElement("div", {className: "container"}, this.props.children));
    };
    return Section;
}(React.Component));
exports.Section = Section;
//# sourceMappingURL=Section.js.map