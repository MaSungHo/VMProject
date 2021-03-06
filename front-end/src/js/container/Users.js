import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>VM Web Admin - Users</title>
      </Helmet>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const columns = [
  { id: 'number', label: 'No.', minWidth: 50, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'group', label: 'Group', minWidth: 100, align: 'center' }
];

const useStyles2 = makeStyles((theme) => ({
  table: {
    maxWidth: 1370,
    marginTop: 20,
    marginLeft: '5%',
    marginRight: '5%',
    alignItems: 'center',
  },
  button: {
	minWidth: 100,
	marginTop: 20,
	marginLeft: '85%',
	align: 'right',
  },
  cell_button: {
	marginRight: '10%',  
  },
  modal: {
	display: 'flex',
    alignItems: 'center',
	justifyContent: 'center',
  },
  modal_paper: {
	backgroundColor: theme.palette.background.paper,
	backgroundSize: 'cover',
	border: '2px solid #000',
	boxShadow: theme.shadows[5],
	padding: theme.spacing(2, 4, 3),
  },
  submit: {
	margin: theme.spacing(3, 0, 2),
  },
  formControl: {
	margin: theme.spacing(1),
	minWidth: 120,
  },
}));

export default function Users() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState([]);
  const [length, setLength] = useState(0);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [group, setGroup] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, length - page * rowsPerPage);
  var num = 1;
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleOpen = () => {
	setOpen(true);
  }
	  
  const handleClose = () => {
	setOpen(false);
	setName('');
	setEmail('');
	setPassword('');
	setGroup('');
  }
  
  const handleView = () => {
	setView(!view);
  }
  
  const handleChange = (e) => {
	if(e.target.name === 'name') {
		setName(e.target.value)
	}
	else if(e.target.name === 'email') {
		setEmail(e.target.value)
	}
	else if(e.target.name === 'password') {
		setPassword(e.target.value)
	}
	else if(e.target.name === 'group') {
		setGroup(e.target.value)
	}
  }
  
  const handleCreate = () => {
	  axios.post('http://localhost:8090/users', {
		name: name,
		email: email,
		password: password,
		group: group,
		num_VM: 0
	  }) .then(res => {
		  axios.get('http://localhost:8090/users')
		  	.then(response => {
		  		setUsers(response.data);
		  		setLength(response.data.length);
		  	})
	  })
	  setOpen(false);
  }
  
  useEffect(() => {
	let unmounted = false;
    let source = axios.CancelToken.source();
	axios.get('http://localhost:8090/users')
	  .then(res => {
	          if (!unmounted) {
	            setUsers(res.data);
	            setLength(res.data.length);
	            if (axios.isCancel()) {
	              console.log(`request cancelled:${e.message}`);
	            } else {
	            }
	          }
		});
	axios.get('http://localhost:8090/groups/list')
    .then(res => {
    	if (!unmounted) {
		    setGroupList(res.data);
		    setGroup(res.data[0])
			if (axios.isCancel()) {
			  console.log(`request cancelled:${e.message}`);
			} else {
			}
		}
    })
	
	return function () {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, []);
  
  return (
	<div>
	<Modal
     aria-labelledby="transition-modal-title"
     aria-describedby="transition-modal-description"
     className={classes.modal}
     open={open}
     onClose={handleClose}
     closeAfterTransition
     BackdropComponent={Backdrop}
     BackdropProps={{
     timeout: 500,
     }}
    >
      <Fade in={open}>
        <div className={classes.modal_paper}>
        이름: <TextField
        	  onChange={handleChange}
              className="validate"
              name="name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
         	  label="Name"
             />
        이메일: <TextField
        	   onChange={handleChange}
       		   className="validate"
       		   name="email"
       	       variant="outlined"
       	       margin="normal"
       	       required
       	       fullWidth
       	       id="email"
       	       label="Email"
         	  />
       비밀번호: <TextField
       		   onChange={handleChange}
      		   className="validate"
      		   name="password"
      	       variant="outlined"
      	       margin="normal"
      	       required
      	       fullWidth
      	       id="password"
      	       label="Password"
      	       type= {view ? "text" : "password"}
       	       InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleView}>
                      	{view ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                ),
               }}
        	  />  
       그룹: <br/><FormControl className={classes.formControl}>
       			   <Select
       			    id="group"
       			    name="group"
       			    onChange={handleChange}
       			    label="Group"
       			    autoWidth
       			    defaultValue={groupList[0]}
       			    value={group}
       			   >
       			     {groupList.map((name) => (
       			    	<MenuItem key={name} value={name}>{name}</MenuItem> 
       			     ))}
       			   </Select>
       			 </FormControl><br />
          <Button
           onClick={handleCreate}
           variant="contained"
           color="secondary"
           className={classes.submit}
       	   disabled={name === '' || email === '' || password === '' || group === ''}
          >
            사용자 생성
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
           onClick={handleClose}
           variant="contained"
           color="primary"
           className={classes.submit}
          >
            취소
          </Button>
        </div>
      </Fade>
    </Modal>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
               <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="h6">{column.label}</Typography>
                </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map((user) => {
        		  return (
        		    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
        		       {columns.map((column) => {
        		          const value = user[column.id];
        		          return (
        		            <TableCell key={column.id} align={column.align}>
        		               {column.id === 'number' ? num++ : value }
        		            </TableCell>
        		          );
        		       })}
        		       <TableCell align="center">
        		         <Link to={"/user/" + user.email}>
        		           <Button variant="contained" color="primary" className={classes.cell_button}> 
        		              조회
        		           </Button>
        		         </Link>
        		       </TableCell>
        		     </TableRow>
        		   );
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <Button variant="contained" color="secondary" className={classes.button} onClick={handleOpen}> 
      새로운 사용자 생성
    </Button>
    </div>
  );
}