# react-simple-image-carousel

react-simple-image-carousel is a image carousel component for react.

![demo.png](https://raw.githubusercontent.com/MutatedBread/react-simple-image-carousel/master/docs/demo.png)

You can customize :

- Image slides
- Direction buttons
- Slide selector buttons
- And etc

[ TODO ] Customize the animation.

Documentation at [https://mutatedbread.github.io/react-simple-image-carousel](https://mutatedbread.github.io/react-simple-image-carousel)

## Installation

To get this package, run either :

```
yarn add react-simple-image-carousel
```

or

```
npm add react-simple-image-carousel --save
```

## Simple Usage

Load into your files :

```
import {Slider} from "react-simple-image-carousel"
```

## Example :

```js
<Slider
	width={450}
	height={250}
	maxSwipeThreshold={250 * 0.15}
	minSwipeThreshold={40}
	swipeTimeThreshold={200}
	images={[
		"https://www.chewy.com/petcentral/wp-content/uploads/2018/05/lucky-corgi-butts-x-596-444x.jpg",
		"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225919/Pembroke-Welsh-Corgi-On-White-01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG"
	]}
/>
```
