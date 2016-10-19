import * as React from 'react'

export class Header extends React.Component<{}, {}> {

	render() {
		return <section id="head">
			<h1>Cesar Varela</h1>
			<img className="po" src={ require("../img/po.png") } alt="po face" />
			<hr className="dot" />
			<p className="po-quote">
				Hi, my name is Cesar Varela, this is my personal website,
				scroll down to know a little more about me or visit my <a href="blog" target="_blank" className="float">blog</a>
			</p>
		</section>
	}
}