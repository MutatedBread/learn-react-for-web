import * as React from "react";
import { Component } from "react";
import "./App.css";
import { Slider } from "./slider";
import WithOnResize from "./slider/utilities/WithOnResize";

class App extends Component {
	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Making a React Image Slider</h1>
				</header>
				<WithOnResize
					widthFactor={1}
					heightFactor={2 / 3}
					useWidthForHeight={true}
					maxHeight={540}
					maxWidth={720}
				>
					{(width: number, height: number) => (
						<Slider
							width={width}
							height={height}
							maxSwipeThreshold={width * 0.15}
							minSwipeThreshold={40}
							swipeTimeThreshold={200}
							images={[
								"https://www.chewy.com/petcentral/wp-content/uploads/2018/05/lucky-corgi-butts-x-596-444x.jpg",
								"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225919/Pembroke-Welsh-Corgi-On-White-01.jpg",
								"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG"
							]}
						/>
					)}
				</WithOnResize>
			</div>
		);
	}
}

export default App;
