import * as React from 'react'
import { Section } from './Section'


let context = require.context("../img/thumbs", true, /^\.\/.*\.png$/)


export interface WorksProps {
	items: WorkItemProps[];
}

export interface WorkItemProps {
	title?: string,
	img?: string,
	description?: string,
	link?: string,
	linkDescription?: string
}

export class Works extends React.Component<WorksProps, {}> {

	render() {

		return <Section id="games" preHeading="" heading="My Works" postHeading="Stuff I've worked on over the years ">
			<ul className="media-list">
				{this.props.items.map((item, index) => {
					return <li className="media mt-2">
						<a className="media-left" href={item.link} target="_blank">
							<img className="media-object rounded" src={context<string>(item.img)} />
						</a>

						<div className="media-body">
							<h4 className="media-heading">{item.title}</h4>
							{item.description}
							<h5><a href={item.link} target="_blank">{item.linkDescription ? item.linkDescription : "more"}</a></h5>
						</div>
					</li>
				})}
			</ul>
		</Section>
	}
}