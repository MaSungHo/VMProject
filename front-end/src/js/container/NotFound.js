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

const NotFound = ( { history } ) => {
	const classes = useStyles();
	
	const goBack = () => {
		history.goBack()
	}
	
	return (
		<div>
		  <Helmet>
		    <title> Not Found </title>
		  </Helmet>
		  <Box className={classes.box}>
              <Typography variant='h3' align="center" gutterBottom color="textSecondary"> Page Not Found </Typography>
              <SentimentVeryDissatisfiedIcon color="action" className={classes.icon} />
              <Typography variant='h3' align="center" gutterBottom color="textSecondary"> 404 </Typography>
              <Typography variant='h4' align="center" gutterBottom color="textSecondary"> 요청하신 페이지를 찾을 수 없습니다. </Typography>
              <Button variant="contained" onClick={goBack} className={classes.button} color='primary'>이전 페이지</Button>
          </Box>
		</div>
	)
}

export default NotFound;
