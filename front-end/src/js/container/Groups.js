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
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import '../css/custom.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    height: 250,
  },
  submit_left: {
	margin: theme.spacing(3, 0, 2),
	marginLeft: '25%',
	marginRight: '2.5%'
  },
  submit_right: {
	margin: theme.spacing(3, 0, 2),
	marginLeft: '2.5%',
	marginRight: '5%'
  },
  submit_mleft: {
	margin: theme.spacing(3, 0, 2),
	marginLeft: '10%',
	marginRight: '2.5%'
  },
  submit_mright: {
	margin: theme.spacing(3, 0, 2),
	marginLeft: '2.5%',
	marginRight: '5%'
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
  button: {
	minWidth: 100,
	marginTop: '3%',
	marginBottom: '3%',
	marginLeft: '45%',
	align: 'right',
  },
}));

export default function Groups() {
	const classes = useStyles();
	const [groups, setGroups] = useState([]);
	const [name, setName] = useState('');
	const [open, setOpen] = useState(false);
	const [del, setDel] = useState(false);
	
	const handleClose = () => {
		setOpen(false);
		setName('');
	}
	
	const handleOpen = () => {
		setOpen(true);
	}
	
	const handleDelOpen = (name) => {
		setDel(true);
		setName(name);
	}
	
	const handleDelClose = () => {
		setDel(false);
		setName('');
	}
	
	const handleChange = (e) => {
		setName(e.target.value)
	}
	
	const handleCreate = () => {
		axios.post('http://localhost:8090/groups', {
		  name: name,
		  num_people: 0
		})
		setOpen(false);
	}
	
	const handleDelete = () => {
		axios.delete("http://localhost:8090/groups/" + name);
		setDel(false);
	}
	
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
	  <div>
	  <div className="component">
	    <Helmet>
          <title>VM Web Admin - Groups</title>
        </Helmet>
        <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         className={classes.modal}
         open={open}
         onClose={handleClose}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{
           timeout: 500,
         }}
        >
           <Fade in={open}>
             <div className={classes.modal_paper}>
               이름: <TextField
           	         onChange={handleChange}
                 	 className="validate"
                 	 name="name"
                 	 variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="name"
            	     label="Name"
                    />
              
               <Button
                onClick={handleCreate}
                variant="contained"
                color="secondary"
                className={classes.submit_left}
          	    disabled={name === ''}
               >
                 그룹 생성
               </Button>
               <Button
                onClick={handleClose}
                variant="contained"
                color="primary"
                className={classes.submit_right}
               >
                 취소
               </Button>
             </div>
           </Fade>
         </Modal>
         <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         className={classes.modal}
         open={del}
         onClose={handleClose}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{
           timeout: 500,
         }}
        >
           <Fade in={del}>
             <div className={classes.modal_paper}>
               <br/><br/><Typography variant="body2">그룹을 삭제하시겠습니까?</Typography> <br/>
               <Button
                onClick={handleDelete}
                variant="contained"
                color="secondary"
                className={classes.submit_mleft}
               >
                 확인
               </Button>
               <Button
                onClick={handleDelClose}
                variant="contained"
                color="primary"
                className={classes.submit_mright}
               >
                 취소
               </Button>
             </div>
           </Fade>
         </Modal>
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
      				{ group.num_people === 0 ? 
      					 <Button size="small" color="secondary" onClick={() => handleDelOpen(group.name)}>
      						그룹 삭제
      					  </Button>  : <></> }
      			</CardActions>
      		</Card>
      		<Grid item xs={12} sm={12} >
              <Box bgcolor="text.disabled" color="background.paper" p={2}>
              </Box>
            </Grid>
      		</div>
	  ))}
    </div>
    <Button variant="contained" color="primary" className={classes.button} onClick={handleOpen}> 
      새로운 그룹 생성
    </Button>
    </div>
  );
}