import * as React from 'react'
import {SkillItem, SkillItemProps} from './SkillItem'

let languages:SkillItemProps[] = 
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

let frameworks:SkillItemProps[] = 
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

let platforms:SkillItemProps[] = 
[
    {
        name: "Node.js"
    },
    {
        name: "iOS/Xcode"
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

export class About extends React.Component<{}, {}> {

    render() {
        return <section id="about">
            <p className="pre-heading">'Cause everybody has a past</p>
            <h2 className="line-heading">About</h2>
            <p className="sub-line-heading">
                Something to say about me! (seems like one of those self-help questions)
		    </p>

            <div className="content">
                <div className="skills">
                    <h4>Skills</h4>
                    <p>
                        Analysis, design and software development.
				    </p>
                    <h4>Technologies</h4>
                    <div>
                        <div>
                            <b>Languages</b>
                            <ul>
                                {
                                    languages.map((item) => 
                                    {
                                        return <SkillItem name={item.name} />
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <b>Frameworks/Libraries</b>
                            <ul>
                                {
                                    frameworks.map((item) => 
                                    {
                                        return <SkillItem name={item.name} />
                                    })
                                }
                            </ul>
                        </div>

                        <div>
                            <b>Development stacks/Platforms</b>
                            <ul>
                                {
                                    platforms.map((item) => 
                                    {
                                        return <SkillItem name={item.name} />
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="socialize">
                    <h4>Socialize with me</h4>
                </div>
            </div>
        </section>
    }
}