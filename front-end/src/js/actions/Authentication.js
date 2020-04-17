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


/*로그인을 다룸*/
export function loginRequest(email, password) {
	return (dispatch) => {
		/*로그인이 시작됨*/
		dispatch(login());
		
		return axios.get("http://localhost:8090/admin/" + email)
				.then((res) => {
					if(res.data.email === email && res.data.password === password) {
						dispatch(loginSuccess(email));
						axios.post("http://localhost:8090/logInfo", {
							email: email
						})
					} else {
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

/*로그인 정보를 가져옴 */
export function getStatusRequest() {
	return (dispatch) => {
		//로그인 정보 관련 API가 실행된다는 것을 알려줌.
		dispatch(getStatus());
		
		return axios.get("http://localhost:8090/logInfo")
		.then((res) => {
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