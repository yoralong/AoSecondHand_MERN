import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


function Register (){
    const [user,setUser] = useState({
       name:'', email:'',password:''
    })

    const onChangeInput = e =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    }

    const registerSubmit = async e=>{
        e.preventDefault()
        try {
            await axios.post('/user/register',{...user})

            localStorage.setItem('firstLogin',true)

            window.location.href="/";

        } catch (err) {
            
            alert(err.response.data.msg)
        }
    }

    return (

        <div class="login-box">
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
            <div class="user-box">
            <input type="text" name="name" required placeholder="" value={user.name} onChange={onChangeInput}/>
                <label>Name</label>
            </div>
            <div class="user-box">
                <input type="email" name="email" required placeholder="" value={user.email} onChange={onChangeInput}/>
                <label>Email</label>
            </div>
            <div class="user-box">
                <input type="password" name="password" required autoComplete="on" placeholder="" value={user.password} onChange={onChangeInput}/>
                <label>Password</label>
            </div>
            <div className="row">
                <button typeof="submit" class="animated-button1"><span></span>
                    <span></span>
                    <span></span>
                    <span></span>Register</button>
                <Link to="/login" class="login">Login</Link>
            </div>
        </form>
    </div>


        // {/* <div className="login-page"> */}
            // {/* <form onSubmit={registerSubmit}> */}
            // {/* <h2>Register</h2> */}
            // {/* <input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput}/> */}
                // {/* <input type="email" name="email" required placeholder="email" value={user.email} onChange={onChangeInput}/> */}
                // {/* <input type="password" name="password" required autoComplete="on" placeholder="Password" value={user.password} onChange={onChangeInput}/> */}

                // {/* <div className="row"> */}
                    // {/* <button typeof="submit">Register</button> */}
                    // {/* <Link to="/login">Login</Link> */}
                // {/* </div> */}
            // {/* </form> */}
        // {/* </div> */}



    )
}

export default Register
