import React, {Suspense} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../src/layouts/header/Header';
import Footer from './layouts/footer/Footer';
import Sidebar from './layouts/sidebar/Sidebar';
import Home from './pages/home/Home';


//import List from './pages/list/List';
const List = React.lazy(() => import('./pages/list/List'));
//import Stats from './pages/stats/Stats';
const Stats = React.lazy(() => import('./pages/stats/Stats'));
//import Leaderboard from "./pages/leaderboard/Leaderboard"
const Leaderboard = React.lazy(() => import('./pages/leaderboard/Leaderboard'));
//import Edit from './pages/edit/Edit';
const Edit = React.lazy(() => import('./pages/edit/Edit'));

//import ScrollToTop from './components/scrolltotop/ScrollToTop';
const ScrollToTop = React.lazy(() => import('./components/scrolltotop/ScrollToTop'));

function App() {

  return (
    <Suspense>
    <ScrollToTop> 
      <Header />
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:rollNumber" element={<Edit/>} />
        <Route path="/list" element={<List />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>

      <Footer /> 
    </ScrollToTop>
    </Suspense>
  )
}

export default App