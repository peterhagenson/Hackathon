import logo from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login.js'
import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
  </Routes>
  </BrowserRouter>
  </div>
    
       
  );
}

export default App;
