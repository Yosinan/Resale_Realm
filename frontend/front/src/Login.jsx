import React, { useState } from "react"
export const Login = (props) =>{
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/users/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                props.onLogin(data);
            }else{
                const error = await response.json();
                console.log(error);
            }
        }catch(error){
            console.log(error);
        }
        
    }
    
    return(
        <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Inventory System</h1>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
            <label htmlFor="password">Password</label>
            <input  value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password"/>
            <button className="" type="submit">Login</button>
        </form>
            <button className="btn" onClick={() => props.onFormSwitch ('register')}>Don't have an account? Register</button>
        </div>
    )
} 