import * as React from 'react'
import { Header } from './components/Header'
import { Menu } from './components/Menu'
import { Contact } from './components/Contact'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Social, SocialItemProps } from './components/Social'
import { ProjectItemProps, Projects } from './components/Projects'
import { Works, WorkItemProps } from './components/Works'
import { Flash } from './components/flash'
import { Lightbox } from './components/Lightbox'

let socialItems: SocialItemProps[] =
    [
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
    ]


let projectItems: ProjectItemProps[] =
    [
        {
            key: 'poatm',
            link: 'https://poandthemachines.com',
            img: './poatm.png',
            title: 'Po and the machines',
            description: `This is where I host all my personal projects. I do all the design and development over there, please check it out and try my games!`,
        },
        {
            key: 'tbm',
            link: 'https://thebotmakers',
            img: './tbm.png',
            title: 'The Bot Makers',
            description: `A chatbots development studio I've started along with some friends. Need a chatbot? Don't hesitate and talk with us!`,
        }
    ]


let works: WorkItemProps[] =
    [
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
            link: "./beetubes.swf"
        },
        {
            img: "./thumb-eggs.png",
            title: "Eggs",
            description: "Concept, design (graphics and gameplay), and development.",
            link: "./eggs.swf"
        },
        {
            img: "./thumb-feed-my-flytrap.png",
            title: "Feed my flytrap",
            description: "Concept, design (graphics and gameplay), and development.",
            link: "./feedmyflytrap.swf"
        },
        {
            img: "./thumb-burpycat.png",
            title: "Burpycat",
            description: "Concept, design (graphics and gameplay), and development.",
            link: "./burpycat.swf"
        }
    ]

export class App extends React.Component<{}, {}> {

    lightbox: Lightbox;

    showInLightbox(src: string) {

        this.lightbox.show(src)
    }

    render() {
        return <div>
            <Header />
            <hr className="dot" />
            <Menu />
            <hr className="dot" />
            <Projects items={projectItems} />
            <Works items={works} lightboxCallback={this.showInLightbox.bind(this)} />
            <About />
            <Social items={socialItems} />
            <Contact />
            <Footer />
            <Lightbox ref={r => this.lightbox = r} />
        </div>
    }
}