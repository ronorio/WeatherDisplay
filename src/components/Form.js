import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Form = (props) => {

    return (
        <div>
            <form onSubmit={props.getWeather}>
                <Box mt={3} mb={2}>
                    <Grid container justify='center' >
                        <Grid item xs={12} sm={2}>
                            <TextField  name="cidade" placeholder="City..." /> 
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField name="pais" placeholder="Country..." />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button type="submit" variant="contained" color="primary">Upadate Location</Button >
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </div>
    );
};

export default Form;