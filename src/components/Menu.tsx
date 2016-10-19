import * as React from 'react'


export class Menu extends React.Component<{}, {}> {

    render() {
        return <section id="menu">
            <nav className="main">
                <ul>
                    <li className="active"><a href="#games">Games</a></li>
                    <li><a href="#apps">Apps</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
        </section>
    }
}
