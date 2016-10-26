import * as React from 'react'
import { MediaItem, MediaItemProps } from './MediaItem'
import { MediaList } from './MediaList'
import { Section } from './Section'

export class Games extends React.Component<{}, {}> {

	render() {
		let games: MediaItemProps[] =
			[
				{
					img: "./thumb-totems.png",
					title: "Comercial project - The day of the Totems",
					description: "Concept, design (graphics and gameplay), and development.",
					link: "http://thedayofthetotems.poandthemachines.com"
				},
				{
					img: "./thumb-beetubes.png",
					title: "Hobbie project - Beetubes",
					description: "Concept, design (graphics and gameplay), and development.",
					link: "http://thedayofthetotems.poandthemachines.com"
				},
				{
					img: "./thumb-eggs.png",
					title: "Hobbie project - Eggs",
					description: "Concept, design (graphics and gameplay), and development.",
					link: "http://thedayofthetotems.poandthemachines.com"
				},
				{
					img: "./thumb-feed-my-flytrap.png",
					title: "Hobbie project - Feed my flytrap",
					description: "Concept, design (graphics and gameplay), and development.",
					link: "http://thedayofthetotems.poandthemachines.com"
				},
				{
					img: "./thumb-burpycat.png",
					title: "Hobbie project - Burpycat",
					description: "Concept, design (graphics and gameplay), and development.",
					link: "http://thedayofthetotems.poandthemachines.com"
				}
			]

		return <Section id="games" preHeading="After all, life is a game" heading="Games" postHeading="We don't stop playing because we grow old; we grow old because we stop playing. (George Bernard Shaw)">
				<MediaList items={games} />
		</Section>
	}
}