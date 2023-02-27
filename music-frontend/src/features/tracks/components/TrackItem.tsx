import React from 'react';
import { Card, Grid, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  name: string;
  trackNumber: number;
  length: string;
}

const TrackItem: React.FC<Props> = ({name, trackNumber, length}) => {
  const user = useAppSelector(selectUser);

  return (
    <Grid item xs={12} sm={6} lg={4} >
      <Card style={{fontSize: '23px', padding: '15px'}}>
        <Grid container >
          <Grid item xs={1}>{trackNumber}</Grid>
          <Grid item xs={8}>{name}</Grid>
          <Grid item xs={2}>{length}</Grid>
          {user && <Grid item xs={1}><IconButton sx={{p: 0}}><PlayArrowIcon fontSize="large" color="success"/></IconButton></Grid>}
        </Grid>
      </Card>
    </Grid>
  );
};

export default TrackItem;