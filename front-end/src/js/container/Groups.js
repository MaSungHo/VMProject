import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../css/custom.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 750,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    height: 200,
  },
});

export default function Groups() {
	const classes = useStyles();
	const [groups, setGroups] = useState([]);
	
	useEffect(() => {
		let unmounted = false;
	    let source = axios.CancelToken.source();
		axios.get('http://localhost:8090/groups')
		  .then(res => {
		          if (!unmounted) {
		            setGroups(res.data);
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
	return (
	  <div className="component">
	    <Helmet>
          <title>VM Web Admin - Groups</title>
        </Helmet>
	  	{groups.map((group) => (
	  		<div key={group.id}>
	  		<Card className={classes.root} variant="outlined">
	  			<CardActionArea>
      				<CardMedia
      				className={classes.media}
      				image="/Ajou-template.jpg"
      				title={group.name}
      			    />
      				<CardContent>
      					<Typography gutterBottom variant="h5" component="h2">
      						{group.name}
      					</Typography>
      					<Typography variant="body2" color="textSecondary" component="p">
      						그룹명: {group.name} <br/>
      						인원 수: {group.num_people}
      					</Typography>
      				</CardContent>
      			</CardActionArea>
      			<CardActions>
      				<Button size="small" color="primary">
      					수정
      				</Button>
      				<Link to={"/groups/" + group.name}>
      				  <Button size="small" color="primary">
      					자세히 보기
      				  </Button>
      				</Link>
      			</CardActions>
      		</Card>
      		<Grid item xs={12} sm={12} >
              <Box bgcolor="text.disabled" color="background.paper" p={2}>
              </Box>
            </Grid>
      		</div>
	  ))}
    </div>
  );
}