import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menus from '../component/Menus';
import UserList from './UserList';
import GroupList from './GroupList';
import Login from './Login';

class App extends Component {
	render() {
		return (
			<div>
			  <Helmet>
			    <title>VM Admin Web</title>
			  </Helmet>
			  <Router>
			   <Menus>
			     <div>
			       <Route exact path ="/login" component={Login}/>
			       <Route exact path ="/users" component={UserList}/>
			       <Route exact path ="/groups" component={GroupList}/>
			     </div>
			   </Menus>
			  </Router>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));