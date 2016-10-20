import * as React from 'react'
import * as $ from 'jquery'
import * as classnames from 'classnames'

interface MenuItem {
    text: string;
    href: string;
    active: boolean;
}

interface State {
    sticky?: boolean;
    menu?: MenuItem[];
}

export class Menu extends React.Component<{}, State> {

    menuDom: HTMLElement;
    menuTop: number;
    menuHeight: number;
    windowTop: number;

    constructor() {
        super()
        this.state =
            {
                sticky: false,
                menu:
                [
                    { text: 'Games', href: '#games', active: false },
                    { text: 'Apps', href: '#apps', active: false },
                    { text: 'Contact', href: '#contact', active: false },
                    { text: 'About', href: '#about', active: false }
                ]
            }
    }

    componentDidMount() {

        this.windowTop = $(window).scrollTop()
        this.menuTop = $(this.menuDom).offset().top
        this.menuHeight = $(this.menuDom).height()

        window.addEventListener('scroll', this.handleScroll.bind(this))
    }

    componentWillUnMount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    handleScroll() {

        this.windowTop = $(window).scrollTop();

        if (this.windowTop - this.menuHeight > this.menuTop) {
            this.setState({ sticky: true })
        }
        else {
            this.setState({ sticky: false })
        }

        let last: MenuItem;

        this.state.menu.forEach((item) => {
            if (this.windowTop > $(item.href).offset().top) {
                last = item;
            }
        })

        this.state.menu.forEach((item) => {
            item.active = item == last
        })

        this.setState({ menu: this.state.menu })
    }

    render() {

        let classes = classnames("main", { sticky: this.state.sticky });
        let items = this.state.menu.map((item) => {
            return <li key={item.href} className={classnames({ active: item.active })}><a href={item.href}>{item.text}</a></li>
        })

        return <section id="menu" onScroll={this.handleScroll}>
            <nav className={classes} ref={(c) => this.menuDom = c}>
                <ul>
                    {items}
                </ul>
            </nav>
        </section>
    }
}
