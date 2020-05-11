import React from 'react';

const User = ( {match} ) => {
	return (
		<>
		  <h2>{match.params.email}</h2>
		</>
	)
}

export default User;