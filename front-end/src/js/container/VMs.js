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
	  marginLeft: '23%',
  },
  center_button: {
	  marginLeft: '37%',
  },
}));

export default function VMs({match}) {
	const classes = useStyles();
	const [checked, setChecked] = useState([0]);
	const [vmOption, setVmOption] = useState([]);
	const [infoOpen, setInfoOpen] = useState(false);
	const [createOpen, setCreateOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [complete, setComplete] = useState(false);
	const [fail, setFail] = useState(false);
	
	const [name, setName] = useState("");
	const [offer, setOffer] = useState("");
	const [publisher, setPublisher] = useState("");
	const [sku, setSku] = useState("");
	const [version, setVersion] = useState("");
	
	const [users, setUsers] = useState([]);
	const [groupList, setGroupList] = useState([]);
	const [emailList, setEmailList] = useState([]);
	const [group, setGroup] = useState("");
	const [email, setEmail] = useState("");
	const [num, setNum] = useState(0);
	
	useEffect(() => {
	  let unmounted = false;
	  let source = axios.CancelToken.source();
	  axios.get('http://localhost:8090/users')
	  .then(res => {
	      if (!unmounted) {
	        setUsers(res.data);
	        if (axios.isCancel()) {
	          console.log(`request cancelled:${e.message}`);
	        } else {
	        }
	      }
		});
	  axios.get('http://localhost:8090/VMs')
	    .then(res => {
	      if (!unmounted) {
		    setVmOption(res.data);
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
	    });
		return function () {
		  unmounted = true;
		  source.cancel("Cancelling in cleanup");
	    };
	}, []);
	
	const openInfoOpen = (vm) => {
		var vmData = vm;
		setName(vmData.name);
		setOffer(vmData.offer);
		setPublisher(vmData.publisher);
		setSku(vmData.sku);
		setVersion(vmData.version);
		setInfoOpen(true);
	}
	
	const closeInfoOpen = () => {
		setName("");
		setOffer("");
		setPublisher("");
		setSku("");
		setVersion("");
		setInfoOpen(false);
	}
	
	const openCreateOpen = (vm) => {
		var vmData = vm;
		setName(vmData.name);
		setCreateOpen(true);
	}
	
	const closeCreateOpen = () => {
		setGroup("");
		setEmailList([]);
		setEmail("");
		setNum(0);
		setCreateOpen(false);
	}
	
	const handleChange = (e) => {
		if(e.target.name === 'group') {
			setEmailList([]);
			setGroup(e.target.value)
			var all = users;
			var n = 0;
			var list = new Array();
			for(var i = 0; i < all.length; i++){		
				if(all[i].group === e.target.value) {
					list[n] = all[i].email;
					n = n + 1;
				}
			}
			setEmailList(list);
		}
		if(e.target.name === 'email') {
			setEmail(e.target.value)
			axios.get('http://localhost:8090/users/' + e.target.value + '/')
			  .then(res => {
				  setNum(res.data.num_VM);
			  });
		}
	}
	
	const handleCreate = () => {
		openLoading();
		var vmName = email.split("@");
		axios.post('http://localhost:8090/VMs/new', {
			email: email,
			osName: name,
			vmName: vmName[0] + "_VM_" + num
		})
		.then(res => {
			if(res.status === 200) {
				closeLoading();
				closeCreateOpen();
				openComplete();
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
    	  <title>VM Web Virtual Machines Info</title>
        </Helmet> <br/>
        <Typography variant="h5" gutterBottom>
          &nbsp;&nbsp;&nbsp;생성 가능한 VM
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
              <img src={"/img/"+name+".jpg"} className={classes.img}/>
              <h2 id="transition-modal-title">{name}</h2>
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  offer: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {offer}
                </Typography>
              </div>
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  publisher: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {publisher}
                </Typography>
              </div>
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  sku: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {sku}
                </Typography>
              </div>
              <div style={{display:"flex"}}>
                <Typography gutterBottom variant="subtitle1">
                  version: &nbsp;
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="textSecondary">
                  {version}
                </Typography>
              </div>
            </div>
          </Fade>
        </Modal> 
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
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
              <h2 id="transition-modal-title">{name} 을 할당할 사용자</h2><br/>
              그룹: <br/><FormControl className={classes.formControl}>
  			         <Select
  			          id="group"
  			          name="group"
  			          onChange={handleChange}
  			          label="Group"
  			          fullWidth
  			          defaultValue={groupList[0]}
  			          value={group}
  			         >
  			           {groupList.map((name) => (
  			    	      <MenuItem key={name} value={name}>{name}</MenuItem> 
  			           ))}
  			         </Select>
  			       </FormControl><br /><br/>
  			  이메일: <br/> <FormControl className={classes.formControl}>
			         <Select
			          id="email"
			          name="email"
			          onChange={handleChange}
			          label="Email"
			          fullWidth
			          value={email}
			         >
			           {emailList.map((email) => (
			    	      <MenuItem key={email} value={email}>{email}</MenuItem> 
			           ))}
			         </Select>
			       </FormControl><br /><br />
			       <Button variant="contained" color="primary" className={classes.button} onClick={handleCreate}>할당</Button>
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
          <List className={classes.root}>
            {vmOption.map((vm) => {
              return (
                <ListItem key={vm.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar className={classes.large} src={"/img/"+vm.name+".jpg"} />
                  </ListItemAvatar>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <ListItemText id={vm.id} primary={vm.name} secondary={vm.publisher}/> 
                  <Divider />
                  <ListItemSecondaryAction>
                  <Button variant="contained" color="primary" onClick={()=>openCreateOpen(vm)}>생성</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <IconButton edge="end" aria-label="comments" onClick={()=>openInfoOpen(vm)}>
                      <SearchIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </div>
  );
}