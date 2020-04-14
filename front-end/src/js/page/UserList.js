import Users from '../component/Users';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class UserList extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		};
	}
	
	componentDidMount() {
		axios.get('http://localhost:8090/users')
			.then(res => {
				this.setState({ users: res.data });
			});
	}
	
	render() {
		return (
			<div>
			  <Helmet>
			    <title>VM Admin - Users</title>
		      </Helmet>
			  <Table>
			    <TableHead>
			      <TableRow>
			        <TableCell> <h2>ID</h2> </TableCell>
			        <TableCell> <h2>이메일</h2> </TableCell>
			        <TableCell> <h2>그룹</h2> </TableCell>
			        <TableCell> <h2>VM</h2> </TableCell>
			      </TableRow>
			    </TableHead>
			    <TableBody>
			     {this.state.users.map(c=>{
			       return <Users key={c.id} id={c.id} email={c.email} group={c.group} VMs={c.VMs} />
			     })}
			    </TableBody>
			  </Table>
			</div>
		);
	}
}

export default UserList;
