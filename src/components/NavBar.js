import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '70%',
      maxHeight: '70%',
    },
  }));

const NavBar = () => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <ToolBar>
                    <Typography variant="body1" color="inherit" align='center'>
                        <img className={classes.img} alt="complex" src={"http://openweathermap.org/img/wn/02d@2x.png"} />
                    </Typography>
                </ToolBar>
            </AppBar>
        </div>
    )
}
export default NavBar;