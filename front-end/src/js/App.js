import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

import Home from './container/Home';
import Login from './container/Login';
import Users from './container/Users';
import Groups from './container/Groups';
import NotFound from './container/NotFound';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/users" component={Users} />
					<Route exact path="/groups" component={Groups} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</Router>
	</Provider>
	,
	document.getElementById('root')
);