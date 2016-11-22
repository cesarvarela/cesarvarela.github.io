"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Section_1 = require('./Section');
var context = require.context("../img/thumbs", true, /^\.\/.*\.png$/);
var Works = (function (_super) {
    __extends(Works, _super);
    function Works() {
        _super.apply(this, arguments);
    }
    Works.prototype.render = function () {
        return React.createElement(Section_1.Section, {id: "games", preHeading: "", heading: "My Works", postHeading: "Stuff I've worked on over the years "}, 
            React.createElement("ul", {className: "media-list"}, this.props.items.map(function (item, index) {
                return React.createElement("li", {className: "media mt-2"}, 
                    React.createElement("a", {className: "media-left", href: item.link, target: "_blank"}, 
                        React.createElement("img", {className: "media-object rounded", src: context(item.img)})
                    ), 
                    React.createElement("div", {className: "media-body"}, 
                        React.createElement("h4", {className: "media-heading"}, item.title), 
                        item.description, 
                        React.createElement("h5", null, 
                            React.createElement("a", {href: item.link, target: "_blank"}, item.linkDescription ? item.linkDescription : "more")
                        )));
            }))
        );
    };
    return Works;
}(React.Component));
exports.Works = Works;
//# sourceMappingURL=Works.js.map