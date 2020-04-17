import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class Group extends React.Component {
	render() {
		return (
			<TableRow>
				<TableCell>{this.props.name}</TableCell>
				<TableCell>{this.props.num_people}</TableCell>
			</TableRow>
		);
	}
}

class Groups extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
				groups: []
		}
	}
	
	componentDidMount() {
		axios.get('http://localhost:8090/groups')
			.then(res => {
				this.setState({ groups: res.data });
			});
	}
	
	render() {
		return (
			<div>
			  <Helmet>
			    <title>VM Admin - Groups</title>
			  </Helmet>
			  <Table>
			    <TableHead>
			      <TableRow>
			        <TableCell> <h2>그룹명</h2> </TableCell>
			        <TableCell> <h2>인원</h2> </TableCell>
			     </TableRow>
			   </TableHead>
			    <TableBody>
			      {this.state.groups.map(c=>{
			        return <Group key={c.name} name={c.name} num_people={c.num_people} />
			      })}
			    </TableBody>
			  </Table>
			</div>
		);
	}
}

export default Groups;
