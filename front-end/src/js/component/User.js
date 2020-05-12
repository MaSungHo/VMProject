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
}));

export default function User({match, history}) {
	const classes = useStyles();
	const [user, setUser] = useState([]);
	const [length, setLength] = useState([]);
	const [open, setOpen] = useState(false);
	
	const handleOpen = () => {
		setOpen(true);
	}
	  
	const handleClose = () => {
		setOpen(false);
	}
	
	const handleDelete = () => {
		setOpen(false);
		axios.delete('http://localhost:8090/users/' + match.params.email);
		history.goBack();
	}
	
	const goBack = () => {
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
		    setLength(res.data.VMs.length);
			if (axios.isCancel()) {
			  console.log(`request cancelled:${e.message}`);
			} else {
			}
		}
	  });
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
        Profile - {user.name}
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
                <Button variant="contained" color="primary"> 정보 수정 </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={goBack}> 뒤로 가기 </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color="secondary" onClick={handleOpen}> 사용자 삭제 </Button>
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