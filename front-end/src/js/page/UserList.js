import Users from '../component/Users';

import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const users = [
	{
		'Email': 'mash809',
		'PW': 'pw1234',
		'group': '인턴',
		'VM': 'Windows 10'
	},
	{
		'Email': 'tonem123',
		'PW': 'msh89',
		'group': '회사원',
		'VM': 'Ubuntu 18.04'
	},
	{
		'Email': 'mash809',
		'PW': '08sh09',
		'group': '학생',
		'VM': 'CentOS 8'
	},
	{
		'Email': 'mash809',
		'PW': 'mam!!',
		'group': '상업용',
		'VM': 'Mac OS'
	}
]

class UserList extends React.Component {
	render() {
		return (
			<div>
			  <Helmet>
			    <title>VM Admin - Users</title>
		      </Helmet>
			  <Table>
			    <TableHead>
			      <TableRow>
			        <TableCell> <h2>이메일</h2> </TableCell>
			        <TableCell> <h2>비밀번호</h2> </TableCell>
			        <TableCell> <h2>그룹</h2> </TableCell>
			        <TableCell> <h2>VM</h2> </TableCell>
			      </TableRow>
			    </TableHead>
			    <TableBody>
			     {users.map(c=>{
			       return <Users key={c.Email} Email={c.Email} PW={c.PW} group={c.group} VM={c.VM} />
			     })}
			    </TableBody>
			  </Table>
			</div>
		);
	}
}

export default UserList;
