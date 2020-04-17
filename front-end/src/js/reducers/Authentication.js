import * as types from '../actions/ActionTypes';

const initialState = {
	login: {
		status: 'INIT'
	},
	register: {
		status: 'INIT'
	},
	status: {
		valid: false,
		isLoggedIn: false,
		currentAdmin: ''
	}
};

export default function Authentication(state = initialState, action) {
	switch(action.type) {
		case types.AUTH_LOGIN:
			return {
			...state,
			login: {
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
				isLoggIn: true,
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