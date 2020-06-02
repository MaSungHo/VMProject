import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../css/custom.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
	margin: 'auto',
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1500,
    height: 500,
    maxHeight: 700
  },
  image: {
    width: 300,
    height: 300,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
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

export default function User({match, history}) {
	const classes = useStyles();
	const [user, setUser] = useState([]);
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const [view, setView] = useState(false);
	const [num_VM, setNum_VM] = useState(0);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [group, setGroup] = useState('');
	const [groupList, setGroupList] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	
	// 사용자 삭제에 대한 함수------------------------------------------------------------------
	const handleOpen = () => {
		setOpen(true);
	}
	  
	const handleClose = () => {
		setOpen(false);
	}
	
	const handleDelete = () => {
		setOpen(false);
		axios.delete('http://localhost:8090/users/' + match.params.email + '/');
		history.goBack();
	}
	//----------------------------------------------------------------------------------
	
	// 사용자 정보 변경에 대한 함수----------------------------------------------------------------
	const handleModalOpen = () => {
		setModal(true);
	}
	  
	const handleModalClose = () => {
		setModal(false);
	}
	
	
	const handleModal = () => {
		handleChangeUser()
		setModal(false);
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
	
	const handleChangeUser = () => {
		axios.put('http://localhost:8090/users/' + match.params.email + '/', {
			name: name,
			email: email,
			password: password,
			group: group,
			num_VM: num_VM
		}) .then(res => {
			axios.get('http://localhost:8090/users/' + email + '/')
				.then(response => {
					history.replace('/users/' + email);
					setUser(response.data);
				})
		})
	}
	//----------------------------------------------------------------------------------
	
	// 비밀번호를 보일지 말지 결정하는 함수
	const handleView = () => {
		setView(!view);
	}
	
	// 이전 페이지로 돌아가는 함수
	const goBack = () => {
		history.goBack();
	}
		
	useEffect(() => {
	  let unmounted = false;
	  let source = axios.CancelToken.source();
	  axios.get('http://localhost:8090/users/' + match.params.email + '/')
	    .then(res => {
		  if (!unmounted) {
		    setUser(res.data);
		    setName(res.data.name);
		    setEmail(res.data.email);
		    setPassword(res.data.password);
		    setGroup(res.data.group);
		    setNum_VM(res.data.num_VM)
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
				if (axios.isCancel()) {
				  console.log(`request cancelled:${e.message}`);
				} else {
				}
			}
	    })
      axios.get('http://localhost:8090/admin/' + match.params.email + '/')
	    .then(res => {
	    	if (!unmounted) {
			    if(res.status === 200) {
			    	setIsAdmin(true);
			    }
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
    <div className={classes.root}>
      <Helmet>
        <title>VM Web User Info</title>
      </Helmet> <br/>
      {/*사용자 정보를 수정하는 Modal-----------------------------------------------------------*/}
      <Modal
       aria-labelledby="transition-modal-title"
       aria-describedby="transition-modal-description"
       className={classes.modal}
       open={modal}
       onClose={handleClose}
       closeAfterTransition
       BackdropComponent={Backdrop}
       BackdropProps={{
       timeout: 500,
       }}
      >
        <Fade in={modal}>
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
            	defaultValue={user.name}
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
          	     defaultValue={user.email}
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
         	      defaultValue={user.password}
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
                  defaultValue={user.group}
                  value={group}
                 >
                   {groupList.map((name) => (
                	  <MenuItem key={name} value={name}>{name}</MenuItem> 
                   ))}
                 </Select>
               </FormControl><br />
          VM : <TextField
          		onChange={handleChange}
                className="validate"
                name="VMs"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="vm"
                label="VM"
                disabled
           	    defaultValue={user.num_VM}
               />    
            <Button
             onClick={handleModal}
             variant="contained"
             color="secondary"
             className={classes.submit}
             disabled={name === '' || email === '' || password === '' || group === ''}
            >
              수정
            </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
             onClick={handleModalClose}
             variant="contained"
             color="primary"
             className={classes.submit}
            >
              취소
            </Button>
          </div>
        </Fade>
      </Modal>
      {/*사용자 정보를 수정하는 Modal-----------------------------------------------------------*/}
      
      {/*사용자를 삭제하는  Modal--------------------------------------------------------------*/}
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
             <h2 id="transition-modal-title">사용자를 삭제하시겠습니까?</h2>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
              className={classes.submit}
             >
               예
             </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              className={classes.submit}
             >
               아니요
             </Button>
           </div>
         </Fade>
       </Modal>
       {/*사용자를 삭제하는  Modal--------------------------------------------------------------*/}
       
      <Typography variant="h4" gutterBottom>
      &nbsp;&nbsp;&nbsp;User Profile
      </Typography> <br/>
      <Paper className={classes.paper}>
        <Grid container spacing={10}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/User.png" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h3" color="textSecondary">
                  {user.email}
                </Typography> <br />
                <Typography variant="h6" gutterBottom>
                  이름: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.name}
                </Typography>
                <Divider />
                <Typography variant="h6" gutterBottom>
                  이메일: &nbsp;&nbsp;{user.email}
                </Typography>
                <Divider />
                <Typography variant="h6" gutterBottom>
                  그룹: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.group}
                </Typography>
                <Divider />
                <Typography variant="h6" gutterBottom>
                  VM : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.num_VM}개
                </Typography>
                <Divider />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleModalOpen}> 
                   정보 수정 
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={goBack}>
                  뒤로 가기 
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                {isAdmin === true ? (
                	<Button variant="contained" color="secondary"> 
                		관리자 권한 삭제
                	</Button> ): ( 
                	<>
                	<Button variant="contained" color="primary"> 
                		관리자 권한 부여
                	</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                	<Button variant="contained" color="secondary" onClick={handleOpen}> 
                    	사용자 삭제
                    </Button>
                    </>)
                }
              </Grid>
            </Grid>
            <Grid item>
              {isAdmin === true ?  <Typography variant="subtitle1" color="error">관리자</Typography> : 
            	  <Typography variant="subtitle1" color="error">사용자</Typography>}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}