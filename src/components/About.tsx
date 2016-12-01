import * as React from 'react'
import { SkillItem, SkillItemProps } from './SkillItem'
import { Section } from './Section'

let languages: SkillItemProps[] =
    [
        {
            name: "Javascript"
        },
        {
            name: "Typescript"
        },
        {
            name: "Swift"
        },
        {
            name: "C#"
        },
        {
            name: "ActionScript 3"
        },
        {
            name: "PHP"
        },
        {
            name: "GO"
        },
    ]

let frameworks: SkillItemProps[] =
    [
        {
            name: "React"
        },
        {
            name: "Angular"
        },
        {
            name: "Express"
        },
    ]

let platforms: SkillItemProps[] =
    [
        {
            name: "Node.js"
        },
        {
            name: "iOS"
        },
        {
            name: ".NET"
        },
        {
            name: "Unity 3D"
        },
        {
            name: "LAMP"
        }
    ]

let software: SkillItemProps[] =
    [
        {
            name: "Visual Studio/ VSCode"
        },
        {
            name: "Xcode"
        },
        {
            name: "Photoshop"
        },
        {
            name: "Unity 3D"
        },
        {
            name: "Sketch"
        },
        {
            name: "Chrome DEV tools"
        }
    ]

export class About extends React.Component<{}, {}> {

    render() {
        return <Section id="about" heading="About" preHeading="'cause everybody has a past" postHeading="Something to say about me! (seems like one of those self-help questions)">
            <div className="skills">
                <h3>Skills</h3>
                <p>Analysis, design and software development.</p>

                <h3>Technologies</h3>
                <p>Over the years I've worked on lots of different projects with different requirements and challenges, here is some of the tools that helped me get thorugh them.</p>

                <div className="row">
                    <div className="col-md-3">
                        <h4>Languages</h4>
                        <ul>
                            {
                                languages.map((item, index) => {
                                    return <SkillItem name={item.name} key={index} />
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>Frameworks/Libraries</h4>
                        <ul>
                            {
                                frameworks.map((item) => {
                                    return <SkillItem name={item.name} />
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>Stacks/Platforms</h4>
                        <ul>
                            {
                                platforms.map((item) => {
                                    return <SkillItem name={item.name} />
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4>Software</h4>
                        <ul>
                            {
                                software.map((item) => {
                                    return <SkillItem name={item.name} />
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <h3 className="cv"><a target="_blank" href="/assets/curriculum.pdf">
                You can also download my CV here <i className="fa fa-arrow-circle-down" aria-hidden="true"></i></a>
            </h3>
        </Section>
    }
}