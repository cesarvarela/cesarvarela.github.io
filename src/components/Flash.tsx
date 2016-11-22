import * as React from 'react'

export interface FlashProps 
{
    swf: string,
}

let context = require.context("../flash", true, /^\.\/.*\.swf$/)

export class Flash extends React.Component<FlashProps, {}> {

    render() {
        return <object data={context<string>(this.props.swf)} type="application/x-shockwave-flash" width={'100%'} height={'100%'}>
            <param name="foo" value="bar" />
        </object>
    }
}