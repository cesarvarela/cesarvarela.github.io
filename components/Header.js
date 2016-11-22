"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Section_1 = require('./Section');
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        _super.apply(this, arguments);
    }
    Header.prototype.render = function () {
        return React.createElement(Section_1.Section, {id: "head"}, 
            React.createElement("h1", null, "Cesar Varela"), 
            React.createElement("img", {className: "po", src: require("../img/po.png"), alt: "po face"}), 
            React.createElement("hr", {className: "dot"}), 
            React.createElement("p", {className: "po-quote"}, "Hi, my name is Cesar Varela, this is my personal website," + ' ' + "scroll down to know a little more about me."));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map