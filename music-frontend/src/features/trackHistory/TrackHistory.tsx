import React, { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTrackHistory, selectTrackHistoryFetching } from './trackHistorySlice';
import { fetchTrackHistory } from './trackHistoryThunks';
import TrackHistoryItem from './components/TrackHistoryItem';
import { selectUser } from '../users/usersSlice';
import { Navigate } from 'react-router-dom';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const trackHistory = useAppSelector(selectTrackHistory);
  const loading = useAppSelector(selectTrackHistoryFetching);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchTrackHistory());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/login"/>
  }

  return (
    <>
      <Typography variant="h6">Track History</Typography>
      {loading ? <CircularProgress/> : <Grid item container spacing={2}>
        {trackHistory.map(note => (
          <TrackHistoryItem key={note._id} artist={note.artist.name} track={note.track.name} datetime={note.datetime}/>
        ))}
      </Grid>}
    </>
  );
};

export default TrackHistory;