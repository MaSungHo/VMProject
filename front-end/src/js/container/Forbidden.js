import React from 'react';
import { Link } from 'react-router-dom';
import '../css/custom.css';

const Forbidden = ( { history } ) => {
	
	return (
		<div className="center">
			<h1>Forbidden - 권한이 필요한 페이지입니다.</h1>
			<Link to='/'>
				<button>로그인</button>
			</Link>
		</div>
	)
}

export default Forbidden;
