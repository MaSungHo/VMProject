import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Users extends React.Component {
	render() {
		return (
			<TableRow>
				<TableCell>{this.props.id}</TableCell>
				<TableCell>{this.props.email}</TableCell>
				<TableCell>{this.props.group}</TableCell>
				<TableCell>{this.props.VMs}</TableCell>
			</TableRow>
		);
	}
}

export default Users;
