import * as React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ISliderButtonContainerExtraProps } from "../model";
import "../styles/SliderButtonContainer.css";

export interface ISliderButtonContainerProps
	extends ISliderButtonContainerExtraProps {
	leftButtonOnPress: () => any;
	rightButtonOnPress: () => any;
}

type Props = ISliderButtonContainerProps;

export default class SliderButtonContainer extends React.PureComponent<Props> {
	public render() {
		const {
			leftButtonOnPress,
			rightButtonOnPress,
			directionButtonStyle
		} = this.props;
		const defaultStyle = directionButtonStyle ? "" : "Slider-Button";
		return (
			<div className="Slider-Buttons-Container">
				<div className="Slider-Button-Container">
					<button
						onClick={leftButtonOnPress}
						className={`${defaultStyle} Slider-Button-Left`}
						style={directionButtonStyle}
					>
						{this.renderLeftButtonInner()}
					</button>
				</div>
				<div className="Slider-Button-Container">
					<button
						onClick={rightButtonOnPress}
						className={`${defaultStyle} Slider-Button-Right`}
						style={directionButtonStyle}
					>
						{this.renderRightButtonInner()}
					</button>
				</div>
			</div>
		);
	}

	private renderLeftButtonInner = () => {
		const { leftDirectionButtonElement } = this.props;
		if (!leftDirectionButtonElement) {
			return <FaAngleLeft className="Slider-Button-Icon" size="32px" />;
		}
		return leftDirectionButtonElement;
	};

	private renderRightButtonInner = () => {
		const { rightDirectionButtonElement } = this.props;
		if (!rightDirectionButtonElement) {
			return <FaAngleRight className="Slider-Button-Icon" size="32px" />;
		}
		return rightDirectionButtonElement;
	};
}
