import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
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
};

class Appbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: false,
		};
	}
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
			        {this.props.isLoggedIn ? (
			        		   <RouterLink to="/">
					           	  <Button variant="contained" color="primary" onClick={this.props.onLogout}>Logout</Button>
					           </RouterLink>
					             ) : (
					           <RouterLink to="/login">
					              <Button variant="contained" color="primary">Login</Button>
					           </RouterLink> )}
			      </Toolbar>
			    </AppBar>
			    <Drawer open={this.state.toggle}>
			      <MenuItem onClick={this.handleDrawerToggle}>
		            <Link component={RouterLink} to="/">
		              홈 화면
		            </Link>
		          </MenuItem>
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

export default withStyles(styles)(Appbar);
