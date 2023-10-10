
import './App.css';
import Login from './LoginRegisterComponent/Login';
import {Route,Routes} from "react-router-dom"
import HomePage from './Component/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='home' element={<HomePage/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
