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

import NotFound from '../container/NotFound';

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
	const [erase, setErase] = useState(false);
	const [running, setRunning] = useState(false);
	const [stopped, setStopped] = useState(false);
	const [found, setFound] = useState(false);
	
	const [name, setName] = useState("");
	const [osType, setOsType] = useState("");
	const [resourceGroup, setResourceGroup] = useState("");
	const [publicIP, setPublicIP] = useState("");
	const [size, setSize] = useState("");
	const [vmSize, setVmSize] = useState("");
	const [condition, setCondition] = useState("");
	
	const [sizeList, setSizeList] = useState(["Standard_B1ls (1 vcpu, 0.5 GiB)",
											  "Standard_B1s (1 vcpu, 1 GiB)",
											  "Standard_DS1_v2 (1 vcpu, 3.5 GiB)",
											  "Standard_D2s_v3 (2 vcpu, 8 GiB)"]);
	const [osList, setOsList] = useState([]);
	const [num, setNum] = useState(0);
	const [action, setAction] = useState("");

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
	  axios.get('http://localhost:8090/users/' + match.params.email + '/')
	    .then(res => {
	      if (!unmounted) {
		    setFound(true);
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
		setCondition(vmData.status);
		setInfoOpen(true);
	}
	
	const closeInfoOpen = () => {
		setName("");
		setOsType("");
		setResourceGroup("");
		setPublicIP("");
		setSize("");
		setCondition("");
		setInfoOpen(false);
	}
	
	const openCreateOpen = () => {
		axios.get('http://localhost:8090/users/' + match.params.email + '/')
		  .then(res => {
			  setNum(res.data.num_VM);
			  setCreateOpen(true);
			  setAction("생성");
		  });
	}
	
	const closeCreateOpen = () => {
		setOsType("");
		setNum(0);
		setVmSize("");
		setCreateOpen(false);
	}
	
	const handleChange = (e) => {
		if(e.target.name === 'osType') {
			setOsType(e.target.value);
		}
		else if(e.target.name === 'vmSize') {
			setVmSize(e.target.value);
		}
	}
	
	const handleCreate = () => {
		openLoading();
		var vmName = match.params.email.split("@");
		axios.post('http://localhost:8090/VMs/new', {
			email: match.params.email,
			osName: osType,
			vmName: vmName[0] + "_VM_" + num,
			vmSize: vmSize
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
	
	const openErase = (vm) => {
		var vmData = vm;
		setName(vmData.vmName);
		setResourceGroup(vmData.resourceGroupName);
		setAction("삭제");
		setErase(true);
	}
	
	const closeErase = () => {
		setName("");
		setResourceGroup("");
		setErase(false);
	}
	
	const handleErase = () => {
		openLoading();
		axios.delete('http://localhost:8090/existing/delete/' + resourceGroup + '/' + name)
		  .then(res => {
		     if(res.status === 204) {
			   closeLoading();
			   closeErase();
			   openComplete();
			   axios.get('http://localhost:8090/existing/' + match.params.email + '/admin')
			     .then(response => {
				    setVms(response.data);
				 })
			 }
			 else {
			   closeLoading();
			   closeErase();
			   openFail();
			 }
		  })
	}
	
	const openRunning = (vm) => {
		var vmData = vm;
		setName(vmData.vmName);
		setResourceGroup(vmData.resourceGroupName);
		setAction("실행");
		setRunning(true);
	}
	
	const closeRunning = () => {
		setRunning(false);
	}
	
	const handleRunning = () => {
		openLoading();
		axios.put('http://localhost:8090/existing/start/admin/' + resourceGroup + '/' + name)
		  .then(res => {
			  if(res.status === 200) {
				   closeLoading();
				   closeRunning();
				   openComplete();
				   axios.get('http://localhost:8090/existing/' + match.params.email + '/admin')
				     .then(response => {
					    setVms(response.data);
					 })
				 }
				 else {
				   closeLoading();
				   closeRunning();
				   openFail();
				 }
		  })
	}
	
	const openStopped = (vm) => {
		var vmData = vm;
		setName(vmData.vmName);
		setResourceGroup(vmData.resourceGroupName);
		setAction("중지");
		setStopped(true);
	}
	
	const closeStopped = () => {
		setStopped(false);
	}
	
	const handleStopped = () => {
		openLoading();
		axios.put('http://localhost:8090/existing/stop/admin/' + resourceGroup + '/' + name)
		  .then(res => {
			  if(res.status === 200) {
				   closeLoading();
				   closeStopped();
				   openComplete();
				   axios.get('http://localhost:8090/existing/' + match.params.email + '/admin')
				     .then(response => {
					    setVms(response.data);
					 })
				 }
				 else {
				   closeLoading();
				   closeStopped();
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
		setAction("");
	}
	
	const openFail = () => {
		setFail(true);
	}
	
	const closeFail = () => {
		setFail(false);
		setAction("");
	}
	
    return (
      <div>
      {found === false ? (
        <NotFound history={history} />) : (
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
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  status: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {condition === "running" ? "실행 중" : "중지됨"}
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
			       
			  VM 사이즈: <br/><FormControl className={classes.formControl}>
			         <Select
			          id="vmSize"
			          name="vmSize"
			          onChange={handleChange}
			          label="vmSize"
			          fullWidth
			          defaultValue={sizeList[0]}
			          value={vmSize}
			         >
			           {sizeList.map((vmSize) => (
			    	      <MenuItem key={vmSize} value={vmSize.split(" ")[0]}>{vmSize}</MenuItem> 
			           ))}
			         </Select>
			       </FormControl><br /><br />
			       
			       <Button 
			        variant="contained" 
			        color="primary" 
			        onClick={handleCreate}
			        disabled={osType==="" || vmSize===""}
			       >
			         할당
			       </Button>
			       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			       <Button variant="contained" color="secondary" onClick={closeCreateOpen}>취소</Button>
            </div>
          </Fade>
        </Modal>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={erase}
        onClose={closeErase}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
          <Fade in={erase}>
            <div className={classes.modal_paper}>
              <h2 id="transition-modal-title">{resourceGroup} 그룹의 가상머신 {name}을 삭제하시겠습니까?</h2><br/>
			  <Button variant="contained" color="secondary" onClick={handleErase} className={classes.center_button}>삭제</Button>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <Button variant="contained" color="primary" onClick={closeErase}>취소</Button>
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
              <h2 id="transition-modal-title">VM을 {action} 중입니다...</h2><br/>
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
              <h2 id="transition-modal-title">VM을 성공적으로 {action}했습니다.</h2><br/>
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
              <h2 id="transition-modal-title">요청한 작업 수행 중 오류가 발생했습니다.</h2><br/>
              &nbsp;&nbsp;&nbsp;
              <Button variant="contained" color="primary" onClick={closeFail} className={classes.center_button}>확인</Button>
            </div>
          </Fade>
        </Modal>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={running}
        onClose={closeRunning}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
          <Fade in={running}>
            <div className={classes.modal_paper}>
              <h2 id="transition-modal-title">{resourceGroup} 그룹의 가상머신 {name}을 실행하시겠습니까?</h2><br/>
			  <Button variant="contained" color="secondary" onClick={handleRunning} className={classes.center_button}>실행</Button>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <Button variant="contained" color="primary" onClick={closeRunning}>취소</Button>
            </div>
          </Fade>
        </Modal>        
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={stopped}
        onClose={closeStopped}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
        >
          <Fade in={stopped}>
            <div className={classes.modal_paper}>
              <h2 id="transition-modal-title">{resourceGroup} 그룹의 가상머신 {name}을 중지하시겠습니까?</h2><br/>
			  <Button variant="contained" color="secondary" onClick={handleStopped} className={classes.center_button}>중지</Button>
			  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <Button variant="contained" color="primary" onClick={closeStopped}>취소</Button>
            </div>
          </Fade>
        </Modal>
        
        <Paper className={classes.paper}>
          {vms.length === 0 ? (<h2 id="transition-modal-title">할당 받은 VM이 없습니다.</h2>) :
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
                      {vm.status === "running" ?
                         (<Button variant="contained" color="primary" onClick={()=>openStopped(vm)}>VM 중지</Button>) : 
                         (<Button variant="contained" color="primary" onClick={()=>openRunning(vm)}>VM 실행</Button>) 
                      } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button variant="contained" color="secondary" onClick={()=>openErase(vm)}>VM 삭제</Button>
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
        </div> )}
      </div>
  );
}