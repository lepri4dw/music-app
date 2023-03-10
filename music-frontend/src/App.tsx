import React from 'react';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import Register from './features/users/Register';
import Login from './features/users/Login';
import TrackHistory from './features/trackHistory/TrackHistory';
import ArtistForm from './features/artists/components/ArtistForm';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AlbumForm from './features/albums/components/AlbumForm';
import TrackForm from './features/tracks/components/TrackForm';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Artists/>}/>
            <Route path="/new-artist" element={<ProtectedRoute isAllowed={Boolean(user)}><ArtistForm/></ProtectedRoute>}/>
            <Route path="/albums/:id" element={<Albums/>}/>
            <Route path="/new-album" element={<ProtectedRoute isAllowed={Boolean(user)}><AlbumForm/></ProtectedRoute>}/>
            <Route path="/tracks/:id" element={<Tracks/>}/>
            <Route path="/new-track" element={<ProtectedRoute isAllowed={Boolean(user)}><TrackForm/></ProtectedRoute>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/track_history" element={<TrackHistory/>}/>
            <Route path="/*" element={<h1>Not Found! This page does not exist!</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
