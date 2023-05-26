import React, { useState } from "react"
export const Login = (props) =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(email);
        let result = await fetch(""),
        method: "POST"
    }
     /*const handlelogin = async (){
        
        
        body: JSON.stringify({email,password}),
        header:{
            'Content Type ':application/json'
        }*/

    return(
        <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Inventory System</h1>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label htmlFor="password">Password</label>
            <input  value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
            <button className="" type="submit">Login</button>
        </form>
            <button className="btn" onClick={() => props.onFormSwitch ('register')}>Don't have an account? Register</button>
        </div>
    )
} 