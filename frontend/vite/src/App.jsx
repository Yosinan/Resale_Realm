// import { useState } from 'react'
// import './App.css'
// import Login from './Login/Login'
// import Register from './Register/Register'
// import Dashboard from './Dashboard/Dashboard'
// import SideLogin from './SideLogin/SideLogin'
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoginPage, setIsLoginPage] = useState(true);

//   function handleLogin() {
//     setIsLoggedIn(true);
//   }

//   function toggleLoginPage() {
//     setIsLoginPage(!isLoginPage);
//   }

//   return (
//     <>
//       <div className="App">
//         <SideLogin />
//         {/* {isLoggedIn ? (
//           <Dashboard />
//         ) : isLoginPage ? (
//           <Login onLogin={handleLogin} togglePage={toggleLoginPage} />
//         ) : (
//           <Register togglePage={toggleLoginPage} />
//         )} */}
//       </div>
//     </>
//   )
// }

// export default App;

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import SideLogin from './components/SideLogin/SideLogin'
import PageNotFound from './components/404/PageNotFound';
import Landing from './components/Landing/Landing';
// import ProtectedRoutes from './components/ProtectedRoutes/ProtectdRoutes';

const App = () => {


  const appStyles = {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // backgroundColor: 'red',
  }



  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function toggleLoginPage() {
    setIsLoginPage(!isLoginPage);
  }
  // const handlRoutes=()=>{
  return (
    <>
      <div className='page-container'>
        <div className='content-wrapper'></div>
        <div className="App" style={appStyles}>
          <Router>
            <Routes>
              <Route path='/' exact element={<Landing/>} />
              <Route path='/dashboard' element={<Dashboard />} />
              {/* <ProtectedRoutes path='/dashboard' element={<Dashboard />} /> */}
              {/* <Redirect to='/'> */}
              <Route path='/home' element={<Home />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  )
}

export default App;