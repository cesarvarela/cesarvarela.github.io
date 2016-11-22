"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var $ = require('jquery');
var classnames = require('classnames');
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.call(this);
        this.state =
            {
                sticky: false,
                menu: [
                    { text: 'Projects', href: '#projects', active: false },
                    { text: 'About', href: '#about', active: false },
                    { text: 'Social', href: '#social', active: false },
                    { text: 'Contact', href: '#contact', active: false },
                ]
            };
    }
    Menu.prototype.componentDidMount = function () {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    };
    Menu.prototype.componentWillUnMount = function () {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    };
    Menu.prototype.handleScroll = function () {
        var _this = this;
        this.windowTop = $(window).scrollTop();
        this.menuHeight = $(this.menuDom).height();
        $(this.sectionDom).height(this.menuHeight);
        if (!this.state.sticky) {
            this.menuTop = $(this.menuDom).offset().top;
        }
        if (this.windowTop > this.menuTop) {
            this.setState({ sticky: true });
        }
        else {
            this.setState({ sticky: false });
        }
        var last;
        this.state.menu.forEach(function (item) {
            if (_this.windowTop + _this.menuHeight > $(item.href).offset().top) {
                last = item;
            }
        });
        this.state.menu.forEach(function (item) {
            item.active = item == last;
        });
        this.setState({ menu: this.state.menu });
    };
    Menu.prototype.render = function () {
        var _this = this;
        var classes = classnames("main", { sticky: this.state.sticky });
        var items = this.state.menu.map(function (item) {
            return React.createElement("li", {key: item.href, className: classnames('list-inline-item', { active: item.active })}, 
                React.createElement("a", {href: item.href}, item.text)
            );
        });
        return React.createElement("section", {id: "menu", onScroll: this.handleScroll, ref: function (c) { return _this.sectionDom = c; }}, 
            React.createElement("nav", {className: classes, ref: function (c) { return _this.menuDom = c; }}, 
                React.createElement("ul", {className: "list-inline"}, items)
            )
        );
    };
    return Menu;
}(React.Component));
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map