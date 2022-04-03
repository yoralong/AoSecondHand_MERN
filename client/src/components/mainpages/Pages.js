import React, {useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import Products from './products/Products'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetail from './history/OrderDetail'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import About from './about/About'


import Cart from './cart/Cart'
import Notfound from './utils/not_found/NotFound';
import {GlobalState} from '../../GlobalState'

function Pages() {
    const state= useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />


            <Route path="/login" exact component={ isLogged ? Notfound : Login} />
            <Route path="/register" exact component={isLogged ? Notfound :Register} />

            <Route path="/category" exact component={isAdmin ? Categories :Notfound} />

            <Route path="/create_product" exact component={isAdmin ? CreateProduct :Notfound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct :Notfound} />
            
            <Route path="/about" exact component={isAdmin ? About:About} />



            
            <Route path="/history" exact component={isLogged ?  OrderHistory : Notfound} />
            <Route path="/history/:id" exact component={isLogged ?  OrderDetail : Notfound} />



            <Route path="/cart" exact component={Cart} />

            <Route path="*" exact component={Notfound} />

        </Switch>      
    )
}

export default Pages;

