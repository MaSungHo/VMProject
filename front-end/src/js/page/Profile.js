import React, { useState } from 'react';
import '../css/custom.css';

function Profile({ user }) {
	const { name, email, password } = user || {}
	
	return (
		<div className="center">
			<h1>프로필</h1>
			<dt>Name: {name}</dt><br/>
			<dt>Email: {email}</dt><br/>
			<dt>PW: {password}</dt><br/>
		</div>
	)
}

export default Profile;