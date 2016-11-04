import * as React from 'react'
import { Section } from './Section'

export class Contact extends React.Component<{}, {}> {

	render() {
		return <Section id="contact" preHeading="Communication is Key" heading="Contact">
				<div className="vCard">
					<img src={require<string>("../img/MECard.gif")} alt="qr con datos de contacto" />
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
		</Section>
	}
}