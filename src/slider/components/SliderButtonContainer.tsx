import * as React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../styles/SliderButtonContainer.css";

export interface ISliderButtonContainerProps {
	leftButtonOnPress: () => any;
	rightButtonOnPress: () => any;
}

type Props = ISliderButtonContainerProps;

export default class SliderButtonContainer extends React.PureComponent<Props> {
	public render() {
		const { leftButtonOnPress, rightButtonOnPress } = this.props;
		return (
			<div className="Slider-ButtonContainer">
				<button onClick={leftButtonOnPress} className="Slider-Button">
					<FaAngleLeft className="Slider-Button-Icon" size="32px" />
				</button>
				<button onClick={rightButtonOnPress} className="Slider-Button">
					<FaAngleRight className="Slider-Button-Icon" size="32px" />
				</button>
			</div>
		);
	}
}
