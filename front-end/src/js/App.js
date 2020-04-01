import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Appbar from './component/Appbar';
import UserList from './page/UserList';
import GroupList from './page/GroupList';
import Login from './page/Login';
import NotFound from './page/NotFound';

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
			       <Switch>
			         <Route exact path ="/" component={Login} />
			         <Route exact path ="/users" component={UserList}/>
			         <Route exact path ="/groups" component={GroupList}/>
			         <Route component={NotFound} />
			       </Switch>
			     </div>
			   </Appbar>
			  </Router>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
