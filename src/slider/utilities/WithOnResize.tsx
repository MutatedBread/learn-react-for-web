import * as _ from "lodash";
import * as React from "react";

export interface IWithOnResizeProps {
	children: (width: number, height: number) => JSX.Element;
	widthFactor: number;
	heightFactor: number;
	useWidthForHeight?: boolean;
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
		const nextWidth = window.innerWidth * props.widthFactor;
		const nextHeight =
			(props.useWidthForHeight ? window.innerWidth : window.innerHeight) *
			props.heightFactor;
		this.state = {
			height: nextHeight,
			width: nextWidth
		};
		this.onResize = _.debounce(this.onResize, 200);
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
		const { widthFactor, heightFactor, useWidthForHeight } = this.props;
		const nextWidth = window.innerWidth * widthFactor;
		const nextHeight =
			(useWidthForHeight ? window.innerWidth : window.innerHeight) *
			heightFactor;

		// tslint:disable-next-line:no-console
		console.log(useWidthForHeight ? window.innerWidth : window.innerHeight);
		this.setState((previous: State) => {
			return {
				height: nextHeight,
				width: nextWidth
			};
		});
	};
}
