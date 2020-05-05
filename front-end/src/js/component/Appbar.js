/*
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: 'auto'
	},
	title: {
	    flexGrow: 1,
	},
};

class Appbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: false,
			open: false
		};
	}
	
	handleDrawerOpen = () => {
	    this.setState({open: true});
	};

	handleDrawerClose = () => {
	    this.setState({open: false});
	};
	handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})
	render() {
		const { classes } = this.props;
		return (
			<div>
			  <div className={classes.root}>
			    <AppBar position="static">
			      <Toolbar>
			        <IconButton 
			         edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
			    	 onClick={this.handleDrawerToggle}
			         disabled={!this.props.isLoggedIn}
			         >
			           <MenuIcon />
			        </IconButton>
			        <Typography variant="h6" className={classes.title}>
		              VM WEB ADMIN 
		            </Typography>
			        {this.props.isLoggedIn ? (
			        		   <RouterLink to="/">
					           	  <Button variant="contained" color="primary" onClick={this.props.onLogout}>
					           	    <LockOpenIcon fontSize="default" /> &nbsp;&nbsp;
					           	      <Typography variant="button">
							            LOG OUT
							          </Typography>
					           	  </Button>
					           </RouterLink>
					             ) : (
					           <></> )}
			      </Toolbar>
			    </AppBar>
			    <Drawer open={this.state.toggle}>
			      <IconButton onClick={this.handleDrawerClose} />
			      <MenuItem onClick={this.handleDrawerToggle}>
			        <Link component={RouterLink} to="/users">
			          사용자 관리
			        </Link>
			      </MenuItem>
			      <MenuItem onClick={this.handleDrawerToggle}>
			        <Link component={RouterLink} to="/groups">
			          그룹 관리
			        </Link>
			      </MenuItem>
			    </Drawer>
			  </div>
			  <div id="content" style={{margin:'auto', marginTop:'20px'}}>
			    {React.cloneElement(this.props.children)}
			  </div>
			</div>
		);
	}
}

Appbar.propTypes = {
	isLoggedIn: PropTypes.bool,
	onLogout: PropTypes.func
};

Appbar.defaultProps = {
	isLoggedIn: false,
	onLogout: () => { console.error("logout function not defined"); }
};

export default withStyles(styles)(Appbar); */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
	  marginLeft: theme.spacing(142),  
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Appbar({isLoggedIn, onLogout}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLink = (index) => {
	  if(index === 0) {
		  
	  }
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            disabled={!isLoggedIn}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            VM WEB ADMIN
          </Typography>
          {isLoggedIn ? (
	        		   <Link component={RouterLink} to="/">
			           	  <Button variant="contained" color="primary" onClick={onLogout} className={classes.button}>
			           	    <LockOpenIcon fontSize="default" /> &nbsp;&nbsp;
			           	      <Typography variant="button">
					            LOG OUT
					          </Typography>
			           	  </Button>
			           </Link>
			             ) : (
			           <></> )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['사용자 관리', '그룹 관리'].map((text, index) => (
        	<Link key={index} color = 'inherit' component={RouterLink} to=
        		{index === 0 ? "/users" : (
        				index === 1 ? "/groups" : "/") }>
              <ListItem button key={index} onClick={event => {
            	handleDrawerClose();
                }} >
                  <ListItemIcon>
                    { index === 0 ? <PeopleIcon /> : (
              		    index === 1 ? <GroupWorkIcon /> : <PeopleIcon />
                    )}
                  </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
