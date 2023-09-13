import React from 'react'
import SideLogin from '../SideLogin/SideLogin'
import Footer from '../Footer/Footer'


const homeStyles = {
      p: {
        color: 'black',
        fontSize: '36px',
        fontWeight: 'bold',
        
      },
      h1: {
        color: 'blue',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    }

function Home() {

  return (
    <>
    
    <p style={homeStyles.p}>Home Page </p><br />
    {<SideLogin />}
    <Footer />
    </>
  )
}

export default Home