import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'id', label: 'No.', minWidth: 50, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'group', label: 'Group', minWidth: 100, align: 'center' },
  { id: 'info', label: 'Info', minWidth: 150, align: 'center'}
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Users() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  useEffect(() => {
	  axios.get('http://localhost:8090/users')
		.then(res => {
			setUsers(res.data);
		});
  });
  
  return (
	<div>
	<Helmet>
      <title>VM Admin - Users</title>
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
            {users.map((user) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  {columns.map((column) => {
                    const value = user[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'info' ? 
                        	( <Button variant="contained" color="primary"> 
                        	     조회
                        	  </Button> ) : ( 
                        	  column.id === 'number' ? num : value )}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  ); 
} 