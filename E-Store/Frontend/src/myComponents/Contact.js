import React from 'react'
import './custom.css';
function Contact() {
    return (
        <div>
            <div class="mystyle">

<section class="p-5 mystyle" >

<h1 class="custom-h1"><b>Contact Us</b></h1><br></br>
  <h2 class="custom-h1"><b>We love to hear from you!</b></h2><br></br>

  <form class="mb-5 mx-md-5" action="">

    <div class="row">
      <div class="col-md-4 mb-4">

        <input type="text" id="name" class="form-control" placeholder="Name"/>

      </div>
      <div class="col-md-4 mb-4">

        <input type="email" id="email" class="form-control" placeholder="Email"/>

      </div>
      <div class="col-md-4 mb-4">

        <input type="number" id="phone" class="form-control" placeholder="Phone"/>

      </div>
    </div>

    <div class="row">
      <div class="col-md-12 mb-4">

        <input type="text" id="subject" class="form-control" placeholder="Subject"/>

      </div>
    </div>

    <div class="row">
      <div class="col-md-12">

        <div class="form-group mb-4">
          <textarea class="form-control rounded" id="message" rows="3" placeholder="How can we help?"></textarea>
        </div>

        <div class="text-center">
          <input type="submit" class="form-control" name = "Submit"></input>
        </div>

      </div>
    </div>

  </form>

</section>


</div>
        </div>
    )
}

export default Contact
