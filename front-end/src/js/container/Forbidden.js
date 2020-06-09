import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import WarningIcon from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
	marginTop: '7%',
	marginBottom: '5%',
	marginLeft: '23%',
	marginRight: '25%',
    justifyContent: 'center',
	alignItems: 'center',
  },
  icon: {
	marginLeft: '37%',
	marginTop: '1%',
    width: 200,
    height: 200,
  },
  button: {
	marginTop: '2%',
	marginLeft: '43%',
  }
}));

const Forbidden = ( { history } ) => {
	const classes = useStyles();
	
	return (
		<div>
		  <Helmet>
		    <title> Not Authenticated </title>
		  </Helmet>
		  <Box className={classes.box}>
              <Typography variant='h3' align="center" gutterBottom color="textSecondary"> Access Forbidden </Typography>
              <WarningIcon color="action" className={classes.icon} />
              <Typography variant='h3' align="center" gutterBottom color="textSecondary"> 401 </Typography>
              <Typography variant='h4' align="center" gutterBottom color="textSecondary"> 요청하신 페이지에 대한 권한이 없습니다. </Typography>
              <Link to="/">
              	<Button variant="contained" className={classes.button} color='primary'>로그인 페이지</Button>
              </Link>
          </Box>
		</div>
	)
}

export default Forbidden;
