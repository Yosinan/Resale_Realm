import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Coustomer from './components/pages/coustomer';
import TextMobileStepper from './components/pages/coustomer';
import InputForm from './components/pages/coustomer/c';
import UpdateProduct from './components/pages/coustomer';
import UpdateProductForm from './components/pages/coustomer';

import Login from './components/pages/login';
import Signup from './components/pages/signup';
const handleRoutes = () => {
  return (
    <div className='page-container'>
      <div className='content-wrapper'>
        <Router>
        
        
         
          <Routes>

            {/* <Route path='/' exact element={<TextMobileStepper/>} /> */}
            <Route path='/' exact element={<UpdateProductForm />} />
            <Route path='/Login' exact element={<Login />} />
            <Route path='/signup' exact element={<Signup />} />
            </Routes>
        </Router>
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default handleRoutes;