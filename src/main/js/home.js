import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Home extends Component {
	render() {
		return (
			<div>
				VM 관리 웹 시스템 <br/>
				ID: <input type="text" name="id" /> <br/>
				Password: <input type="password" />
			</div>
		);
	}
}

ReactDOM.render(<Home/>, document.getElementById('root'));