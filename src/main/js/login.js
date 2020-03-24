import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import '../webapp/css/custom.css';

class Login extends Component {
	render() {
		return (
			<div class="login">
				<Helmet>
					<title>VM Admin - Login</title>
				</Helmet>
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

ReactDOM.render(<Login/>, document.getElementById('root'));

export default Login;