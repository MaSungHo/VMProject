import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import { HashRouter as Router, Route } from 'react-router-dom';
import Appbar from '../component/Appbar';
import UserList from './UserList';
import GroupList from './GroupList';
import Login from './Login';

class App extends Component {
	render() {
		return (
			<div>
			  <Helmet>
			    <title>VM Admin Project</title>
		      </Helmet>
			  <Router>
			   <Appbar>
			     <div>
			       <Route exact path ="/" component={Login} />
			       <Route exact path ="/users" component={UserList}/>
			       <Route exact path ="/groups" component={GroupList}/>
			     </div>
			   </Appbar>
			  </Router>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));