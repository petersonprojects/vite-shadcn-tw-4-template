import React from 'react';
import { Paper, TextField, Grid } from '@mui/material';

interface MarkerFormProps {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ name, address, city, state, zip }) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            value={name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            value={address}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="City"
            fullWidth
            value={city}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="State"
            fullWidth
            value={state}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Zip"
            fullWidth
            value={zip}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MarkerForm;