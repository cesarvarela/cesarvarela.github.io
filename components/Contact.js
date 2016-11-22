"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Section_1 = require('./Section');
var Contact = (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        _super.apply(this, arguments);
    }
    Contact.prototype.render = function () {
        return React.createElement(Section_1.Section, {id: "contact", preHeading: "Communication is Key", heading: "Contact"}, 
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6 text-md-right"}, 
                    React.createElement("img", {src: require("../img/MECard.gif"), alt: "qr con datos de contacto"})
                ), 
                React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("h5", null, "Load this MECard with my contact info to your smartphone."), 
                    React.createElement("p", null, "Or you can:"), 
                    React.createElement("ul", {className: "list-unstyled"}, 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "mailto:mail@cesarvarela.com"}, "mail@cesarvarela.com")
                        ), 
                        React.createElement("li", null, 
                            React.createElement("a", {href: "tel:+598%2094%20085%20280"}, "+598 94 085 280")
                        ))))
        );
    };
    return Contact;
}(React.Component));
exports.Contact = Contact;
//# sourceMappingURL=Contact.js.map