import * as React from 'react'
import {Header} from './components/Header'
import {Menu} from './components/Menu'
import {Games} from './components/Games'
import {Applications} from './components/Applications'
import {Contact} from './components/Contact'
import {About} from './components/About'
import {Footer} from './components/Footer'

export class App extends React.Component<{}, {}> {
    render() {
        return  <div>
                    <Header />
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