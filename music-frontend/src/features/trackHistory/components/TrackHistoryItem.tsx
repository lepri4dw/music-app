import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  artist: string;
  track: string;
  datetime: string;
}

const TrackHistoryItem: React.FC<Props> = ({artist, track, datetime}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card style={{fontSize: '23px', padding: '15px'}}>
        <CardContent>
          <Grid container direction="column" spacing={1}>
            <Typography>Artist: <strong>{artist}</strong></Typography>
            <Typography>Track: <strong>{track}</strong></Typography>
            <Typography>Datetime: <strong>{dayjs(datetime).format('DD.MM.YYYY HH:mm:ss')}</strong></Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TrackHistoryItem;