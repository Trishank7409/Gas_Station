
import './App.css'
import Navbar from './components/Navbar';
import { Route, Routes } from "react-router-dom";
import Signup from './pages/Signup';
import  LogIn  from './pages/Login';
import AdminDashboard from './pages/dashboard';
function App() {

  return(
<div>
      <div className='bg-blue-900'>

      <Navbar/>
      </div>
  <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path="/admin/dashboard" element={<AdminDashboard/>} /> 
 
    
    {/* <Route path='/' element={<Home/>}/> */}
    {/* <Route path="/admin/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><AdminDashboard/></PrivateRoute>} />
    <Route path="/employee/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><EmployeeDashboad/></PrivateRoute>} />
    <Route path="/user/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><UserDashboard/></PrivateRoute>} /> */}

    <Route path="/login" element={<LogIn  />} />

    {/* <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} /> */}

  </Routes>

</div>
  ) 


}

export default App
