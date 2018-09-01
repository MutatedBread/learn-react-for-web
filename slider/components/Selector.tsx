import * as React from "react";
import { ISlideSelectorExtraProps } from "../model";
import "../styles/Selector.css";

export interface ISelectorProps extends ISlideSelectorExtraProps {
	onPress: (index: number) => void;
	index: number;
	isSelected: boolean;
}

export default class Selector extends React.Component<ISelectorProps> {
	public render() {
		const { isSelected, selectorStyle } = this.props;
		const defautlStyle = selectorStyle ? "" : "Slider-Slide-Selector";
		const animationName = isSelected
			? "Slider-Slide-CurrentlySelected"
			: "Slider-Slide-CurrentlyNotSelected";
		return (
			<button
				className={`${defautlStyle} Slider-Slide-Selector-Default-Animation`}
				style={{
					animationName,
					...selectorStyle
				}}
				onClick={this.onClick}
			/>
		);
	}

	public onClick = () => {
		const { index, onPress } = this.props;
		onPress(index);
	};
}
