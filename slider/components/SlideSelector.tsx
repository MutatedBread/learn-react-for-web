import * as React from "react";
import {
	ISliderSelectorContainerExtraProps,
	ISlideSelectorExtraProps
} from "../model";
import "../styles/SlideSelector.css";
import Selector from "./Selector";

export interface ISlideSelectorProps
	extends ISlideSelectorExtraProps,
		ISliderSelectorContainerExtraProps {
	numberOfSlide: number;
	selectedIndex: number;
	onPress: (index: number) => void;
}
export default class SlideSelector extends React.PureComponent<
	ISlideSelectorProps
> {
	constructor(props: ISlideSelectorProps) {
		super(props);
	}

	public render() {
		const { selectorContainerStyle } = this.props;
		return (
			<div
				className="Slider-Slide-Selectors-Container"
				style={selectorContainerStyle}
			>
				{this.renderSlideSelectors()}
			</div>
		);
	}

	private renderSlideSelectors = () => {
		const { numberOfSlide, selectedIndex, selectorStyle } = this.props;
		const selectors = [] as JSX.Element[];
		for (let i = 0; i < numberOfSlide; i++) {
			selectors.push(
				<div key={`Selector-${i}`} className="Slider-Slide-Selector-Container">
					<Selector
						index={i}
						isSelected={selectedIndex === i}
						onPress={this.props.onPress}
						selectorStyle={selectorStyle}
					/>
				</div>
			);
		}
		return selectors;
	};
}
