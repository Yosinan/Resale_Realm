import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./authprovider";
import "./index.css"
import loginRequest from './request';



const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {email: user, password: pwd}
        console.log(loginData);
        loginRequest(loginData)
        .then(data => {
            // if (error) {
            //     return setErrMsg(data.message);
            // }
            console.log(data)
            // storage({accessToken, refreshToken});
        })
        .catch(err => console.log(err))
    };

    return (
        <>
        
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                
                <section className='inputs_container b'>
                    <div className='c'>
                    
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" >{errMsg}</p>
                    <h1 className='title'>Sign In</h1>
                   <p className="subtitle">please log by using email and password </p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username"></label>
                        <input
                            type="text"
                            id="username"
                            placeholder='Email'
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='login_button'>Sign In</button>
                    </form>
                    
                    <p className='small'>
                        Need an Account?<br />
                        <span >
                            {/*put router link here*/}
                            <a href="Signup">Sign Up</a>
                        </span>
                    </p>
                    </div>
                </section>
            )}
        </>
    )
}

export default Login
