import * as React from "react";

export interface ISliderButtonContainerExtraProps {
	directionButtonStyle?: React.CSSProperties;
	leftDirectionButtonElement?: React.ReactElement<any> | JSX.Element;
	rightDirectionButtonElement?: React.ReactElement<any> | JSX.Element;
}

export interface ISliderCarouselExtraProps {
	carouselStyle?: React.CSSProperties;
}

export interface ISliderSelectorContainerExtraProps {
	selectorContainerStyle?: React.CSSProperties;
}

export interface ISlideSelectorExtraProps {
	selectorStyle?: React.CSSProperties;
}

export interface ISlideExtraProps {
	slideStyle?: React.CSSProperties;
}
