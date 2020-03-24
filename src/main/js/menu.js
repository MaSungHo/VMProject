import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menus from '../component/Menus';

class Menu extends Component {
	render() {
		return (
			<Menus/>
		);
	}
}

ReactDOM.render(<Menu/>, document.getElementById('root'));