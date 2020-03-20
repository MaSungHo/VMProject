import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Users extends React.Component {
	render() {
		return (
			<TableRow>
				<TableCell>{this.props.ID}</TableCell>
				<TableCell>{this.props.PW}</TableCell>
				<TableCell>{this.props.group}</TableCell>
				<TableCell>{this.props.VM}</TableCell>
			</TableRow>
		);
	}
}

export default Users;