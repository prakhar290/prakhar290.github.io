import React from 'react'
import {Link} from 'react-router-dom'
import image from './image1.png'
function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="nav-link" href="#"><img src = {image} height = {25} width = {125}></img></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link nav-text" href="/Home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-text" href="/Login">Login/Register</a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-text" aria-current="page" href="Product">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-text" href="Shopping">Shopping Cart</a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-text" href="/Contact">Contact Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-text" href="AboutUs">About Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-text" href="Logout" disabled>Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </div>
    )
}

export default Navbar
