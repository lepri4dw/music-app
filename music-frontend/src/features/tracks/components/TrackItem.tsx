import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';

interface Props {
  name: string;
  trackNumber: number;
  length: string;
}

const TrackItem: React.FC<Props> = ({name, trackNumber, length}) => {
  return (
    <Grid item xs={12} sm={6} lg={4} >
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={1}>{trackNumber}</Grid>
            <Grid item xs={9}>{name}</Grid>
            <Grid item xs={2}>{length}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackItem;