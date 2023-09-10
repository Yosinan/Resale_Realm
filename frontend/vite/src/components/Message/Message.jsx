import React, { useEffect, useState } from 'react'
import './Message.css'

function Message({ text, type}) {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);
        return () => clearTimeout(timer);

    }, [])

    return visible ? (
        <>
            <div className={`message {$type}`}>
                {text}
            </div>
        </>
    ) : null

}

export default Message