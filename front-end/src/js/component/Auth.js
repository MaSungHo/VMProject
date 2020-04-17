import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Auth extends Component {
	state = {
		email: "",
		password: ""
	}
	
	/*input의 내용이 변경되었을 때 state를 바꿔주는 함수*/
	handleChange = (e) => {
		let nextState = {};
		nextState[e.target.name] = e.target.value
		this.setState(nextState);
	}
	
	/* 로그인을 담당하는 함수*/
	handleLogin = () => {
		let email = this.state.email;
		let password = this.state.password;
		
		this.props.onLogin(email, password).then(
			(success) => {
				if(!success) {
					this.setState({
						email:'',
						password: ''
					})
				}
			}
		);
	}
	
	/*Enter키를 누르면 로그인을 할 수 있게 해주는 함수*/
	handleKeyPress = (e) => {
		if(e.charCode==13) {
			this.handleLogin();
		}
	}
	
	render() {
		const inputBoxes = (
			<div>
				<div>
					<label>Email</label>
					<input
					name="email"
					type="text"
					className="validate"
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					value={this.state.email} />
				</div>
				<div>
					<label>Password</label>
					<input
					name="password"
					type="password"
					className="validate"
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					value={this.state.password} />
				</div>
			</div>
		);
		
		const loginView = (
			<div>
				{inputBoxes}
				<button onClick={this.handleLogin}>SUBMIT</button>
			</div>
		);
		
		return (
			<div>
				<Link to="/">VM Project</Link>
				<div>"LOGIN"</div>
				{loginView}
			</div>
		)
	}
}

Auth.propTypes = {
		mode: PropTypes.bool,
		onLogin: PropTypes.func
};

Auth.defaultProps = {
		mode: true,
		onLogin: (email, password) => { console.error("Login function not defined"); }
};

export default Auth;