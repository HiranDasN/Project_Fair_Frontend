import './App.css';
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Project from './pages/Project';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { isAuthTokenContext } from './context/ContextShare';

function App() {
  const {isAuthToken , setIsAuthToken} = useContext(isAuthTokenContext)
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register />}/>
        <Route path='/dashboard' element={isAuthToken? <Dashboard dashboard />:<Home/>}/>
        <Route path='/project' element={<Project/>}/>
      </Routes>
      <hr/>
      <Footer/>
    </div>
  );
}

export default App;
