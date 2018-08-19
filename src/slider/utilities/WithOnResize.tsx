// import * as _ from "lodash";
import * as React from "react";

export interface IWithOnResizeProps {
	children: (width: number, height: number) => JSX.Element;
	widthFactor: number;
	heightFactor: number;
	useWidthForHeight?: boolean;
	maxWidth?: number;
	maxHeight?: number;
}

export interface IWithOnResizeState {
	width: number;
	height: number;
}

type Props = IWithOnResizeProps;
type State = IWithOnResizeState;

export default class WithOnResize extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const nextWidth = this.getNextWidth();
		const nextHeight = this.getNextHeight();
		this.state = {
			height: nextHeight,
			width: nextWidth
		};
		// this.onResize = _.debounce(this.onResize, 200);
	}

	public componentDidMount() {
		window.addEventListener("resize", this.onResize);
	}

	public render() {
		const { children } = this.props;
		const { width, height } = this.state;
		return children(width, height);
	}

	private onResize = () => {
		const nextWidth = this.getNextWidth();
		const nextHeight = this.getNextHeight();
		this.setState((previous: State) => {
			return {
				height: nextHeight,
				width: nextWidth
			};
		});
	};

	private getNextWidth = () => {
		const { maxWidth, widthFactor } = this.props;
		let nextWidth = document.documentElement.clientWidth * widthFactor;
		if (maxWidth && nextWidth > maxWidth) {
			nextWidth = maxWidth;
		}
		return nextWidth;
	};

	private getNextHeight = () => {
		const { maxHeight, heightFactor, useWidthForHeight } = this.props;
		let nextHeight =
			(useWidthForHeight
				? document.documentElement.clientWidth
				: document.documentElement.clientHeight) * heightFactor;
		if (maxHeight && nextHeight > maxHeight) {
			nextHeight = maxHeight;
		}
		return nextHeight;
	};
}
