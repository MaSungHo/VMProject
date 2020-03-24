import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menus from '../component/Menus';
import Users from './users';
import Groups from './groups';
import Login from './login';

class Menu extends Component {
	render() {
		return (
			<Router>
			 <Menus>
			   <div>
			     <Route exact path ="/" component={Login}/>
			     <Route exact path ="/users" component={Users}/>
			     <Route exact path ="/groups" component={Groups}/>
			   </div>
			 </Menus>
			</Router>
		);
	}
}

ReactDOM.render(<Menu/>, document.getElementById('root'));

export default Menu;