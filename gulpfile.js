const gulp = require("gulp");

gulp.task("default", function() {
	var postcss = require("gulp-postcss");
	var autoprefixer = require("autoprefixer");

	return gulp
		.src("./slider/styles/*.css")
		.pipe(postcss([autoprefixer()]))
		.pipe(gulp.dest("./dist/styles"));
});
