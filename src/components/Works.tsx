import * as React from 'react'
import { Section } from './Section'


let context = require.context("../img/thumbs", true, /^\.\/.*\.png$/)


export interface WorksProps {
	items: WorkItemProps[];
	lightboxCallback?:(item:string) => void;
}

export interface WorkItemProps {
	title?: string,
	img?: string,
	description?: string,
	link?: string,
	linkDescription?: string
}

export class Works extends React.Component<WorksProps, {}> {

	itemClick(e:React.MouseEvent<HTMLAnchorElement>, item:WorkItemProps) 
	{
		if(item.link.indexOf('swf') > -1)
		{
			e.preventDefault();
			this.props.lightboxCallback(item.link);
		}
	}

	render() {

		return <Section id="games" preHeading="" heading="My Works" postHeading="Stuff I've worked on over the years ">
			<ul className="media-list">
				{this.props.items.map((item, index) => {
					return <li className="media mt-2">
						<a className="media-left" href={item.link} target="_blank" onClick={e => this.itemClick(e, item)}>
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