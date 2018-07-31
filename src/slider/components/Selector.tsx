import * as React from "react";
import "../styles/Selector.css";

export interface ISelectorProps {
	onPress: (index: number) => void;
	index: number;
	isSelected: boolean;
}

type Props = ISelectorProps;

export default class Selector extends React.Component<Props> {
	public render() {
		const { isSelected } = this.props;
		const animationName = isSelected
			? "CurrentlySelected"
			: "CurrentlyNotSelected";
		return (
			<button
				className="Selector"
				style={{
					animationName
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
