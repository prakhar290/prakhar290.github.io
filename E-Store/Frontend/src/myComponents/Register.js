import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        phone:"",
        address:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, phone, address, password, reEnterPassword } = user
        if( name && email && phone && address &&  password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/Register", user)
            .then( res => {
                alert(res.data.message)
                history.push("/Login")
            })
        } else {
            alert("invalid input")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="text" name="phone" value={user.phone} placeholder="Your Phone Number" minlength = "10" maxlength = "10" onChange={ handleChange }></input>
            <input type="text" name="address" value={user.address} placeholder="Your Address" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" minlength = "6" maxlength = "10" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/Login")}>Login</div>
        </div>
    )
}

export default Register