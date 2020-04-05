import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

function LogoutButton({ logout, history }) {
	const handleClick = () => {
		logout()
		history.push('/')
	}
	return <Button variant="contained" color="primary" onClick={handleClick}>Logout</Button>;
}

export default withRouter(LogoutButton);