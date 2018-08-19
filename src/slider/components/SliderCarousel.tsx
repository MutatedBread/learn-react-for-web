import * as React from "react";
import "../styles/SliderCarousel.css";
import Slide from "./Slide";

// tslint:disable-next-line:no-empty-interface
export interface ISliderCarouserProps {
	images: string[];
	index: number;
	height: number;
	width: number;
	offsetX: number;
}

type Props = ISliderCarouserProps;

export default class SliderCarousel extends React.PureComponent<Props> {
	public render() {
		const { height, width, index, offsetX } = this.props;
		return (
			<div
				style={{
					height,
					transform: `translateX(-${index * width - offsetX}px)`,
					transition: offsetX !== 0 ? `none` : `transform 0.1s ease-in-out`
				}}
				className="Slider-Carousel"
			>
				{this.renderCarousel()}
			</div>
		);
	}
	private renderCarousel = () => {
		const { images } = this.props;
		const slides = [] as JSX.Element[];
		for (let i = 0; i < images.length; i++) {
			slides.push(this.renderSlide(images[i], i));
		}
		return slides;
	};

	private renderSlide = (url: string, index: number) => {
		const { width, height } = this.props;
		return (
			<Slide
				key={`Slider-${index}`}
				url={url}
				width={`${width}px`}
				height={`${height}px`}
			/>
		);
	};
}
