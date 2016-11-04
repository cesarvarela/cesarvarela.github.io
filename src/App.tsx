import * as React from 'react'
import {Header} from './components/Header'
import {Menu} from './components/Menu'
import {Games} from './components/Games'
import {Applications} from './components/Applications'
import {Contact} from './components/Contact'
import {About} from './components/About'
import {Footer} from './components/Footer'
import {SocialList, SocialItemProps} from './components/Social'

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

export class App extends React.Component<{}, {}> {
    render() {
        return  <div>
                    <Header />
                    <SocialList items={socialItems}></SocialList>
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