import * as React from "react";
import "../styles/Slide.css";

export interface ISlideProps {
	url: string;
	height: string;
	width: string;
}

type Props = ISlideProps;

export default class Slide extends React.PureComponent<Props> {
	public render() {
		const { url, width, height } = this.props;
		return (
			<div className="Slide" style={{ width, height }}>
				<img style={{ width, height }} src={url} />
			</div>
		);
	}
}
