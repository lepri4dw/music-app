import React from 'react';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';

function App() {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Artists/>}/>
            <Route path="/albums/:id" element={<Albums/>}/>
            <Route path="/tracks/:artistId/:id" element={<Tracks/>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
