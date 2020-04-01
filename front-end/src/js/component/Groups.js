import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Groups extends React.Component {
	render() {
		return (
			<TableRow>
				<TableCell>{this.props.name}</TableCell>
				<TableCell>{this.props.num_people}</TableCell>
			</TableRow>
		);
	}
}

export default Groups;
