/* import React from 'react';
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

export default Groups; */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'num_people', label: '인원 수', minWidth: 100 },
  { id: 'info', label: 'Info', minWidth: 150}
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Groups() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [groups, setGroups] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  useEffect(() => {
	  axios.get('http://localhost:8090/groups')
		.then(res => {
			setGroups(res.data);
		});
  });
  
  return (
	<div>
	<Helmet>
      <title>VM Admin - Groups</title>
    </Helmet>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={group.id}>
                  {columns.map((column) => {
                    const value = group[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={groups.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  ); 
} 