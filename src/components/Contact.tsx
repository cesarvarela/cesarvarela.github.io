import * as React from 'react'


export class Contact extends React.Component<{}, {}> {

	render() {
		return <section id="contact">
			<p className="pre-heading">Communication is Key</p>
			<h2 className="line-heading">Contact</h2>

			<div className="content">
				<div className="row content-inner">
					<div className="vCard">
						<img src={ require<string>("../img/MECard.gif") } alt="qr con datos de contacto" />
						<p>
							Load this MECard with my contact info to your smartphone.
						</p>
					</div>
					<div className="comunicate">
						<div className="quoted-text">
							And don't be shy, send me a message:
						</div>
						<ul className="vias">
							<li>
								<a href="mailto:mail@cesarvarela.com">mail@cesarvarela.com</a>
							</li>
							<li>
								<a href="tel:+598%2094%20085%20280">+598 94 085 280</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	}
}