import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';



class User extends React.Component {
	render() {
		return (
			<TableRow>
				<TableCell>{this.props.email}</TableCell>
				<TableCell>{this.props.group}</TableCell>
				<TableCell>{this.props.VMs}</TableCell>
			</TableRow>
		);
	}
}

class Users extends Component {
	
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
			  {console.log(this.props.status.isLoggedIn)}
			  <Helmet>
			    <title>VM Admin - Users</title>
		      </Helmet>
			  <Table>
			    <TableHead>
			      <TableRow>
			        <TableCell> <h2>이메일</h2> </TableCell>
			        <TableCell> <h2>그룹</h2> </TableCell>
			        <TableCell> <h2>VM</h2> </TableCell>
			      </TableRow>
			    </TableHead>
			    <TableBody>
			     {this.state.users.map(c=>{
			       return <User key={c.email} email={c.email} group={c.group} VMs={c.VMs} />
			     })}
			    </TableBody>
			  </Table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		status: state.Authentication.status
	};
};

export default connect(mapStateToProps)(Users);