import axios from 'axios';
import {
	AUTH_LOGIN,
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAILURE,
	AUTH_LOGOUT,
	AUTH_GET_STATUS,
	AUTH_GET_STATUS_SUCCESS,
	AUTH_GET_STATUS_FAILURE
} from './ActionTypes';

/* 액션생성자 함수와 thunk를 정의하는 파일*/

/*-------------------------------로그인 & 로그아웃을 다루는 thunk 함수------------------------------*/
export function loginRequest(email, password) {
	return (dispatch) => {
		/*로그인이 시작된다는 액션 객체를 리듀서로 보낸다.*/
		dispatch(login());
		
		return axios.get("http://localhost:8090/admin/" + email)
				.then((res) => {
					if(res.data.email === email && res.data.password === password) {
						/*로그인이 성공했다는 액션 객체를 리듀서로 보낸다.*/
						dispatch(loginSuccess(email));
						axios.post("http://localhost:8090/logInfo", {
							email: email
						})
					} else {
						/*로그인이 실패했다는 액션객체를 리듀서로 보낸다.*/
						dispatch(loginFailure());
					}
				}).catch((error) => {
					dispatch(loginFailure());
				});
	};
}

export function logoutRequest(email) {
	return (dispatch) => {
		return axios.delete("http://localhost:8090/logInfo/" + email)
		.then((res) => {
			dispatch(logout());
		});
	};
}
/*---------------------------------------------------------------------------------*/


/* ---------------------------------------로그인과 관련된 액션 생성자 함수  ------------*/
export function logout() {
	return {
		type: AUTH_LOGOUT
	}
}

export function login() {
	return {
		type: AUTH_LOGIN
	};
}

export function loginSuccess(email) {
	return {
		type: AUTH_LOGIN_SUCCESS,
		email
	};
}

export function loginFailure() {
	return {
		type: AUTH_LOGIN_FAILURE
	};
}
/*-------------------------------------------------------------------------*/

/*----------------------로그인 정보 확인과 관련된 액션생성자 함수 -----------------------*/
export function getStatusRequest() {
	return (dispatch) => {
		//로그인 정보 관련 API가 실행된다는 것을 알려줌.
		dispatch(getStatus());
		
		return axios.get("http://localhost:8090/logInfo")
		.then((res) => {
			//res가 존재한다고 리턴받으면 로그인 정보 조회에 성공했다는  액션객체를 dispatch 함수를 통해 리듀서로 보냄.
			if(res.status === 200) {
				dispatch(getStatusSuccess(res.data[0].email));
			} else {
				dispatch(getStatusFailure());
			}
		});
	};
}

export function getStatus() {
	return {
		type: AUTH_GET_STATUS
	};
}

export function getStatusSuccess(email) {
	return {
		type: AUTH_GET_STATUS_SUCCESS,
		email
	};
}

export function getStatusFailure() {
	return {
		type: AUTH_GET_STATUS_FAILURE
	};
}