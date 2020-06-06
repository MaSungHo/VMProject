import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import '../css/custom.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: theme.palette.background.paper,
  },
  img: {
	width: 300,
	height: 250,
  },
  paper: {
	margin: 'auto',
    padding: theme.spacing(2),
    marginLeft: '5%',
    marginRight: '5%',
  },
  modal: {
	display: 'flex',
    alignItems: 'center',
	justifyContent: 'center',
  },
  modal_create: {
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
  large: {
	width: theme.spacing(8),
	height: theme.spacing(8),
  },
  button: {
	  minWidth: 100,
	  marginTop: 20,
	  marginLeft: '75%',
	  align: 'right',
  },
  button_back: {
	  minWidth: 100,
	  marginTop: 20,
	  align: 'right',
  },
  center_button: {
	  marginLeft: '37%',
  },
}));

export default function VMs({ history, match }) {
	const classes = useStyles();
	const [checked, setChecked] = useState([0]);
	const [vms, setVms] = useState([]);
	const [infoOpen, setInfoOpen] = useState(false);
	const [createOpen, setCreateOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [complete, setComplete] = useState(false);
	const [fail, setFail] = useState(false);
	
	const [name, setName] = useState("");
	const [osType, setOsType] = useState("");
	const [resourceGroup, setResourceGroup] = useState("");
	const [publicIP, setPublicIP] = useState("");
	const [size, setSize] = useState("");
	
	const [osList, setOsList] = useState([]);
	const [num, setNum] = useState(0);

	useEffect(() => {
	  let unmounted = false;
	  let source = axios.CancelToken.source();
	  axios.get('http://localhost:8090/existing/' + match.params.email + '/admin')
	    .then(res => {
	      if (!unmounted) {
		    setVms(res.data);
		    if (axios.isCancel()) {
		      console.log(`request cancelled:${e.message}`);
		    } else {
			}
		  }
		});
	  axios.get('http://localhost:8090/VMs/list')
	    .then(res => {
	      if (!unmounted) {
		    setOsList(res.data);
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
	
	const goBack = () => {
		history.goBack()
	}
	
	const openInfoOpen = (vm) => {
		var vmData = vm;
		setName(vmData.vmName);
		setOsType(vmData.osType);
		setResourceGroup(vmData.resourceGroupName);
		setPublicIP(vmData.publicIPAddress);
		setSize(vmData.size);
		setInfoOpen(true);
	}
	
	const closeInfoOpen = () => {
		setName("");
		setOsType("");
		setResourceGroup("");
		setPublicIP("");
		setSize("");
		setInfoOpen(false);
	}
	
	const openCreateOpen = () => {
		axios.get('http://localhost:8090/users/' + match.params.email + '/')
		  .then(res => {
			  setNum(res.data.num_VM);
			  setCreateOpen(true);
		  });
	}
	
	const closeCreateOpen = () => {
		setOsType("");
		setNum(0);
		setCreateOpen(false);
	}
	
	const handleChange = (e) => {
		if(e.target.name === 'osType') {
			setOsType(e.target.value);
		}
	}
	
	const handleCreate = () => {
		openLoading();
		var vmName = match.params.email.split("@");
		axios.post('http://localhost:8090/VMs/new', {
			email: match.params.email,
			osName: osType,
			vmName: vmName[0] + "_VM_" + num
		})
		.then(res => {
			if(res.status === 200) {
				closeLoading();
				closeCreateOpen();
				openComplete();
				axios.get('http://localhost:8090/existing/' + match.params.email + '/admin')
			    .then(response => {
			    	setVms(response.data);
			    })
			}
			else {
				closeLoading();
				closeCreateOpen();
				openFail();
			}
		})
	}
	
	const openLoading = () => {
		setLoading(true);
	}
	
	const closeLoading = () => {
		setLoading(false);
	}
	
	const openComplete = () => {
		setComplete(true);
	}
	
	const closeComplete = () => {
		setComplete(false);
	}
	
	const openFail = () => {
		setFail(true);
	}
	
	const closeFail = () => {
		setFail(false);
	}
	
    return (
      <div>
        <Helmet>
    	  <title>{match.params.email} - VMs</title>
        </Helmet> <br/>
        <Typography variant="h5" gutterBottom>
          &nbsp;&nbsp;&nbsp;{match.params.email}의 가상 머신
        </Typography> <br/>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={infoOpen}
        onClose={closeInfoOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
          <Fade in={infoOpen}>
            <div className={classes.modal_paper}>
              <img src={"/img/"+osType+".jpg"} className={classes.img}/>
              <h2 id="transition-modal-title">{name}</h2>
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  OS: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {osType}
                </Typography>
              </div>
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  리소스 그룹: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {resourceGroup}
                </Typography>
              </div>
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  공용 IP: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {publicIP}
                </Typography>
              </div>
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  size: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {size}
                </Typography>
              </div>
            </div>
          </Fade>
        </Modal> 
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal_create}
        open={createOpen}
        onClose={closeCreateOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
          <Fade in={createOpen}>
            <div className={classes.modal_paper}>
              <h2 id="transition-modal-title">새로운 VM 생성</h2><br/>
              새로 할당 할 OS: <br/><FormControl className={classes.formControl}>
  			         <Select
  			          id="osType"
  			          name="osType"
  			          onChange={handleChange}
  			          label="osType"
  			          fullWidth
  			          defaultValue={osList[0]}
  			          value={osType}
  			         >
  			           {osList.map((os) => (
  			    	      <MenuItem key={os} value={os}>{os}</MenuItem> 
  			           ))}
  			         </Select>
			       </FormControl><br /><br />
			       <Button variant="contained" color="primary" onClick={handleCreate}>할당</Button>
			       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			       <Button variant="contained" color="secondary" onClick={closeCreateOpen}>취소</Button>
            </div>
          </Fade>
        </Modal>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loading}
        onClose={closeLoading}
        closeAfterTransition
        disableBackdropClick
        disableEscapeKeyDown
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
          <Fade in={loading}>
            <div className={classes.modal_paper}>
              <h2 id="transition-modal-title">VM을 생성 중입니다...</h2><br/>
              <Typography gutterBottom variant="subtitle1">몇 분의 시간이 소요될 수 있습니다</Typography>
            </div>
          </Fade>
        </Modal>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={complete}
        onClose={closeComplete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
          <Fade in={complete}>
            <div className={classes.modal_paper}>
              <h2 id="transition-modal-title">VM을 성공적으로 생성했습니다.</h2><br/>
              <Button variant="contained" color="primary" onClick={closeComplete} className={classes.center_button}>확인</Button>
            </div>
          </Fade>
        </Modal>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={fail}
        onClose={closeFail}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
          <Fade in={fail}>
            <div className={classes.modal_paper}>
              <h2 id="transition-modal-title">VM 생성 중 오류가 발생했습니다.</h2><br/>
              <Button variant="contained" color="primary" onClick={closeFail} className={classes.center_button}>확인</Button>
            </div>
          </Fade>
        </Modal>
        
        <Paper className={classes.paper}>
          {vms.length === 0 ? (<h2 id="transition-modal-title">할당받은 VM이 없습니다.</h2>) :
            (<List className={classes.root}>
              {vms.map((vm) => {
                return (
                  <ListItem key={vm.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar className={classes.large} src={"/img/"+vm.osType+".jpg"} />
                    </ListItemAvatar>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <ListItemText id={vm.id} primary={vm.vmName} secondary={vm.osType}/> 
                    <Divider />
                    <ListItemSecondaryAction>
                      <Button variant="contained" color="secondary" onClick={()=>openCreateOpen(vm)}>VM 삭제</Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <IconButton edge="end" aria-label="comments" onClick={()=>openInfoOpen(vm)}>
                        <SearchIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>)
          }
        </Paper>
        <Button variant="contained" color="primary" onClick={goBack} className={classes.button}>이전 페이지로</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" color="primary" onClick={openCreateOpen} className={classes.button_back}>새로운 VM 할당</Button>
      </div>
  );
}