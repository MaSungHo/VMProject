import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from '../component/LoginForm';
import { connect } from 'react-redux'; // Login 컨테이너와 리덕스를 연결해줌.
import { getStatusRequest, loginRequest } from '../actions/Authentication'; 
import RootPage from '../component/RootPage';

class Home extends Component {
	
	componentDidMount() {
		this.props.getStatusRequest();
	}
	
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
	          <div>
	            {this.props.status2.isLoggedIn === false ? (
	              <div>
	                <Helmet>
		              <title>VM Web Admin Project</title>
		            </Helmet>
			          <LoginForm mode={true} 
			           onLogin={this.handleLogin}/>
			      </div> ): ( 
			        <RootPage />
			      )
	            }
			  </div>
			
		);
	}
}

//----------------리덕스의 state와 thunk 함수를 Login 컴포넌트로 들어온 props처럼 사용할 수 있게 함.-----------------
const mapStateToProps = (state) => {
	return {
		status: state.Authentication.login.status,
		status2: state.Authentication.status
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getStatusRequest: () => {
			return dispatch(getStatusRequest());
		},
		loginRequest: (email, password) => {
			return dispatch(loginRequest(email, password));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);