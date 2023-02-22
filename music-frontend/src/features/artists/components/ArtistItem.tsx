import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import { apiURL } from '../../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  name: string;
  _id: string;
  photo: string | null;
}

const ArtistItem: React.FC<Props> = ({name, photo, _id}) => {
  let cardImage = noImageAvailable;

  if (photo) {
    cardImage = apiURL + '/' + photo;
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea>
          <ImageCardMedia image={cardImage} title={name}/>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ArtistItem;