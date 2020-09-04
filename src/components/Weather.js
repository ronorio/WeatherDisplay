import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

const Weather = (props) => {
    const classes = useStyles();
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div>
            { props.cidade && props.pais &&
                <Paper className={classes.paper}>
                    <Grid container item justify='center'>
                        <LocationOnIcon fontSize='large'/>
                        <Typography gutterBottom variant="subtitle1">
                            <p> {props.cidade}, {props.pais}</p>  
                            <p> {date.toString().split(' ')[0] + ', ' + date.getDay() + ' of ' + monthNames[date.getMonth()] + ' ' + date.getHours() + ':' + date.getMinutes()}</p>
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={4}>
                            <Grid item xs>
                                <img className={classes.img} alt="complex" src={"http://openweathermap.org/img/wn/"+props.icon+"@2x.png"} />
                                <Typography variant="body1" gutterBottom>
                                    {parseInt(props.max)}° / {parseInt(props.min)}°
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h2" gutterBottom>
                                {parseInt(props.temperatura)}°
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Feels Like {parseInt(props.sensacao)}°
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container item justify='center'>
                        <Typography gutterBottom variant="h5">
                            <p> {props.descricao}</p>  
                        </Typography>
                    </Grid>
                </Paper>
            }
        </div>
    );
};

export default Weather;