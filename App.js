"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Header_1 = require('./components/Header');
var Menu_1 = require('./components/Menu');
var Contact_1 = require('./components/Contact');
var About_1 = require('./components/About');
var Footer_1 = require('./components/Footer');
var Social_1 = require('./components/Social');
var Projects_1 = require('./components/Projects');
var Works_1 = require('./components/Works');
var socialItems = [
    {
        key: 'stack-overflow',
        description: 'Stack Overflow',
        link: 'http://stackoverflow.com/users/1030208/cesar-varela'
    },
    {
        key: 'linkedin',
        description: 'Linkedin',
        link: 'https://www.linkedin.com/in/cesarluisvarela'
    },
    {
        key: 'github',
        description: 'Github',
        link: 'https://github.com/cesarvarela'
    },
    {
        key: 'lastfm',
        description: 'Lastfm',
        link: 'http://www.last.fm/user/elcesarpo'
    },
    {
        key: 'facebook',
        description: 'Facebook',
        link: 'https://www.facebook.com/elcesarpo'
    },
    {
        key: 'twitter',
        description: 'Twitter',
        link: 'https://twitter.com/cesarpo'
    },
];
var projectItems = [
    {
        key: 'poatm',
        link: 'https://poandthemachines.com',
        img: './poatm.png',
        title: 'Po and the machines',
        description: "This is where I host all my personal projects. I do all the design and development over there, please check it out and try my games!",
    },
    {
        key: 'tbm',
        link: 'https://thebotmakers',
        img: './tbm.png',
        title: 'The Bot Makers',
        description: "A chatbots development studio I've started along with some friends. Need a chatbot? Don't hesitate and talk with us!",
    }
];
var works = [
    {
        img: "./thumb-kavachess.png",
        title: "Kava Chess",
        description: "Concept, design (graphics and gameplay), and development.",
        link: "https://itunes.apple.com/us/app/kava-chess/id1143682673"
    },
    {
        img: "./thumb-stealthy.png",
        title: "Stealhty - Work in progress",
        description: "Concept, design (graphics and gameplay), and development.",
        link: "https://poandthemachines.com/stealthy/"
    },
    {
        img: "./thumb-totems.png",
        title: "The day of the Totems",
        description: "Concept, design (graphics and gameplay), and development.",
        link: "https://poandthemachines.com/thedayofthetotems/"
    },
    {
        img: "./thumb-beetubes.png",
        title: "Beetubes",
        description: "Concept, design (graphics and gameplay), and development.",
        link: "http://thedayofthetotems.poandthemachines.com"
    },
    {
        img: "./thumb-eggs.png",
        title: "Eggs",
        description: "Concept, design (graphics and gameplay), and development.",
        link: "http://thedayofthetotems.poandthemachines.com"
    },
    {
        img: "./thumb-feed-my-flytrap.png",
        title: "Feed my flytrap",
        description: "Concept, design (graphics and gameplay), and development.",
        link: "http://thedayofthetotems.poandthemachines.com"
    },
    {
        img: "./thumb-burpycat.png",
        title: "Burpycat",
        description: "Concept, design (graphics and gameplay), and development.",
        link: "http://thedayofthetotems.poandthemachines.com"
    }
];
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return React.createElement("div", null, 
            React.createElement(Header_1.Header, null), 
            React.createElement("hr", {className: "dot"}), 
            React.createElement(Menu_1.Menu, null), 
            React.createElement("hr", {className: "dot"}), 
            React.createElement(Projects_1.Projects, {items: projectItems}), 
            React.createElement(Works_1.Works, {items: works}), 
            React.createElement(About_1.About, null), 
            React.createElement(Social_1.Social, {items: socialItems}), 
            React.createElement(Contact_1.Contact, null), 
            React.createElement(Footer_1.Footer, null));
    };
    return App;
}(React.Component));
exports.App = App;
//# sourceMappingURL=App.js.map