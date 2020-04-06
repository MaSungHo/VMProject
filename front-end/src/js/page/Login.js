import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/custom.css';

function Login({ authenticated, login, location }) {
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	
	const handleClick = () => {
		try {
			login({ email, password })
		} catch(e) {
			alert('로그인에 실패했습니다.')
			setEmail('')
			setPassword('')
		}
	}
	
	const handleKeyPress = (e) => {
		if(e.key === "Enter") {
			handleClick()
		}
	}
	
	const { from } = location.state || { from: { pathname: "/profile" } }
	if(authenticated) return <Redirect to={from} />;
	
	return (
		<div className="center">
			<h1>로그인</h1>
			이메일: &nbsp;&nbsp;&nbsp;
			       <input
				    value={email}
			        onKeyPress={handleKeyPress}
				    onChange={({ target: { value } }) => setEmail(value)}
				    type="text"
				    placeholder="email"
			        /> <br/><br/>
			비밀번호: <input
				    value={password}
			        onKeyPress={handleKeyPress}
				    onChange={({ target: { value } }) => setPassword(value)}
				    type="password"
				    placeholder="password"
			        /> <br/> <br/>
			<button onClick={handleClick}>Login</button>
		</div>
	)
}

export default Login;