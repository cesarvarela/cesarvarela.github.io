import * as React from 'react'

export class Footer extends React.Component<{}, {}> {

    render() {
        return <footer>
            <div className="validhtml">
                <a href="http://validator.w3.org/check?uri=http%3A%2F%2Fwww.cesarvarela.com%2F" target="_blank">
                    <img src="http://www.w3.org/html/logo/badge/html5-badge-h-css3-semantics.png" width="165" height="64" alt="HTML5 Powered with CSS3 / Styling, and Semantics" title="HTML5 Powered with CSS3 / Styling, and Semantics" />
                </a>
                <p>
                    The markup of this page is valid HTML5 :)
			    </p>
            </div>
            <p className="copy">2012 - Cesar Varela</p>
        </footer>
    }
}