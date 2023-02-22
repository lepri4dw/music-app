import React from 'react';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';

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
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
