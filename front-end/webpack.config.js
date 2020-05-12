const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		App: './src/js/App.js',
	},
	devtool: 'inline-source-map',
	cache: true,
	output: {
		path: path.join(__dirname, '/'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	devServer: {
		historyApiFallback: {
			rewrites: [
				{ from: /^\/$/, to: './index.html' },
				{ from: /^\/users\/^\/$/, to: './index.html' }
			],
			disableDotRule: true
		},
		publicPath: '/',
		compress: true,
		hot: true,
		inline: true,
		port: 9000,
		open: true,
	},
	plugins: [
	    new HtmlWebpackPlugin({
	      template: './index.html',
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
