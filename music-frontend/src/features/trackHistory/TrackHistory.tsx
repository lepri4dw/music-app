import React, { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTrackHistory, selectTrackHistoryFetching } from './trackHistorySlice';
import { fetchTrackHistory } from './trackHistoryThunks';
import TrackHistoryItem from './components/TrackHistoryItem';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);
  const loading = useAppSelector(selectTrackHistoryFetching);

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);


  return (
    <>
      <Typography variant="h6">Track History</Typography>
      {loading ? <CircularProgress/> : <Grid item container spacing={2}>
        {trackHistory.map(note => (
          <TrackHistoryItem artist={note.artist.name} track={note.track.name} datetime={note.datetime}/>
        ))}
      </Grid>}
    </>
  );
};

export default TrackHistory;