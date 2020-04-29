import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/Authentication';
import Appbar from '../component/Appbar';
import '../css/custom.css';

class Index extends Component {
	
	componentDidMount() {
		//get cookie by name
		function getCookie(name) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + name + "=");
			if(parts.length == 2) return parts.pop().split(";").shift();
		}
		
		//cookie에서 로그인 데이터를 가져옴.
		let loginData = getCookie('key');
		
		//로그인 데이터가 없다면 아무것도 실행하지 않음.
		if(typeof loginData === "undefined") return;
		//JSON을 디코드함.
		loginData = JSON.parse(atob(loginData));
		
		//if 로그인 상태가 아니라면 아무 것도 실행하지 않는다.
		if(!loginData.isLoggedIn) return;
		//페이지가 새로고침 되고 세션이 존재할 때
		//cookie가 유효한지 검사한다.
		this.props.getStatusRequest().then(
			() => {
				//세션이 유효하지 않을 경우
				if(!this.props.status.valid) {
					//로그아웃 한다.
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
					<>
					</>
				</Appbar>
			</div>
		)
	}
}

/*---------------------리덕스의 state와 thunk 함수를 전달받은 props처럼 활용할 수 있도록 connect함.------------------------*/
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);