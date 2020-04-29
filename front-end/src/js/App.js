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
import NotFound from './container/NotFound';
import AuthRoute from './component/AuthRoute';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
	
	render() {
		return(
			<Provider store={store}>
				<Router>
					<div>
						<Route path="/" component={Index} />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/users" component={Users} />				            
							<Route exact path="/groups" component={Groups} />
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