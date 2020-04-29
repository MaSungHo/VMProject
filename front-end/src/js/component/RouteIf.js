import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { getStatusRequest } from '../actions/Authentication';
import { useSelector, useDispatch } from 'react-redux';

import Forbidden from '../container/Forbidden';

const RouteIf = ({ component: Component, ...rest }) => {
	
	const dispatch = useDispatch();
	const { status: status } = useSelector((state) => state.Authentication);
	
	useEffect(() => {
	    getStatusRequest
	  });
	
	return (
		<>
			<Route 
			{...rest}
			render={props => {
				if(status.isLoggedIn === true) {
					return <Component {...props} />;
				} else {
					return <Forbidden />;
				}			
			}}
		/>
		</>
	);
};

export default RouteIf;