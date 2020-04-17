import React, { Component } from 'react';
import Auth from '../component/Auth';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/Authentication'; 
import '../css/custom.css';

class Login extends Component {
	
	handleLogin = (email, password) => {
		return this.props.loginRequest(email, password).then(
			() => {
				if(this.props.status == "SUCCESS") {
					let loginData = {
						isLoggedIn: true,
						email: email
					};
					
					document.cookie = 'key=' + btoa(JSON.stringify(loginData));
					this.props.history.push('/');
					return true;
				} else {
					return false;	
				} 
			}
		);
	}
	
	render() {
		return (
			<div className="center">
				<Auth mode={true} 
				 onLogin={this.handleLogin}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.Authentication.login.status
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginRequest: (email, password) => {
			return dispatch(loginRequest(email, password));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);