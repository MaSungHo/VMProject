import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/Authentication';
import Appbar from '../component/Appbar';
import '../css/custom.css';

class Home extends Component {
	componentDidMount() {
		//get cookie by name
		function getCookie(name) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + name + "=");
			if(parts.length == 2) return parts.pop().split(";").shift();
		}
		
		//get loginData from cookie
		let loginData = getCookie('key');
		
		//if loginData is undefined, do nothing
		if(typeof loginData === "undefined") return;
		
		//decode base64 & parse json
		loginData = JSON.parse(atob(loginData));
		
		//if not logged in, do nothing
		if(!loginData.isLoggedIn) return;
		
		//page refreshed & has a session in cookie,
		//check whether this cookie is valid or not
		this.props.getStatusRequest().then(
			() => {
				//if session is not valid
				if(!this.props.status.valid) {
					//logout the session
					loginData = {
						isLoggedIn: false,
						email: ''
					};
					
					document.cookie='key=' + btoa(JSON.stringify(loginData));
				}
			}
		);
	}
	
	handleLogout = () => {
		this.props.logoutRequest(this.props.status.currentAdmin).then(
			() => {
				let loginData = {
					isLoggedIn: false,
					email: ''
				};
				
				document.cookie = 'key=' + btoa(JSON.stringify(loginData));
			}
		);
	}
	
	render() {
		return (
			<div>
				<Appbar isLoggedIn={this.props.status.isLoggedIn} onLogout={this.handleLogout}>
					<div className="center">
						<h1>VM Web Admin Project</h1><br/><br/><br/>
						<h1>Ajou University</h1>
					</div>
				</Appbar>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.Authentication.status
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getStatusRequest: () => {
			return dispatch(getStatusRequest());
		},
		logoutRequest: (email) => {
			return dispatch(logoutRequest(email));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);