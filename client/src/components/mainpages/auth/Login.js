import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


function Login (){
    const [user,setUser] = useState({
        email:'',password:''
    })

    const onChangeInput = e =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }

    const loginSubmit = async e=>{
        e.preventDefault()
        try {
            await axios.post('/user/login',{...user})

            localStorage.setItem('firstLogin',true)

            window.location.href="/";

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (

                <div class="login-box">
                    <h2>Login</h2>
                    <form onSubmit={loginSubmit}>
                        <div class="user-box">
                            <input type="email" name="email" required placeholder="" value={user.email} onChange={onChangeInput}/>
                            <label>Username</label>
                        </div>
                        <div class="user-box">
                            <input type="password" name="password" required autoComplete="on" placeholder="" value={user.password} onChange={onChangeInput}/>
                            <label>Password</label>
                        </div>
                        <div className="row">
                            <button typeof="submit" class="animated-button1"><span></span>
                                <span></span>
                                <span></span>
                                <span></span>Login</button>
                            <Link to="/register" class="signup">Register</Link>
                        </div>
                    </form>
                </div>



                    // <div class="login-page">
                    //     <h2>Login</h2>
                    //     <form onSubmit={loginSubmit}>
                    //         <input type="email" name="email" required placeholder="email" value={user.email} onChange={onChangeInput}/>
                    //         <input type="password" name="password" required autoComplete="on" placeholder="password" value={user.password} onChange={onChangeInput}/>
                    
                    //         <div className="row">
                    //             <button typeof="submit" class="animated-button1"><span></span>
                    //             <span></span>
                    //             <span></span>
                    //             <span></span>Login</button>
                    //             <Link to="/register">Register</Link>
                    //         </div>
                    //     </form>
                    // </div>

        
    )
}

export default Login
