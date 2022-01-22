
import './App.css';
import Home from './myComponents/Home';
import Login from './myComponents/Login';
import Contact from './myComponents/Contact';
import Navbar from './myComponents/Navbar';
import Footer from './myComponents/Footer';
import AboutUs from './myComponents/AboutUs';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Register from './myComponents/Register';
import { useState } from 'react';
import Product from './myComponents/Product';


function App() {
  const [user,setLoginUser] = useState({})
  return (
    <Router>
    <div className="App">
    <Navbar></Navbar>
    <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
      <Route exact path = "/Home" component = {Home}></Route>
      <Route exact path = "/Product" component = {Product}></Route>
      <Route exact path = "/Contact" component = {Contact}></Route>
      <Route exact path = "/AboutUs" component = {AboutUs}></Route>
    </Switch>
    <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;


