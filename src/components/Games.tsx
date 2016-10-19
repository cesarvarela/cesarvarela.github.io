import * as React from 'react'
import { GamesItem, GamesItemProps } from './GameItem'

export class Games extends React.Component<{}, {}> {

	render() {
		let games: GamesItemProps[] =
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

		let items = games.map((item, index) => {
			return <GamesItem key={index} title={item.title} description={item.description} img={item.img} link={item.link} />
		})

		return <section id="games">
			<p className="pre-heading">After all, life is a game</p>
			<h2 className="line-heading">Games</h2>
			<p className="sub-line-heading">
				We don't stop playing because we grow old; we grow old because we stop playing. (George Bernard Shaw)
			</p>
			<div className="content">
				<div className="items-list">
					{items}
				</div>
			</div>
		</section>
	}
}