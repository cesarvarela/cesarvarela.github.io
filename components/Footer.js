"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        _super.apply(this, arguments);
    }
    Footer.prototype.render = function () {
        return React.createElement("footer", null, 
            React.createElement("p", null, 
                "Built using TypeScript, REACT, Webpack, SASS, etc. and the beautiful VSCode", 
                React.createElement("br", null), 
                "You can check the source ", 
                React.createElement("a", {href: "https://github.com/cesarvarela/cesarvarela.github.io/tree/src", target: "_blank"}, "here")), 
            React.createElement("p", {className: "text-muted"}, "© 2016 Cesar Varela"));
    };
    return Footer;
}(React.Component));
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map