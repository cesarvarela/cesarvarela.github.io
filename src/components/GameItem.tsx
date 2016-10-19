import * as React from 'react'

export interface GamesItemProps 
{
    title?: string,
    img?: string,
    description?: string,
    link?: string,
    linkDescription?: string
}

let context = require.context("../img/thumbs", true, /^\.\/.*\.png$/)

export class GamesItem extends React.Component<GamesItemProps, {}> {

    render() {
        return <div className="item clearfix">
            <div className="thumb">
                <img src={ context(this.props.img) } />
            </div>
            <div className="data">
                <h4>{ this.props.title }</h4>
                <h5>{ this.props.description }</h5>
                <a className="external-link" href={this.props.link} target="_blank"> { this.props.linkDescription }</a>
            </div>
        </div>
    }
}