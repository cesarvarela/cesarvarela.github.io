"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var SkillItem_1 = require('./SkillItem');
var Section_1 = require('./Section');
var languages = [
    {
        name: "Javascript"
    },
    {
        name: "Typescript"
    },
    {
        name: "Swift"
    },
    {
        name: "C#"
    },
    {
        name: "ActionScript 3"
    },
    {
        name: "PHP"
    },
    {
        name: "GO"
    },
];
var frameworks = [
    {
        name: "React"
    },
    {
        name: "Angular"
    },
    {
        name: "Express"
    },
];
var platforms = [
    {
        name: "Node.js"
    },
    {
        name: "iOS"
    },
    {
        name: ".NET"
    },
    {
        name: "Unity 3D"
    },
    {
        name: "LAMP"
    }
];
var software = [
    {
        name: "Visual Studio/ VSCode"
    },
    {
        name: "Xcode"
    },
    {
        name: "Photoshop"
    },
    {
        name: "Unity 3D"
    },
    {
        name: "Sketch"
    },
    {
        name: "Chrome DEV tools"
    }
];
var About = (function (_super) {
    __extends(About, _super);
    function About() {
        _super.apply(this, arguments);
    }
    About.prototype.render = function () {
        return React.createElement(Section_1.Section, {id: "about", heading: "About", preHeading: "'cause everybody has a past", postHeading: "Something to say about me! (seems like one of those self-help questions)"}, 
            React.createElement("div", {className: "skills"}, 
                React.createElement("h3", null, "Skills"), 
                React.createElement("p", null, "Analysis, design and software development."), 
                React.createElement("h3", null, "Technologies"), 
                React.createElement("p", null, "Over the years I've worked on lots of different projects with different requirements and challenges, here is some of the tools that helped me get thorugh them."), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-3"}, 
                        React.createElement("h4", null, "Languages"), 
                        React.createElement("ul", null, languages.map(function (item) {
                            return React.createElement(SkillItem_1.SkillItem, {name: item.name});
                        }))), 
                    React.createElement("div", {className: "col-md-3"}, 
                        React.createElement("h4", null, "Frameworks/Libraries"), 
                        React.createElement("ul", null, frameworks.map(function (item) {
                            return React.createElement(SkillItem_1.SkillItem, {name: item.name});
                        }))), 
                    React.createElement("div", {className: "col-md-3"}, 
                        React.createElement("h4", null, "Stacks/Platforms"), 
                        React.createElement("ul", null, platforms.map(function (item) {
                            return React.createElement(SkillItem_1.SkillItem, {name: item.name});
                        }))), 
                    React.createElement("div", {className: "col-md-3"}, 
                        React.createElement("h4", null, "Software"), 
                        React.createElement("ul", null, software.map(function (item) {
                            return React.createElement(SkillItem_1.SkillItem, {name: item.name});
                        })))))
        );
    };
    return About;
}(React.Component));
exports.About = About;
//# sourceMappingURL=About.js.map