import * as React from 'react'
import { Flash } from './flash'
let flashdetect:any = require('flashdetect')

interface State {
    visible: boolean;
    src?: string;
}

export class Lightbox extends React.Component<{}, State> {

    constructor() {
        super()
        this.state =
            {
                visible: false
            }
    }

    show(src: string) {
        this.setState({ visible: true, src: src });
    }

    hide() {
        this.setState({ visible: false })
    }

    render() {

        if (this.state.visible) {
            return <div className="lightbox">
                <i className="fa fa-times-circle hide" aria-hidden="true" onClick={this.hide.bind(this)} />

                {flashdetect.getFlashVersion() > -1 &&
                    <div className="content">
                        <Flash swf={this.state.src} />
                    </div>                  
                }
                {flashdetect.getFlashVersion() == -1 &&
                    <div className="sorry">
                        <h4>Sorry this is old stuff, requires the Flash Plugin :)</h4>
                        <h6><a href="https://en.wikipedia.org/wiki/Adobe_Flash_Player" target="_blank">https://en.wikipedia.org/wiki/Adobe_Flash_Player</a></h6>
                    </div>                  
                }
            </div>
        }
        else {
            return <div />
        }
    }
}