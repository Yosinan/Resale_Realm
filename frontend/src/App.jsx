import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import SideLogin from './components/SideLogin/SideLogin'
import PageNotFound from './components/404/PageNotFound';
// import Landing from './components/Landing/Landing';
import Landing from './pages/landing/landing';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectdRoutes';
import ProductList from './components/Products/ProductList';
import PostItems from './components/Dashboard/PostItems';

const App = () => {


  const appStyles = {

  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function toggleLoginPage() {
    setIsLoginPage(!isLoginPage);
  }

  return (
    <>
      <div className='page-container'>
        <div className='content-wrapper'></div>
        <div className="App" style={appStyles}>
          <Router>
            <Routes>
              <Route path='/' exact element={<Landing />} />
              <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
              <Route path='/login' element={<Login onLogin={handleLogin} togglePage={toggleLoginPage} showLogin={true} />} />
              <Route path='/home' element={<Home />} />
              <Route path='/add' element={<PostItems />} />
              <Route path='*' element={<PageNotFound />} />
              <Route path='/list' element={<ProductList />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  )
}

export default App;