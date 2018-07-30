import * as React from "react";
import "../styles/Slider.css";
import Slide from "./Slide";

export interface ISliderProps {
	width: string;
	height: string;
	images: string[];
}

// tslint:disable-next-line:no-empty-interface
export interface ISliderState {
	index: number;
}

type Props = ISliderProps;
type State = ISliderState;

export default class Slider extends React.Component<Props, State> {
	private carouselRef: React.RefObject<HTMLDivElement>;

	constructor(props: Props) {
		super(props);
		this.carouselRef = React.createRef<HTMLDivElement>();
		this.state = {
			index: 0
		};
	}

	public render() {
		const { width, height } = this.props;
		const { index } = this.state;
		return (
			<div className="MainContainer">
				<div onClick={this.toLeft} className="ButtonContainer">
					<button className="Button">
						<p>Previous</p>
					</button>
				</div>
				<div
					style={{
						height,
						width
					}}
					className="CarouselContainer"
				>
					<div
						ref={this.carouselRef}
						style={{
							height,
							transform: `translateX(-${index * parseInt(width, 10)}px)`
						}}
						className="Carousel"
					>
						{this.renderCarousel()}
					</div>
				</div>
				<div onClick={this.toRight} className="ButtonContainer">
					<button className="Button">
						<p>Next</p>
					</button>
				</div>
			</div>
		);
	}

	private renderSlide = (url: string, index: number) => {
		const { width, height } = this.props;
		return (
			<Slide key={`Slider-${index}`} url={url} width={width} height={height} />
		);
	};

	private renderCarousel = () => {
		const { images } = this.props;
		const slides = [] as JSX.Element[];
		for (let i = 0; i < images.length; i++) {
			slides.push(this.renderSlide(images[i], i));
		}
		return slides;
	};

	private toLeft = () => {
		const { index } = this.state;
		if (index >= 0) {
			this.setState((previous: State) => {
				return { index: --previous.index };
			});
		}
	};

	private toRight = () => {
		const { index } = this.state;
		const { images } = this.props;
		if (index < images.length - 1) {
			this.setState((previous: State) => {
				return { index: ++previous.index };
			});
		}
	};
}
