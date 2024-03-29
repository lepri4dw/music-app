import React, { useState } from 'react';
import { Box, Card, Grid, IconButton, Modal, Toolbar, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { createTrackHistory } from '../../trackHistory/trackHistoryThunks';
import { selectTrackHistoryCreating } from '../../trackHistory/trackHistorySlice';
import { Close } from '@mui/icons-material';
import YouTube, { YouTubeProps } from 'react-youtube';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTrack, fetchTracks, publishedTrack } from '../tracksThunks';
import { selectTrackDeleting, selectTrackPublishing } from '../tracksSlice';
import { LoadingButton } from '@mui/lab';

interface Props {
  _id: string;
  name: string;
  trackNumber: number;
  length: string;
  youtubeId: string;
  isPublished: boolean;
  albumId: string;
}

const TrackItem: React.FC<Props> = ({_id, name, trackNumber, length, youtubeId, isPublished, albumId}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(!open);
  const createLoading = useAppSelector(selectTrackHistoryCreating);
  const deleteLoading = useAppSelector(selectTrackDeleting);
  const publishLoading = useAppSelector(selectTrackPublishing);
  const playButtonHandler = async () => {
    await dispatch(createTrackHistory(_id));
    handleClose();
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    await dispatch(deleteTrack(_id));
    dispatch(fetchTracks(albumId));
  }

  const togglePublished = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    await dispatch(publishedTrack(_id));
    dispatch(fetchTracks(albumId));
  }


  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <Grid item xs={12} sm={6} lg={4} >
        <Card style={{fontSize: '23px', padding: '15px'}}>
          <Grid container >
            <Grid item xs={1}>{trackNumber}</Grid>
            <Grid item xs={8}>{name}</Grid>
            <Grid item xs={2}>{length}</Grid>
            {user && <Grid item xs={1}><IconButton sx={{p: 0}} onClick={() => playButtonHandler()} disabled={createLoading}><PlayArrowIcon fontSize="large" color="success"/></IconButton></Grid>}
          </Grid>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {!isPublished && user && user.role === 'admin' && (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="h6" sx={{pr: '5px'}}>Not publish</Typography>
                <LoadingButton loading={publishLoading ? publishLoading === _id : false} loadingIndicator="Loading..." variant="contained" color="primary" onClick={togglePublished}>Publish</LoadingButton>
              </div>
            )}
            {user && user.role === 'admin' && (
              <IconButton disabled={deleteLoading ? deleteLoading === _id : false} style={{marginLeft: 'auto'}} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </Card>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
          <Box bgcolor="white" p={2} maxWidth="80%" maxHeight="80%" overflow="auto">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Music Player
              </Typography>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Toolbar>
            <YouTube videoId={youtubeId} opts={opts}/>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TrackItem;