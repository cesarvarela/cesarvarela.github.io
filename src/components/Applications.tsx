import * as React from 'react'

export class Applications extends React.Component<{}, {}> {

	render() {
		return <section id="apps">
			<p className="pre-heading"></p>
			<h2 className="line-heading">Applications</h2>
			<p className="sub-line-heading">
				Making your life easier since 1984.
					</p>

			<div className="content">

				<div className="row content-inner">

					<div className="items-list">

						<div className="item clearfix">
							<div className="thumb">
								<img src="img/thumbs/thumb-chrome-extension.png" alt="thumb" />
							</div>
							<div className="data">
								<h4>Facebook Chat Alerts - Chrome Extension</h4>
								<h5>Looking to improve facebook UX, this extension shows a notification each time a user logs in. Just for fun project that does some interesting reverse ingenering / hijacking of the Facebook javascript (sorry Mark :D )</h5>
								<a className="external-link" href="https://chrome.google.com/webstore/detail/facebook-chat-alerts/fjcgebeagedmipkkhcdpdhlbgedbnabg" target="_blank">Check it out!</a>
							</div>
						</div>

						<div className="item clearfix">
							<div className="thumb">
								<img src="img/thumbs/thumb-chrome-extension.png" alt="thumb" />
							</div>
							<div className="data">
								<h4>Force PDF download - Chrome Extension</h4>
								<h5>Another just for fun project that does simply forces PDFs to be downbloaded instead of being opened in Chrome's PDF viewer.</h5>
								<a className="external-link" href="https://chrome.google.com/webstore/detail/force-pdf-download/imffgljnffhegncjffjccmnkdjbfmioe" target="_blank">Check it out!</a>
							</div>
						</div>

					</div>
				</div>
			</div>

		</section>
	}
}