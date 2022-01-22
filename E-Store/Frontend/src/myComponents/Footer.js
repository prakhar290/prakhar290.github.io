import React from 'react'
import fb from './facebook-new.png';
import git from './github.png';
import inst from './instagram-new.png';
import tw from './twitter.png'
import li from './linkedin.png'

function Footer() {
    return (
        <div>

<footer class="bg-dark text-center text-white full-footer">
    
<div class="container my-5">
<div class="container p-3 pb-3">
  <section class="mb-7">
    <a class="btn btn-outline-light btn-floating m-2" href="#!" role="button"
      ><i class="fab fa-facebook-f"></i
    ><img src = {fb} height = "40" width = "40"/></a>

    <a class="btn btn-outline-light btn-floating m-2" href="#!" role="button"
      ><i class="fab fa-twitter"></i
    ><img src = {tw} height = "40" width = "40"/></a>

    <a class="btn btn-outline-light btn-floating m-2" href="https://www.instagram.com/__prakhar_varshney__/?hl=en" role="button"
      ><i class="fab fa-instagram"></i
    ><img src = {inst} height = "40" width = "40"/></a>
<a class="btn btn-outline-light btn-floating m-2" href="https://www.linkedin.com/in/prakhar-varshney-247b731b2/" role="button"
      ><i class="fab fa-linkedin-in"></i
    ><img src = {li} height = "40" width = "40"/></a>

    <a class="btn btn-outline-light btn-floating m-2" href="https://github.com/prakhar290" role="button"
      ><i class="fab fa-github"></i
    ><img src = {git} height = "40" width = "40"/></a>
  </section>
</div>
<div class="bg-dark text-center p-3 footer-style">
  © 2022 Copyright:
  <a class="text-white" href="https://mdbootstrap.com/"> RAMP Shopping Store</a>
</div>
</div>
</footer>


        </div>
    )
}

export default Footer
