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
}));

export default function VMs({match}) {
	const classes = useStyles();
	const [checked, setChecked] = useState([0]);
	const [vmOption, setVmOption] = useState([]);
	const [vms, setVms] = useState([]);
	
	useEffect(() => {
	  let unmounted = false;
	  let source = axios.CancelToken.source();
	  axios.get('http://localhost:8090/VMs')
	    .then(res => {
	      if (!unmounted) {
		    setVmOption(res.data);
		    console.log(res.data);
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
	
	const handleToggle = (value) => () => {
	  const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

	  if (currentIndex === -1) {
	    newChecked.push(value);
	  } else {
	    newChecked.splice(currentIndex, 1);
  	  }

	  setChecked(newChecked);
    };
	
    return (
      <div>
        <Helmet>
    	  <title>VM Web Virtual Machines Info</title>
        </Helmet> <br/>
        <Typography variant="h5" gutterBottom>
          &nbsp;&nbsp;&nbsp;생성 가능한 VM
        </Typography> <br/>
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
                    <IconButton edge="end" aria-label="comments">
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