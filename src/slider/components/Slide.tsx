import * as React from "react";
import { ISlideExtraProps } from "../model";
import "../styles/Slide.css";

export interface ISlideProps extends ISlideExtraProps {
	url: string;
	height: string;
	width: string;
}

type Props = ISlideProps;

export default class Slide extends React.PureComponent<Props> {
	public render() {
		const { url, width, height, slideStyle } = this.props;
		return (
			<div className="Slider-Slide">
				<img style={{ width, height, ...slideStyle }} src={url} />
			</div>
		);
	}
}
