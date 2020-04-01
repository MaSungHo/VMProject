import React from 'react';

const NotFound = ( { history } ) => {
	
	const goBack = () => {
		history.goBack()
	}
	
	return (
		<div>
			<h1>Not Found - 없는 페이지입니다.</h1>
			<button onClick={goBack}>뒤로 가기</button>
		</div>
	)
}

export default NotFound;
