import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Container from './components/Container';
import { DarkModeProvider } from './context/DarkModeContext';
import { Routes, BrowserRouter, Route, createRoutesFromElements, createBrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BaseLayout from './layout/BaseLayout';
import { RouterProvider } from 'react-router-dom';
import Content from './components/Content';
import CreateProjectModal from './components/CreateProjectModal';
import CreateTaskModal from './components/CreateTaskModal';

// Create a client
const queryClient = new QueryClient();

function App() {

  const routes = createRoutesFromElements(

      <Route element={<BaseLayout />}>
        {/* <Route path='/projects' element={<Content />} /> */}
        { <Route path='/dev' element={<CreateTaskModal />} /> }
        <Route path='/projects/:id' element={<Content />} />
      </Route>

  );

const router = createBrowserRouter(routes)
  const Root = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
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
