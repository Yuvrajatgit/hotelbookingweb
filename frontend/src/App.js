import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Website from './pages/Website';
import Layout from './components/layout/Layout';
import Properties from './pages/properties/Properties';
import './App.css';
import { Suspense } from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Property from './pages/property/Property';
import UserDetailContext from './context/UserDetailContext';
import Bookings from './pages/bookings/Bookings';
import Favourites from './pages/favourites/Favourites';

function App() {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null
  })
  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
    <Route element={<Layout/>}> 
    <Route path="/" element={<Website/>}/>
    <Route path="/properties">
      <Route index element={<Properties/>}/>
      <Route path=':id' element={<Property/>}/>
    </Route>
    <Route path='/bookings' element={<Bookings/>}/>
    <Route path='/favourites' element={<Favourites/>}/>
    </Route> 
    </Routes>
    </Suspense>
    </BrowserRouter>
    <ToastContainer/>
    </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
