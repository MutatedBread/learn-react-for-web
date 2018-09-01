export default {
	title: "Doc",
	description: "Documentation for react-simple-image-carousel",
	typescript: true,
	hashRouter: true,
	base: "/react-simple-image-carousel/",
	modifyBundlerConfig: config => {
		config.resolve.extensions.push(".css");
		config.module.rules.push({
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		});

		return config;
	}
};
