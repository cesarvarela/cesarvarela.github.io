import * as React from 'react'

export class Footer extends React.Component<{}, {}> {

    render() {
        return <footer>
            <p>Built using TypeScript, REACT, Webpack, SASS, etc. and the beautiful VSCode
            <br />
            You can check the source <a href="https://github.com/cesarvarela/cesarvarela.github.io/tree/src" target="_blank">here</a></p>
            <p className="text-muted">© 2016 Cesar Varela</p>
        </footer>
    }
}