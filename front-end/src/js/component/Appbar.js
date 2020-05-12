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
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

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

const styles = makeStyles((theme) => ({
	root: {
		position: 'fixed',
	    bottom: theme.spacing(2),
	    right: theme.spacing(2),
	},
}));

function ScrollTop(props) {
	const { children, window } = props;
	const classes = styles();
	  // Note that you normally won't need to set the window ref as useScrollTrigger
	  // will default to window.
	  // This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
	    target: window ? window() : undefined,
	    disableHysteresis: true,
	    threshold: 100,
	});

	const handleClick = (event) => {
	  const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

	  if (anchor) {
		  anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
	  }
	};

	return (
	    <Zoom in={trigger}>
	        <div onClick={handleClick} role="presentation" className={classes.root}>
	            {children}
	        </div>
	    </Zoom>
	);
}

ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	  /**
	   * Injected by the documentation to work in an iframe.
	   * You won't need it on your project.
	   */
	window: PropTypes.func,
};

export default function Appbar(props) {
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
            disabled={!props.isLoggedIn}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            VM WEB ADMIN
          </Typography>
          {props.isLoggedIn ? (
	        		   <Link component={RouterLink} to="/">
			           	  <Button variant="contained" color="primary" onClick={props.onLogout} className={classes.button}>
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
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
          </Fab>
      </ScrollTop>
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