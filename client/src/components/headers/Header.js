import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'

import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">
                <div class="btn-login">
                        <a id="btn-outline" href="#" target="_blank">
                            <svg height="40" width="100" xmlns="#">
                                <rect class="shape" height="40" width="100"></rect>
                            </svg>
                            <div class="text">Create</div>
                        </a>
                    </div></Link></li>
                <li><Link to="/category"><div class="btn-login">
                        <a id="btn-outline" href="#" target="_blank">
                            <svg height="40" width="110" xmlns="#">
                                <rect class="shape" height="40" width="110"></rect>
                            </svg>
                            <div class="text">Categories</div>
                        </a>
                    </div></Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">
                <div class="btn-login">
                        <a id="btn-outline" href="#" target="_blank">
                            <svg height="40" width="100" xmlns="#">
                                <rect class="shape" height="40" width="100"></rect>
                            </svg>
                            <div class="text">History</div>
                        </a>
                    </div>
                </Link></li>
                <li><Link to="/" onClick={logoutUser}>
                <div class="btn-login">
                        <a id="btn-outline" href="#" target="_blank">
                            <svg height="40" width="110" xmlns="#">
                                <rect class="shape" height="40" width="110"></rect>
                            </svg>
                            <div class="text">Logout</div>
                        </a>
                    </div>
                </Link></li>
            </>
        )
    }


    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
               
            </div>
            
            
            <div className="logo">
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'CALA SHOP'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/">
                    <div class="btn-login">
                        <a id="btn-outline" href="#" target="_blank">
                            <svg height="40" width="110" xmlns="#">
                                <rect class="shape" height="40" width="110"></rect>
                            </svg>
                            <div class="text">{isAdmin ? 'Products' : 'Shop'}</div>
                        </a>
                    </div>
                </Link></li>
                <li><Link to="/about">
                <div class="btn-login">
                        <a id="btn-outline" href="#" target="_blank">
                            <svg height="40" width="110" xmlns="#">
                                <rect class="shape" height="40" width="110"></rect>
                            </svg>
                            <div class="text">About</div>
                        </a>
                    </div>
                </Link></li>                                    

                {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <li><Link to="/login">
                    <div class="btn-login">
                        <a id="btn-outline" href="#" target="_blank">
                            <svg height="40" width="210" xmlns="#">
                                <rect class="shape" height="40" width="210"></rect>
                            </svg>
                            <div class="text">Login ✥ Register</div>
                        </a>
                    </div>
                    </Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>

            {
                isAdmin ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }
            
        </header>
    )
}

export default Header