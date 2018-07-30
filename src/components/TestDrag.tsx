import * as React from "react";
import "../styles/TestDrag.css";

export interface ITestDragState {
	dragging: boolean;
	startingX: number;
	onTouchX: number;
	offsetX: number;
}

type State = ITestDragState;

export default class TestDrag extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			dragging: false,
			offsetX: 0,
			onTouchX: 0,
			startingX: 0
		};
	}

	public render() {
		const { offsetX, startingX } = this.state;
		return (
			<div
				className="TestDrag"
				onTouchStart={this.onTouchStart}
				onTouchEnd={this.onTouchEnd}
				onTouchCancel={this.onTouchEnd}
				onTouchMove={this.onTouchMove}
				onMouseDown={this.onMouseStart}
				onMouseMove={this.onMouseMove}
				onMouseUp={this.onMouseEnd}
				onMouseLeave={this.onMouseEnd}
				style={{
					transform: `translateX(${offsetX + startingX}px)`
				}}
			/>
		);
	}

	private onMouseStart = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		const x = event.clientX;
		this.setState((previous: State) => {
			return {
				dragging: true,
				onTouchX: x
			};
		});
	};

	private onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const x = event.clientX;
		if (this.state.dragging) {
			// tslint:disable-next-line:no-console
			console.log(`${x} : ${this.state.startingX}`);
			this.setState((previous: State) => {
				return {
					offsetX: x - previous.onTouchX
				};
			});
		}
	};

	private onMouseEnd = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (this.state.dragging) {
			this.setState((previous: State) => {
				return {
					dragging: false,
					offsetX: 0,
					onTouchX: 0,
					startingX: previous.offsetX + previous.startingX
				};
			});
		}
	};

	private onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		const x = event.touches[0].clientX;
		this.setState((previous: State) => {
			return {
				dragging: true,
				onTouchX: x
			};
		});
	};

	private onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		const x = event.touches[0].clientX;
		if (this.state.dragging) {
			this.setState((previous: State) => {
				return {
					offsetX: x - previous.onTouchX
				};
			});
		}
	};

	private onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
		this.setState((previous: State) => {
			return {
				dragging: false,
				offsetX: 0,
				startingX: previous.offsetX + previous.startingX
			};
		});
	};
}
