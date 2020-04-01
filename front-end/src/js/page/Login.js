import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import '../css/custom.css';


class Login extends Component {
	render() {
		return (
			<div>
				<Helmet>
					<title>VM Admin - Login</title>
				</Helmet>
				<div className="center">
					VM 관리 웹 시스템 <br/><br/>
					ID: <input type="text" name="id" /> <br/><br/>
					Password: <input type="password" />
				</div>
			</div>
		);
	}
}

export default Login;
