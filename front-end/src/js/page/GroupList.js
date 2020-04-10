import Groups from '../component/Groups';

import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const groups = [
	{
		'name': '인턴',
		'num_people': 12
	},
	{
		'name': '회사원',
		'num_people': 5
	},
	{
		'name': '학생',
		'num_people': 31
	},
	{
		'name': '상업용',
		'num_people': 9
	},
]

class GroupList extends React.Component {
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
			      {groups.map(c=>{
			        return <Groups key={c.name} name={c.name} num_people={c.num_people} />
			      })}
			    </TableBody>
			  </Table>
			</div>
		);
	}
}

export default GroupList;