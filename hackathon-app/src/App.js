
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login.js'
import EmployeeDetail from './components/EmployeeDetail.js'
import Profile from './components/Profile.js'
import Header from './components/Header.js'


function App() {
  return (
    <div className="App">
      <Header />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/employee/:id" element={<EmployeeDetail/>}/>
  </Routes>
  </BrowserRouter>
  </div>
    
       
  );
}

export default App;
