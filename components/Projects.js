"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Section_1 = require('./Section');
var context = require.context("../img/projects", true, /^\.\/.*\.png$/);
var Projects = (function (_super) {
    __extends(Projects, _super);
    function Projects() {
        _super.apply(this, arguments);
    }
    Projects.prototype.render = function () {
        return React.createElement(Section_1.Section, {id: "projects", heading: "Projects I'm part of"}, 
            React.createElement("div", {className: "row"}, this.props.items.map(function (item, index) {
                return React.createElement("div", {key: index, className: "col-md-6"}, 
                    React.createElement("div", {className: "image"}, 
                        React.createElement("a", {href: item.link, target: "_blank"}, 
                            React.createElement("img", {src: context(item.img)})
                        )
                    ), 
                    React.createElement("h3", null, item.title), 
                    React.createElement("p", null, item.description));
            }))
        );
    };
    return Projects;
}(React.Component));
exports.Projects = Projects;
//# sourceMappingURL=Projects.js.map