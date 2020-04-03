import React, { useState } from 'react';
import '../css/custom.css';

function Profile({ user }) {
	const { name, email, password } = user || {}
	
	return (
		<div className="center">
			<h1>프로필</h1>
			<dt>Name: {name}</dt>
			<dt>Email: {email}</dt>
			<dt>PW: {password}</dt>
		</div>
	)
}

export default Profile;