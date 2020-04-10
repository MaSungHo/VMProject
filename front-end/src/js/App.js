import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Appbar from './component/Appbar';
import Home from './page/Home';

import AuthRoute from './component/AuthRoute';
import Login from './page/Login';
import Auth from './component/Auth';
import LogoutButton from './component/LogoutButton';

import Profile from './page/Profile';
import UserList from './page/UserList';
import GroupList from './page/GroupList';
import NotFound from './page/NotFound';

const App = () => {
		
        const [user, setUser] = useState(null)
        const authenticated = user != null
        
        const login = ({ email, password }) => setUser( Auth({ email, password }) )
        const logout = () => { setUser(null) } 
        
		return (
			<div>
			  <Helmet>
			    <title>VM Admin Project</title>
		      </Helmet>
			  <Router>
			    <Appbar auth={authenticated} logout={logout}>
			      <div>
			        <Switch>
			          <Route exact path ="/" component={Home} />
			          <Route 
			           path = "/login"
			           render={props => (
			           <Login authenticated={authenticated} login={login} {...props} />
			           )}
			         />
			         <AuthRoute 
			           authenticated={authenticated}
			           path="/profile"
			           render={props => <Profile user={user} {...props} />}
			         />
			         <AuthRoute 
			           authenticated={authenticated}
			           path="/users"
			           render={props => <UserList />}
			         />
			         <AuthRoute 
			           authenticated={authenticated}
			           path="/groups"
			           render={props => <GroupList />}
			         />
			         <Route component={NotFound} />
			       </Switch>
			     </div>
			   </Appbar>
			  </Router>
			</div>
		);
}

ReactDOM.render(<App/>, document.getElementById('root'));
