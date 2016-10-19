import * as React from 'react'
import { MediaItemProps } from './MediaItem'
import { MediaList } from './MediaList'

export class Applications extends React.Component<{}, {}> {

	render() {

		let apps: MediaItemProps[] =
			[
				{
					img: "./thumb-chrome-extension.png",
					title: "Force PDF download - Chrome Extension",
					description: "Another just for fun project that does simply forces PDFs to be downbloaded instead of being opened in Chrome's PDF viewer.",
					link: "https://chrome.google.com/webstore/detail/force-pdf-download/imffgljnffhegncjffjccmnkdjbfmioe",
					linkDescription: "Check it out!"
				}
			]

		return <section id="apps">
			<p className="pre-heading"></p>
			<h2 className="line-heading">Applications</h2>
			<p className="sub-line-heading">
				Making your life easier since 1984.
			</p>

			<div className="content">
				<div className="row content-inner">
					<MediaList items={apps} />
				</div>
			</div>

		</section>
	}
}