import './App.css';
import { HashRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Home from './Home';
import Register from './components/Register';
import Profile from './components/Profile';
import Nav from './components/nav/Nav';

function App() {
  return (
   <HashRouter>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
   </HashRouter>
  );
}

export default App;
