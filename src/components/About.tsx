import * as React from 'react'

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
                                <li>Javascript</li>
                                <li>C#</li>
                                <li>ActionScript 3</li>
                                <li>HTML5/CSS</li>
                                <li>PHP</li>
                                <li>SQL</li>
                                <li>Java</li>
                            </ul>
                        </div>
                        <div>
                            <b>Frameworks/Libraries</b>
                            <ul>
                                <li>ASP.NET MVC 4</li>
                                <li>Jquery</li>
                                <li>Backbone</li>
                                <li>Knockout</li>
                                <li>Drupal</li>
                                <li>Sencha Touch</li>
                                <li>Apache Cordova (ex Phonegap)</li>
                            </ul>
                        </div>

                        <div>
                            <b>Development stacks/Platforms</b>
                            <ul>
                                <li>ASP.NET</li>
                                <li>LAMP</li>
                                <li>Unity3d</li>
                                <li>Adobe Flash</li>
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