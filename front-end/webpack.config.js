const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		App: './src/js/App.js',
	},
	devtool: 'inline-source-map',
	cache: true,
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	devServer: {
		historyApiFallback: true,
		compress: true,
		hot: true,
		inline: true,
		port: 9000,
		open: true
	},
	plugins: [
	    new HtmlWebpackPlugin({
	      template: '../src/main/webapp/html/index.html',
	    }),
	 ],
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
