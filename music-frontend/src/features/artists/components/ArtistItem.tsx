import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, styled, Typography } from '@mui/material';
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import { apiURL } from '../../../constants';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteArtist, fetchArtists, publishedArtist } from '../artistsThunks';
import { selectArtistDeleting, selectArtistPublishing } from '../artistsSlice';
import { LoadingButton } from '@mui/lab';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  name: string;
  _id: string;
  photo: string | null;
  isPublished: boolean
}

const ArtistItem: React.FC<Props> = ({name, photo, _id, isPublished}) => {
  const dispatch = useAppDispatch();
  let cardImage = noImageAvailable;
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectArtistDeleting);
  const publishLoading = useAppSelector(selectArtistPublishing);
  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  const togglePublished = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    await dispatch(publishedArtist(_id));
    dispatch(fetchArtists());
  }


  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (window.confirm('Deleting an artist will also delete all their albums and tracks. ' +
      'Do you really want to delete this artist?')) {
      await dispatch(deleteArtist(_id));
      dispatch(fetchArtists());
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card component={Link} to={'/albums/' + _id} style={{textDecoration: "none"}}>
        <CardActionArea>
          <ImageCardMedia image={cardImage} title={name}/>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {!isPublished && user && user.role === 'admin' && (
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant="h6" sx={{pr: '5px'}}>Not publish</Typography>
                  <LoadingButton loading={publishLoading ? publishLoading === _id : false} loadingIndicator="Loading…"  variant="contained" color="primary" onClick={togglePublished}>Publish</LoadingButton>
                </div>
              )}
              {user && user.role === 'admin' && (
                <IconButton disabled={deleteLoading ? deleteLoading === _id : false} style={{marginLeft: 'auto'}} onClick={handleDelete}>
                  <DeleteIcon/>
                </IconButton>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ArtistItem;