
import './css/App.css';
import './css/homepage.css';
import './css/detailPanel.css'
import Login from './LoginRegisterComponent/Login';
import { Route, Routes } from "react-router-dom"
import Register from './LoginRegisterComponent/Register';
import HomePageChat from './Component/HomePageChat';
import HomePageAddFriends from './Component/HomePageAddFriend';
import HomePageForVolunteer from './Component/HomePageForVolunteer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<HomePageChat />}/>
        <Route path='/friends' element={<HomePageAddFriends />}/>
        <Route path='/volunteers' element={<HomePageForVolunteer />}/>
      </Routes>
    </div>
  );
}

export default App;
