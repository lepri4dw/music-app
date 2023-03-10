import React from 'react';

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid, IconButton,
  styled,
  Typography
} from '@mui/material';
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import { apiURL } from '../../../constants';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  name: string;
  _id: string;
  image: string | null;
  yearOfIssue: number;
  numberOfTracks: number;
  isPublished: boolean;
}

const AlbumItem: React.FC<Props> = ({name, _id, image, yearOfIssue, numberOfTracks, isPublished}) => {
  let cardImage = noImageAvailable;
  const user = useAppSelector(selectUser);

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card component={Link} to={'/tracks/' + _id} style={{textDecoration: "none"}}>
        <CardActionArea>
          <CardHeader title={name}/>
          <ImageCardMedia image={cardImage} title={name}/>
          <CardContent>
            <Typography variant="subtitle1">Year: <strong>{yearOfIssue}</strong></Typography>
            <Typography variant="subtitle1">Number of tracks:  <strong>{numberOfTracks}</strong></Typography>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {!isPublished && user && user.role === 'admin' && (
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant="h6" sx={{pr: '5px'}}>Not publish</Typography>
                  <Button variant="contained" color="primary">Publish</Button>
                </div>
              )}
              {user && user.role === 'admin' && (
                <IconButton style={{marginLeft: 'auto'}} onClick={(e) => {e.stopPropagation();}}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AlbumItem;