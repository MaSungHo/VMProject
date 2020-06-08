import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
	marginTop: '4%',
	marginBottom: '5%',
	marginLeft: '23%',
	marginRight: '25%',
	justifyContent: 'center',
	alignItems: 'center',
  },
  img: {
	marginBottom: '2%',  
    marginLeft: '25%',
	width: 400,
	height: 400,
  },
}));

const RootPage = () => {
  const classes = useStyles();
	
  return (
	<div>
	  <Helmet>
	    <title> VM Web Admin </title>
	  </Helmet>
	  <Box className={classes.box}>
	    <img src='/img/ajou-logo.jpg' className={classes.img} />
	    <Typography variant='h4' align='center' gutterBottom color="textSecondary"> Ajou University </Typography>
	    <Typography variant='h4' align='center' gutterBottom color="textSecondary"> VM WEB ADMIN PROJECT </Typography>
	  </Box>
    </div>
  )
}

export default RootPage;