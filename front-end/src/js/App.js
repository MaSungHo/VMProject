import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

import Index from './container/Index';
import Home from './container/Home';
import Users from './container/Users';
import Groups from './container/Groups';
import VMs from './container/VMs';
import NotFound from './container/NotFound';
import RouteIf from './component/RouteIf';
import User from './component/User';
import Group from './component/Group';
import VM from './component/VM';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
	
	checkLogin = () => {
		//get cookie by name
		function getCookie(name) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + name + "=");
			if(parts.length == 2) return parts.pop().split(";").shift();
		}
		
		//cookie에서 로그인 데이터를 가져옴.
		let loginData = getCookie('key');
		
		//로그인 데이터가 없다면 아무것도 실행하지 않음.
		if(typeof loginData === "undefined") {
			return "None";
		}
		//JSON을 디코드함.
		loginData = JSON.parse(atob(loginData));
		
		//if 로그인 상태가 아니라면 아무 것도 실행하지 않는다.
		if(!loginData.isLoggedIn) {
			return "None";
		}
		//페이지가 새로고침 되고 세션이 존재할 때
		//cookie가 유효한지 검사한다.
		return "Auth";
	}
	
	render() {
		return(
			<Provider store={store}>
				<Router>
					<div>
						<Route path="/" component={Index} />
						<Switch>
							<Route exact path="/" component={Home} />
							<RouteIf
							 exact path="/user"
						     component={Users} />
						    <RouteIf
						     exact path="/user/:email" 
						     component={User} />   
							<RouteIf
							exact path="/group" 
							component={Groups} />
							<RouteIf
						     path="/group/:name" 
						     component={Group} />
							<RouteIf
						     exact path="/VM" 
						     component={VMs} />
							<RouteIf
						     path="/VM/:email" 
						     component={VM} />
							<Route component={NotFound} />	 
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

ReactDOM.render(
	<App />
	,
	document.getElementById('root')
);