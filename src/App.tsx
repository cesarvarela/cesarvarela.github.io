import * as React from 'react'
import { Header } from './components/Header'
import { Menu } from './components/Menu'
import { Games } from './components/Games'
import { Applications } from './components/Applications'
import { Contact } from './components/Contact'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { SocialList, SocialItemProps } from './components/Social'
import { ProjectItemProps, Projects } from './components/Projects'

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

export class App extends React.Component<{}, {}> {
    render() {
        return <div>
            <Header />
            <hr className="dot" />
            <Projects items={projectItems} />
            <SocialList items={socialItems} />
            <Menu />
            <hr className="dot" />
            <Games />
            <Applications />
            <Contact />
            <About />
            <Footer />
        </div>
    }
}