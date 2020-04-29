import React, { Component } from 'react';
import LoginForm from '../component/Auth';
import { connect } from 'react-redux'; // Login 컨테이너와 리덕스를 연결해줌.
import { loginRequest } from '../actions/Authentication'; 
import '../css/custom.css';

class Home extends Component {
	
	handleLogin = (email, password) => {
		return this.props.loginRequest(email, password).then(
			() => {
				if(this.props.status == "SUCCESS") {
					let loginData = {
						isLoggedIn: true,
						email: email
					};
					
					//로그인이 성공하면 브라우저 쿠키에 로그인 정보를 저장함.
					document.cookie = 'key=' + btoa(JSON.stringify(loginData));
					this.props.history.push('/users');
					return true;
				} else {
					return false;	
				} 
			}
		);
	}
	
	render() {
		return (
			<LoginForm mode={true} 
			onLogin={this.handleLogin}/>
		);
	}
}

//----------------리덕스의 state와 thunk 함수를 Login 컴포넌트로 들어온 props처럼 사용할 수 있게 함.-----------------
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);