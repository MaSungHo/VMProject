var path = require("path");

module.exports = {
	context: path.resolve(__dirname, 'src/main/js'),
	entry: {
		page1: './page1.js',
		page2: './page2.js'
	},
	devtool: 'sourcemaps',
	cache: true,
	output: {
		path: __dirname,
		filename: './src/main/webapp/bundle/[name].bundle.js'
	},
	mode: 'none',
	module: {
		rules: [ 
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', '@babel/preset-react' ]
					}
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	}
};
