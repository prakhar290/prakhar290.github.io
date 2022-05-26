import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router, Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";



function App() {

  const {isAuthenticated, user} = useSelector(state => state.user);

  React.useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto","Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
  }, [])
  return (
    <div>
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user = {user} />}
      <Route exact path = "/" component = {Home}></Route>
    <Route exact path = "/product/:id" component = {ProductDetails}></Route>
    <Route exact path = "/products" component = {Products}></Route>
    <Route path = "/products/:keyword" component = {Products}></Route>
    <Route exact path = "/search" component = {Search}></Route>
    <ProtectedRoute exact path = "/account" component = {Profile} /> 
    <ProtectedRoute exact path = "/me/update" component = {UpdateProfile} /> 
    <ProtectedRoute exact path = "/password/update" component = {UpdatePassword} /> 
    <Route exact path = "/password/forgot" component = {ForgotPassword} ></Route> 
    <Route exact path = "/password/reset/:token" component = {ResetPassword} ></Route> 
    <Route exact path = "/login" component = {LoginSignUp}></Route>
    <Route exact path = "/cart" component = {Cart}></Route>
    
    <ProtectedRoute exact path = "/shipping" component = {Shipping} /> 
    <Footer />
    </Router>
    </div>
  );
}

export default App;
