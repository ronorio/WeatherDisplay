import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import OpacityIcon from '@material-ui/icons/Opacity';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '50%',
        maxHeight: '50%',
    },
  }));

const WeatherHour = (props) => {
    const classes = useStyles();
    
    return (
        <div>
        { props.cidade && props.pais &&
            <Box mt={4} m={2}>
                <Grid container item justify='center'>
                    <Typography gutterBottom variant="h5">
                        <p> By Hour</p>  
                    </Typography>
                </Grid>

                <Grid container spacing={2} justify='center' >
                    {/*Here I take the first six weather reports and assemble the components*/}
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <Grid key={value} item xs={12} sm={2}>
                            <Paper className={classes.paper}>
                                <Typography gutterBottom variant="subtitle1">
                                    <p>{new Date(props.weatherByHour.list[value].dt * 1000).getHours() + ':' + new Date(props.weatherByHour.list[value].dt * 1000).getMinutes()}</p>
                                </Typography>
                                <Typography variant="body1" color="inherit" align='center'>
                                    <img className={classes.img} alt="complex" src={"http://openweathermap.org/img/wn/"+props.weatherByHour.list[value].weather[0].icon+"@2x.png"} />
                                </Typography>
                                <Typography variant="body1" color="inherit" align='center'>
                                    <OpacityIcon fontSize='small'/> {props.weatherByHour.list[value].main.humidity}%
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    {parseInt(props.weatherByHour.list[value].main.temp)}°
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        }
        </div>
    );
};

export default WeatherHour;