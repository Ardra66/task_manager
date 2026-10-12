import { useState } from "react";
import axios from "axios";

import {Link, useNavigate}  from "react-router-dom"

function Register(){
    const[form, setForm] = useState("")
    const navigate = useNavigate()


    const handleChange = (e)=>{
        setForm({...form,[e.target.name]: e.target.value})
    }

    const hanndleSubmit = async (e)=>{
        e.preventDefault();

        try{
            await axios.post ("http://localhost:5000/api/auth/register", form);
            alert("Registration successfull")
            navigate("/login")
        }catch(error){
            setMessage(error.response?.data?.message || "Registration failed")
        }
    }

    return (
        <div style={StyleSheet.container}>
            <h2>Register</h2>
            <form onSubmit={hanndleSubmit} style={style.form}>
                <input
                name= "name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                ></input>
            <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required></input>

            <input
             name="passwprd"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required></input>
            <button type="submit">Register</button>

            </form>

            <p>
                Already Registered?<Link to ="/login"></Link>
            </p>
        </div>
    )
}