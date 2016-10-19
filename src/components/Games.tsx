import * as React from 'react'


export class Games extends React.Component<{}, {}> {

	render() {
		return <section id="games">

			<p className="pre-heading">After all, life is a game</p>

			<h2 className="line-heading">Games</h2>
			<p className="sub-line-heading">
				We don't stop playing because we grow old; we grow old because we stop playing. (George Bernard Shaw)
			</p>
			<div className="content">
				<div className="items-list">

					<div className="item clearfix">
						<div className="thumb">
							<img src="img/thumbs/thumb-totems.png" alt="thumb juego beetubes" />
						</div>
						<div className="data">
							<h4>Comercial project - The day of the Totems</h4>
							<h5>Concept, design (graphics and gameplay), and development. </h5>
							<a className="external-link" href="http://thedayofthetotems.poandthemachines.com" target="_blank">Visit the game oficial webpage!</a>
						</div>
					</div>

					<div className="item clearfix">
						<div className="thumb">
							<img src="img/thumbs/thumb-beetubes.png" alt="thumb juego beetubes" />
						</div>
						<div className="data">
							<h4>Hobbie project - Beetubes</h4>
							<h5>Concept, design (graphics and gameplay), and development.</h5>
							<a className="external-link fancybox" data-lightbox='{"width": 800, "height": 460, "title": "Beetubes"}' href="games/beetubes/beetubes.swf" target="_blank">Play!</a>
						</div>
					</div>
					<div className="item clearfix">
						<div className="thumb">
							<img src="img/thumbs/thumb-eggss.png" alt="thumb juego eggs" />
						</div>
						<div className="data">
							<h4>Hobbie project - Eggs</h4>
							<h5>Concept, design (graphics and gameplay), and development.</h5>
							<a className="external-link fancybox" data-lightbox='{"width": 635, "height": 460, "title": "Eggs"}' href="games/eggs/eggs.swf" target="_blank">Play!</a>
						</div>
					</div>
					<div className="item clearfix">
						<div className="thumb">
							<img src="img/thumbs/thumb-feed-my-flytrap.png" alt="thumb feed my flytrap" />
						</div>
						<div className="data">
							<h4>Hobbie project - Feed my flytrap</h4>
							<h5>Concept, design (graphics and gameplay), and development.</h5>
							<a className="external-link fancybox" data-lightbox='{"width": 635, "height": 460, "title": "Feed my flytrap"}' href="games/feed-my-flytrap/feed_my_flytrap.swf" target="_blank">Play!</a>
						</div>
					</div>
					<div className="item clearfix">
						<div className="thumb">
							<img src="img/thumbs/thumb-burpycat.png" alt="thumb burpycat" />
						</div>
						<div className="data">
							<h4>Hobbie project - Burpycat</h4>
							<h5>Concept, design (graphics and gameplay), and development.</h5>
							<a className="external-link fancybox" data-lightbox='{"width": 635, "height": 460, "title": "Burpycat"}' href="games/burpycat/burpycat2.swf" target="_blank">Play!</a>
						</div>
					</div>
				</div>
			</div>

		</section>
	}
}