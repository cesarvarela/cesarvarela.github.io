import * as React from 'react'

export interface SkillItemProps 
{
    name?: string,
    img?: string,
    description?: string,
    link?: string,
    linkDescription?: string
}

export class SkillItem extends React.Component<SkillItemProps, {}> {

    render() {
        return <li> { this.props.name } </li>
    }
}