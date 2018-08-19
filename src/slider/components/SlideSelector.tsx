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
			<div className="SlideSelectorContainer">
				{this.renderSlideSelectors()}
			</div>
		);
	}

	private renderSlideSelectors = () => {
		const { numberOfSlide, selectedIndex } = this.props;
		const selectors = [] as JSX.Element[];
		for (let i = 0; i < numberOfSlide; i++) {
			selectors.push(
				<Selector
					key={`Selector-${i}`}
					index={i}
					isSelected={selectedIndex === i}
					onPress={this.props.onPress}
				/>
			);
		}
		return selectors;
	};
}
