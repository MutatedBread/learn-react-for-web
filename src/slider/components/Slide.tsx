import * as React from "react";
import "../styles/Slide.css";

export interface ISlideProps {
	url: string;
	height: string;
	width: string;
}

// tslint:disable-next-line:no-empty-interface
export interface ISlideState {}

type Props = ISlideProps;
type State = ISlideState;

export default class Slide extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
	}

	public render() {
		const { url, width, height } = this.props;
		return (
			<div className="Slide" style={{ width, height }}>
				<img style={{ width, height }} src={url} />
			</div>
		);
	}
}
