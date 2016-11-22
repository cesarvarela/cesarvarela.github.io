"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var classnames = require('classnames');
var Section_1 = require('./Section');
var Social = (function (_super) {
    __extends(Social, _super);
    function Social() {
        _super.apply(this, arguments);
    }
    Social.prototype.render = function () {
        return React.createElement(Section_1.Section, {id: "social", heading: "socialize with me"}, 
            React.createElement("ul", {className: "list-inline"}, this.props.items.map(function (item, index) {
                return React.createElement("li", {key: index, className: "list-inline-item"}, 
                    React.createElement("a", {href: item.link, target: "_blank"}, 
                        React.createElement("i", {className: classnames('fa fa-' + item.key), "aria-hidden": "true"})
                    )
                );
            }))
        );
    };
    return Social;
}(React.Component));
exports.Social = Social;
//# sourceMappingURL=Social.js.map