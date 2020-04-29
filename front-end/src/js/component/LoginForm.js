import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

class Copyright extends Component {
  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
	    {'Copyright © '}
	    <Link color="inherit" href="https://material-ui.com/">
	      VM Web Admin Project
	    </Link>{' '}
	    {new Date().getFullYear()}
	    {'.'}
	  </Typography>
    );
  }
}

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://whomentor.com/wp-content/uploads/cache/images/remote/i2-wp-com/Ajou-University-2685014912.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LoginForm extends Component {
  	
  state = {
	email: "",
	password: ""
  }
  
  //input의 내용이 변경되었을 때 state를 바꿔주는 함수
  handleChange = (e) => {
	let nextState = {};
	nextState[e.target.name] = e.target.value
	this.setState(nextState);
  }
	
  // 로그인을 담당하는 함수
  handleLogin = () => {
	let email = this.state.email;
	let password = this.state.password;
	
	//props로 전달받은 onLogin 메소드를 사용함.
	this.props.onLogin(email, password).then(
		(success) => {
			if(!success) {
				this.setState({
					email:'',
					password: ''
				})
			}
		}
	);
  }
	
  //Enter키를 누르면 로그인을 할 수 있게 해주는 함수
  handleKeyPress = (e) => {
	if(e.charCode==13) {
		this.handleLogin();
	}
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={this.props.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
            onChange={this.handleChange}
		    onKeyPress={this.handleKeyPress}
		    value={this.state.email}
            className="validate"
            name="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            />
            <TextField
            onChange={this.handleChange}
			onKeyPress={this.handleKeyPress}
			value={this.state.password}
            className="validate"
            name="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <Button
             onClick={this.handleLogin}
             type="submit"
             fullWidth
             variant="contained"
             color="primary"
             className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={8}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginForm);