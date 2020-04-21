import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/*컨테이너 컴포넌트 Login에서 렌더링될 컴포넌트. */

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
		
		//props로 전달받은 onLogin 메소드를 사용함.
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
					<label>Email:</label>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input
					name="email"
					type="text"
					className="validate"
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPress}
					value={this.state.email} />
				</div>
				<br/>
				<div>
					<label>Password:</label>
					&nbsp;
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
		
		return (
			<div>
				<h1>로그인</h1>
				<div>
					{inputBoxes}
					<br/>
					<button onClick={this.handleLogin}>SUBMIT</button>
					&nbsp;&nbsp;
					<Link to="/">
						<button>홈으로</button>
					</Link>
				</div>
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