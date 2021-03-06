import * as React from "react";
import { ISlideExtraProps } from "../model";
import "../styles/SliderCarousel.css";
import Slide from "./Slide";

// tslint:disable-next-line:no-empty-interface
export interface ISliderCarouselProps extends ISlideExtraProps {
	images: string[];
	index: number;
	height: number;
	width: number;
	offsetX: number;
}
export default class SliderCarousel extends React.PureComponent<
	ISliderCarouselProps
> {
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
		const { width, height, slideStyle } = this.props;
		return (
			<Slide
				key={`Slider-${index}`}
				url={url}
				width={`${width}px`}
				height={`${height}px`}
				slideStyle={slideStyle}
			/>
		);
	};
}
