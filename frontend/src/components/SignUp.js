import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
export function SignUp(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const userDetails = async () => {
        let userData = await fetch('http://localhost:5000/signup',{
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        userData = await userData.json();
        if(userData)
            navigate('/');
        
    }
    return(
        <div className="register">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="button" class="btn btn-success"  className="signup-botton"onClick={userDetails}>Sign Up</Button>
        </div>
    )
}