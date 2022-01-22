import React from 'react'
import rudra from './rudra.jpeg';
import abhi from './abhishek1.jpeg';
import pv from './resume_image.png'
import monu from './monu.jpg'
import ankit from './ankit.jpeg';
function AboutUs() {
    return (
        <div>
            <section class="our-webcoderskull padding-lg">
  <div class="container">
    <div class="row heading heading-icon">
        <h2>Our Team</h2>
    </div>
    <ul class="row"> <li class="col-12 col-md-6 col-lg-3">
          <div class="cnt-block equal-hight about-style">
            <figure><img src={ankit} class="img-responsive" alt=""/></figure>
            <h3><a href="http://www.webcoderskull.com/">Dr. Ankit Verma </a></h3>
            <p>Mentor</p>
            <ul class="follow-us clearfix">
              <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
            </ul>
          </div>
      </li>
      <li class="col-12 col-md-6 col-lg-3">
          <div class="cnt-block equal-hight about-style">
            <figure><img src={pv} class="img-responsive" alt=""/></figure>
            <h3><a href="http://www.webcoderskull.com/">Prakhar Varshney</a></h3>
            <p>Student</p>
            <ul class="follow-us clearfix">
              <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
            </ul>
          </div>
      </li>
      <li class="col-12 col-md-6 col-lg-3">
          <div class="cnt-block equal-hight about-style">
            <figure><img src={monu} class="img-responsive" alt=""/></figure>
            <h3><a href="#">Manvendra Pratap Singh </a></h3>
            <p>Student</p>
            <ul class="follow-us clearfix">
              <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
            </ul>
          </div>
      </li>
      <li class="col-12 col-md-6 col-lg-3">
          <div class="cnt-block equal-hight about-style">
            <figure><img src={rudra} class="img-responsive" alt=""/></figure>
            <h3><a href="http://www.webcoderskull.com/">Rudra Gahlot </a></h3>
            <p>student</p>
            <ul class="follow-us clearfix">
              <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
            </ul>
          </div>
       </li>
      <li class="col-12 col-md-6 col-lg-3">
          <div class="cnt-block equal-hight about-style">
            <figure><img src={abhi} class="img-responsive" alt=""/></figure>
            <h3><a href="http://www.webcoderskull.com/">Abhishek Upadhyay </a></h3>
            <p>Student</p>
            <ul class="follow-us clearfix">
              <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
            </ul>
          </div>
      </li>
    </ul>
  </div>
</section>
        </div>
    )
}

export default AboutUs
