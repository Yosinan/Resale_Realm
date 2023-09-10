import React from 'react'
import { getFullYear } from '../../utils/utils'
import './Footer.css'

function Footer() {
    return (
        <>
            <div className="foot">
                <p><i>&copy; ELY {getFullYear()}</i></p>
            </div>
        </>
    )
}

export default Footer