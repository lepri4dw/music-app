import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtistCreating, selectCreateArtistError } from '../artistsSlice';
import { ArtistMutation } from '../../../types';
import { createArtist } from '../artistsThunks';
import { Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';

const ArtistForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateArtistError);
  const creating = useAppSelector(selectArtistCreating);
  const [state, setState] = useState<ArtistMutation>({
    name: '',
    photo: null,
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  }

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createArtist(state)).unwrap();
      navigate('/');
    } catch (e) {

    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };
  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">New artist</Typography>
        </Grid>

        <Grid item xs>
          <TextField
            id="name" label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name" required
            error={Boolean(getFieldError('name'))}
            helperText={getFieldError('name')}
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Photo" onChange={fileInputChangeHandler}
            name="photo"
          />
        </Grid>

        <Grid item xs>
          <LoadingButton loadingIndicator="Loading…" loading={creating} type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ArtistForm;