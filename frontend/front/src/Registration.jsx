import React, { useState } from "react"

export const Registration = (props) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className="form-container">
        <form action="index.php" className="reg-form" conSubmit={handleSubmit}>
        <h1>Inventory System</h1>
            <h2>Register</h2>
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}name="name" id="name" placeholder="yourName" type="text" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label htmlFor="password">Password</label>
            <input  value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
            <button className="" type="submit">Register</button>
        </form>
            <button className="btn" onClick={() => props.onFormSwitch ('login')} >Already have an account.Login</button>
        
        </div>
    )
}