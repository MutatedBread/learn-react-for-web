import * as React from "react";
import "../styles/SlideSelector.css";
import Selector from "./Selector";

export interface ISlideSelectorProps {
	numberOfSlide: number;
	selectedIndex: number;
	onPress: (index: number) => void;
}

type Props = ISlideSelectorProps;

export default class SlideSelector extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
	}

	public render() {
		return (
			<div className="Slider-Slide-Selectors-Container">
				{this.renderSlideSelectors()}
			</div>
		);
	}

	private renderSlideSelectors = () => {
		const { numberOfSlide, selectedIndex } = this.props;
		const selectors = [] as JSX.Element[];
		for (let i = 0; i < numberOfSlide; i++) {
			selectors.push(
				<div key={`Selector-${i}`} className="Slider-Slide-Selector-Container">
					<Selector
						index={i}
						isSelected={selectedIndex === i}
						onPress={this.props.onPress}
					/>
				</div>
			);
		}
		return selectors;
	};
}
