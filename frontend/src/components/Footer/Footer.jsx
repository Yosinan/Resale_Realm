import React from 'react'
import { getFullYear } from '../../utils/utils'
// import './Footer.css'

const footerStyles = {
    backgroundColor: 'blue',
    color: 'black',
    textAlign: 'center',
    // position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    zIndex: '1',
    marginTop: 'auto',
    marginBottom: '-100px',
}

function Footer() {
    return (
        <>
            <div className="foot" style={footerStyles}>
                <p><i>&copy; ELY {getFullYear()}</i></p>
            </div>
        </>
    )
}

export default Footer