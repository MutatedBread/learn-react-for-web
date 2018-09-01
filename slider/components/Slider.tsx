import * as React from "react";
import {
	ISlideExtraProps,
	ISliderButtonContainerExtraProps,
	ISliderCarouselExtraProps,
	ISliderSelectorContainerExtraProps,
	ISlideSelectorExtraProps
} from "../model";
import "../styles/Slider.css";
import SliderButtonContainer from "./SliderButtonContainer";
import SliderCarousel from "./SliderCarousel";
import SlideSelector from "./SlideSelector";

export interface ISliderProps
	extends ISliderButtonContainerExtraProps,
		ISlideSelectorExtraProps,
		ISlideExtraProps,
		ISliderSelectorContainerExtraProps,
		ISliderCarouselExtraProps {
	width: number;
	height: number;
	images: string[];
	maxSwipeThreshold?: number;
	minSwipeThreshold?: number;
	swipeTimeThreshold?: number;
}

export interface ISliderState {
	index: number;
	startingX: number;
	offsetX: number;
	dragging: boolean;
	dragStartTime: Date;
}

export default class Slider extends React.Component<
	ISliderProps,
	ISliderState
> {
	public static defaultProps = {
		maxSwipeThreshold: 100,
		minSwipeThreshold: 50,
		swipeTimeThreshold: 200
	};

	constructor(props: ISliderProps) {
		super(props);
		this.state = {
			dragStartTime: new Date(),
			dragging: false,
			index: 0,
			offsetX: 0,
			startingX: 0
		};
	}

	public render() {
		const {
			width,
			height,
			images,
			directionButtonStyle,
			leftDirectionButtonElement,
			rightDirectionButtonElement,
			selectorStyle,
			slideStyle,
			selectorContainerStyle,
			carouselStyle
		} = this.props;
		const { index, offsetX } = this.state;
		return (
			<div style={{ maxWidth: width }} className="Slider-Main-Container">
				<div
					style={{
						height,
						maxWidth: width,
						...carouselStyle
					}}
					className="Slider-Carousel-Container"
					onMouseDown={this.onMouseStart}
					onMouseMove={this.onMouseMove}
					onMouseUp={this.onMouseEnd}
					onMouseLeave={this.onMouseEnd}
					onTouchStart={this.onTouchStart}
					onTouchMove={this.onTouchMove}
					onTouchEnd={this.onTouchEnd}
					onTouchCancel={this.onTouchEnd}
				>
					<SliderButtonContainer
						leftButtonOnPress={this.toLeft}
						rightButtonOnPress={this.toRight}
						directionButtonStyle={directionButtonStyle}
						leftDirectionButtonElement={leftDirectionButtonElement}
						rightDirectionButtonElement={rightDirectionButtonElement}
					/>
					<SliderCarousel
						height={height}
						width={width}
						images={images}
						offsetX={offsetX}
						index={index}
						slideStyle={slideStyle}
					/>
					<SlideSelector
						selectedIndex={index}
						onPress={this.slideSelected}
						selectorContainerStyle={selectorContainerStyle}
						numberOfSlide={images.length}
						selectorStyle={selectorStyle}
					/>
				</div>
			</div>
		);
	}

	public slideSelected = (index: number) => {
		this.setState((previous: ISliderState) => {
			return { index };
		});
	};

	private onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		this.onSwipeStart(event.touches[0].clientX);
	};

	private onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		this.onSwipeMove(event.touches[0].clientX);
	};

	private onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
		this.onSwipeStop();
	};

	private onMouseStart = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		this.onSwipeStart(event.clientX);
	};

	private onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		this.onSwipeMove(event.clientX);
	};

	private onMouseEnd = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		this.onSwipeStop();
	};

	private onSwipeStart = (startPoint: number) => {
		const x = startPoint;
		this.setState((previous: ISliderState) => {
			return {
				dragStartTime: new Date(),
				dragging: true,
				startingX: x
			};
		});
	};

	private onSwipeMove = (currentPointX: number) => {
		const { length } = this.props.images;
		const { index, startingX } = this.state;
		const offsetX = currentPointX - startingX;
		const isSwipingLeftAtFirstSlide = offsetX > 0 && index === 0;
		const isSwipingRightAtLastSlide = offsetX < 0 && index === length - 1;
		if (
			this.state.dragging &&
			!isSwipingLeftAtFirstSlide &&
			!isSwipingRightAtLastSlide
		) {
			this.setState((previous: ISliderState) => {
				return { offsetX };
			});
		}
	};

	private onSwipeStop = () => {
		const { offsetX } = this.state;
		if (this.state.dragging && offsetX !== 0) {
			const maxSwipeThreshold = this.props.maxSwipeThreshold
				? this.props.maxSwipeThreshold
				: Slider.defaultProps.maxSwipeThreshold;
			const minSwipeThreshold = this.props.minSwipeThreshold
				? this.props.minSwipeThreshold
				: Slider.defaultProps.minSwipeThreshold;
			const swipeTimeThreshold = this.props.swipeTimeThreshold
				? this.props.swipeTimeThreshold
				: Slider.defaultProps.swipeTimeThreshold;

			const { images } = this.props;
			const { index, dragStartTime } = this.state;

			let nextIndex = index;

			const mouseEndTime = new Date();
			const elapsedTime = mouseEndTime.getTime() - dragStartTime.getTime();
			const numberOfImages = images.length;
			const isSwipingLeft = offsetX < 0;
			const isSwipingRight = offsetX > 0;

			const canSwipeLeft = isSwipingLeft && index < numberOfImages - 1;
			const canSwipeRight = isSwipingRight && index > 0;

			const isOffsetMoreThenMaxThreshold =
				Math.abs(offsetX) > maxSwipeThreshold;
			const isSwipingFast =
				Math.abs(offsetX) > minSwipeThreshold &&
				elapsedTime < swipeTimeThreshold;

			if (
				(isOffsetMoreThenMaxThreshold || isSwipingFast) &&
				(canSwipeLeft || canSwipeRight)
			) {
				if (isSwipingLeft) {
					nextIndex++;
				} else {
					nextIndex--;
				}
			}

			this.setState((previous: ISliderState) => {
				return {
					dragging: false,
					index: nextIndex,
					offsetX: 0,
					startingX: 0
				};
			});
		} else {
			this.setState((previous: ISliderState) => {
				return {
					dragging: false,
					startingX: 0
				};
			});
		}
	};

	private toLeft = () => {
		const { index } = this.state;
		if (index > 0) {
			this.setState((previous: ISliderState) => {
				return { index: --previous.index };
			});
		}
	};

	private toRight = () => {
		const { index } = this.state;
		const { images } = this.props;
		if (index < images.length - 1) {
			this.setState((previous: ISliderState) => {
				return { index: ++previous.index };
			});
		}
	};
}
