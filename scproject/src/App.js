
import './App.css';
import Login from './LoginRegisterComponent/Login';
import { Route, Routes } from "react-router-dom"
import HomePage from './Component/HomePage';
import Register from './LoginRegisterComponent/Register';
import Index from './Component/Index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Routes path='/home' element={<HomePage />}>
        </Routes>
      </Routes>

    </div>
  );
}

export default App;
