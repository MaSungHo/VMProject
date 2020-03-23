import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../webapp/css/custom.css';

class Home extends Component {
	render() {
		return (
			<div class="home">
				<span class="content">
					VM 관리 웹 시스템 <br/><br/>
					ID: <input type="text" name="id" /> <br/><br/>
					Password: <input type="password" />
				</span>
				<span class="blank"></span>
			</div>
		);
	}
}

ReactDOM.render(<Home/>, document.getElementById('root'));