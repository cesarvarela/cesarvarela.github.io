import * as React from 'react'
import { MediaItemProps } from './MediaItem'
import { MediaList } from './MediaList'
import { Section } from './Section'

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

		return <Section id="apps" heading="Applications" postHeading="Making your life easier since 1984.">
			<MediaList items={apps} />
		</Section>
	}
}