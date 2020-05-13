import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
  image: {
	backgroundImage : 'url(/Ajou-logo.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
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
	password: "",
	open: false,
	view: false
  }
  
  
  handleClose = () => {
	    this.setState({
	    	open: false
	    });
  };
  
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
					password: '',
					open: true
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
  
  handleView = () => {
	  this.setState({
		  view: !this.state.view
	  })
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={this.props.root}>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
         <Fade in={this.state.open}>
           <div className={classes.modal_paper}>
             <h2 id="transition-modal-title">로그인에 실패했습니다.</h2>
             <p id="transition-modal-description">아이디와 비밀번호를 확인해주세요.</p>
             <Button
             onClick={this.handleClose}
             fullWidth
             variant="contained"
             color="primary"
             className={classes.submit}
             >
               Close
             </Button>
            </div>
          </Fade>
        </Modal>
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
            label="Email"
            autoComplete="email"
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
            type={this.state.view ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.handleView}>
                     {this.state.view ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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