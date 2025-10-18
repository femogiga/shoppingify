import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Home from './pages/home/Home';
import Container from './components/Container';
import { DarkModeProvider } from './context/DarkModeContext';
import { Routes, BrowserRouter, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  const Root = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );
  };
  return (
    <Container>
      <DarkModeProvider>
        <Root />
      </DarkModeProvider>
    </Container>
  );
}

export default App;
