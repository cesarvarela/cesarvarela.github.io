import * as React from 'react'
import { Flash } from './flash'

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
                <div className="content">
                    <Flash swf={this.state.src} />
                </div>                  
            </div>
        }
        else {
            return <div />
        }
    }
}