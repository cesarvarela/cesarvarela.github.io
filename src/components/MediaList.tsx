import * as React from 'react'
import { MediaItem, MediaItemProps } from './MediaItem'

interface Props {
    items: MediaItemProps[];
}

export class MediaList extends React.Component<Props, {}> {

    render() {
        return <div className="items-list">
            {
                this.props.items.map((item, index) => {
                    return <MediaItem key={index} title={item.title} description={item.description} img={item.img} link={item.link} linkDescription={item.linkDescription} />
                })
            }
        </div>
    }
}