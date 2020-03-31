var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	devServer: {
		compress: true,
		hot: true,
		inline: true,
		port: 9000,
		open: true
	},
	plugins: [
	    new HtmlWebpackPlugin({
	      template: './webapp/html/index.html',
	    }),
	 ],
	context: path.resolve(__dirname, 'src/main'),
	entry: {
		App: './js/App.js',
	},
	devtool: 'inline-source-map',
	cache: true,
	output: {
		path: __dirname,
		filename: './src/main/webapp/bundle/bundle.js'
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
						presets: [ '@babel/preset-env', '@babel/preset-react' ],
						plugins: [ '@babel/plugin-proposal-class-properties' ]
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
