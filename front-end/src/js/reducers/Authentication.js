import * as types from '../actions/ActionTypes';

/*리듀서를 담당하는 파일로 리듀서는 dispatch 함수로부터 전달받은 액션객체의 타입에 따라 state를 변경함.*/

const initialState = {
	login: {
		status: 'INIT'
	},
	status: {
		valid: false,
		isLoggedIn: false,
		currentAdmin: ''
	}
};

/*전달받은 액션객체의 타입에 따라 state를 바꾸고 있음.*/
export default function Authentication(state = initialState, action) {
	switch(action.type) {
		case types.AUTH_LOGIN:
			return {
			...state,
			login: {
				status: 'WAITING'
			}
		}
		case types.AUTH_LOGIN:
	        return {
	          ...state,
	          login : {
	            status: 'WAITING'
	        }
	    }
		case types.AUTH_LOGIN_SUCCESS:
			return {
			...state,
			login: {
				status: 'SUCCESS'
			},
			status: {
				...state.status,
				isLoggedIn: true,
				currentAdmin: action.email
			}
		}
		case types.AUTH_LOGIN_FAILURE:
			return {
			...state,
			login: {
				status: 'FAILURE'
			}
		}
		case types.AUTH_LOGOUT:
			return {
			...state,
			status: {
				...state.status,
				isLoggedIn: false,
				currentAdmin: ''
			}
		}
		case types.AUTH_GET_STATUS:
			return {
			...state,
			status: {
				...state.status,
				isLoggedIn: true,
			}
		}
		case types.AUTH_GET_STATUS_SUCCESS:
			return {
			...state,
			status: {
				...state.status,
				valid: true,
				currentAdmin: action.email
			}
		}
		case types.AUTH_GET_STATUS_FAILURE:
			return {
			...state,
			status: {
				...state.status,
				valid: false,
				isLoggedIn: false
			}
		}
		default:
			return state;
	}
}