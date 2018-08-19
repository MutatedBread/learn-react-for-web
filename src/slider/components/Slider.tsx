import * as React from "react";
import "../styles/Slider.css";
import SliderButtonContainer from "./SliderButtonContainer";
import SliderCarousel from "./SliderCarousel";
import SlideSelector from "./SlideSelector";

export interface ISliderProps {
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

type Props = ISliderProps;
type State = ISliderState;

export default class Slider extends React.Component<Props, State> {
	public static defaultProps = {
		maxSwipeThreshold: 100,
		minSwipeThreshold: 50,
		swipeTimeThreshold: 200
	};

	constructor(props: Props) {
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
		const { width, height, images } = this.props;
		const { index, offsetX } = this.state;
		return (
			<div style={{ maxWidth: width }} className="MainContainer">
				<div
					style={{
						height,
						maxWidth: width
					}}
					className="CarouselContainer"
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
					/>
					<SliderCarousel
						height={height}
						width={width}
						images={images}
						offsetX={offsetX}
						index={index}
					/>
					<SlideSelector
						selectedIndex={index}
						onPress={this.slideSelected}
						numberOfSlide={images.length}
					/>
				</div>
			</div>
		);
	}

	public slideSelected = (index: number) => {
		this.setState((previous: State) => {
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
		this.setState((previous: State) => {
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
			this.setState((previous: State) => {
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

			this.setState((previous: State) => {
				return {
					dragging: false,
					index: nextIndex,
					offsetX: 0,
					startingX: 0
				};
			});
		} else {
			this.setState((previous: State) => {
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
