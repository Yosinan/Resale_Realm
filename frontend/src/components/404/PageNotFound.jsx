import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '90vh',
        flexDirection: 'column',
        fontSize: '2rem',
        backgroundColor: '#1a1a1a',
        color: '#000',
    },

    inner: {
        color: 'red',
        marginRight: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        
    },

    a: {
        color: '#2f2f',
        marginTop: '20px',
        marginRight: '10px',
       

    },

    p: {
        color: 'red',
        textAlign: 'center',
        
    }

}

function PageNotFound() {
    return (
        <>
            <div className="container" style={styles.container}>
                <div className="inner" style={styles.inner}>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
                    <p style={styles.p}>Page Not Found</p>
                </div>
                <a href="/home" style={styles.a}>Back to Home</a>
            </div>
        </>
    )
}

export default PageNotFound