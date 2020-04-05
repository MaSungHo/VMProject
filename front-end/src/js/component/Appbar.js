import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import LogoutButton from './LogoutButton';

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
			    	 onClick={this.handleDrawerToggle} disabled={!this.props.auth}>
			           <MenuIcon />
			        </IconButton>
			        {this.props.auth ? (
			           <LogoutButton logout={this.props.logout} />
			             ) : (
			           <RouterLink to="/login">
			              <Button variant="contained" color="primary">Login</Button>
			           </RouterLink> )}
			      </Toolbar>
			    </AppBar>
			    <Drawer open={this.state.toggle}>
			      <MenuItem onClick={this.handleDrawerToggle}>
		            <Link component={RouterLink} to="/profile">
		              프로필 보기
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

export default withStyles(styles)(Appbar);
