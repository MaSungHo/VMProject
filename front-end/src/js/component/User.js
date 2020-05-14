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
	const [length, setLength] = useState([]);
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const [view, setView] = useState(false);
	
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [group, setGroup] = useState('');
	const [virt, setVirt] = useState([]);
	const [groupList, setGroupList] = useState([]);
	
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
	
	const handleModalOpen = () => {
		setModal(true);
	}
	  
	const handleModalClose = () => {
		setModal(false);
	}
	
	// 임시로 이름 붙여놓은 함수
	const handleModal = () => {
		handleChangeUser()
		setModal(false);
	}
	
	const handleView = () => {
		setView(!view);
	}
	
	const goBack = () => {
		history.goBack();
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
		else if(e.target.name === 'VMs') {
			var Vm_array = e.target.value.split(',');
			setVirt(Vm_array)
		} 
	}
	
	const handleChangeUser = () => {
		axios.put('http://localhost:8090/users/' + match.params.email + '/', {
			name: name,
			email: email,
			password: password,
			group: group,
			VMs: virt
		})
		history.goBack();
	}
	
	var vms = new Array();
	for(var i=0;i<length;i++){
	    vms[i]=user.VMs[i];
	}
	let vm_array = vms.map((value, key) => <li key = {key}>{value}</li>);
		
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
		    setVirt(res.data.VMs);
		    setLength(res.data.VMs.length);
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
          VM: <TextField
          		onChange={handleChange}
                className="validate"
                name="VMs"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="vm"
             	label="VM"
             	defaultValue={user.VMs}
               />    
            <Button
             onClick={handleModal}
             variant="contained"
             color="secondary"
             className={classes.submit}
             disabled={name === '' || email === '' || password === '' || group === '' || virt.length === 0}
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
       
      <Typography variant="h4" gutterBottom>
      &nbsp;&nbsp;&nbsp;Profile - {user.name}
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
                  VM: {vm_array}
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
                <Button variant="contained" color="secondary" onClick={handleOpen}> 
                  사용자 삭제
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color="error">사용자</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}