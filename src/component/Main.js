import React, { useState } from "react";
import "../assets/css/Main.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import logoo from "../assets/images/logAr2t.png";
import {Button,Nav,Form, Modal} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import Reg from "./Reg";
const Main = () => {
  const [eyes,setEyes] = useState(eyeOff)
  const [log,setLog]=useState({})
  const [ver, setVer] = useState(false);
  const [showp, setShowp] = useState(true);
  const [show, setShow] = useState(false);
  const [stle,setStle]=useState({border:'none'})
  const [lerror, setLerror] = useState([])
  const handlesChange=(e)=>{
    if(ver===true){
      window.grecaptcha.reset();
    }
    setLerror([])
    setVer(false)
    setLog({...log,[e.target.id]:e.target.value})
  }
  const logIn = async (e) => {
    e.preventDefault();
    setLerror([])
    if(ver===true){
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          UserName: log.Username,
          Password: log.password,
        });
        console.log(response)
        localStorage.setItem("token", response.data.Header);
        window.location.href=' '
      } catch (error) {
        setLerror([error.response.data.message])
      }
    }
    else {
      setStle({ border: "5px solid red" });
    }
  }
  const change = () => {
    setShow(!show)
  }
  const capta = () => {
    setStle({border:'none'})
    setTimeout(() => {
      window.grecaptcha.reset();
      setVer(false);
    }, 60000);
    setVer(true);
  };
  const handlet=()=>{
    if(showp===true){
      setShowp(false)
      setEyes(eye)
    }
    else{
      setShowp(true)
      setEyes(eyeOff)
    }
  }
  return (
    <main className="main">
      <section className="logger">
        <img src={logoo} alt="logo" />
        <Form className="formu" onSubmit={logIn}>
        {lerror.map((n) => (
            <div style={{ color: "red" }}>{n}</div>
          ))}
          <Form.Group controlId="Username">
           <Form.Control
            type= "text"
            placeholder= "User Name"
            pattern= "^[A-Za-z0-9.@_]{8,30}$"
            onChange={handlesChange}
            autoComplete="off"
            required
            />
           <span>
            Invalid Username
           </span>
          </Form.Group>
          <Form.Group controlId="password">
           <div className="ico">
            <div style={{width:'100%'}}>
           <Form.Control
            type={showp ?'password':'text'} 
            placeholder= "Password"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.])[a-zA-Z0-9.!@#$%^&*]{8,20}$"
            onChange={handlesChange}
            autoComplete="off"
            required
            />
           <span>
            Invalid Password
           </span>
           </div>
           <Icon className="eyer" icon={eyes} size={18} onClick={handlet}/>
           </div>
           </Form.Group>
          <Form.Group className="cap">
            <ReCAPTCHA
              style={stle}
              className="los"
              onChange={capta}
              sitekey={process.env.REACT_APP_SITE_KEY}
            />
          </Form.Group>
          <Button
          className="logi" 
          type="submit">
            Log In
          </Button>
          <Nav.Item className="forg1">
            <Nav.Link className="forg" href="main">Forgot Password?</Nav.Link>
          </Nav.Item>
          <div className="div"></div>
          <div className='cna'>
          <Button
            id="cna1"
            type="button"
            onClick={change}>
            Create new account
          </Button>
          </div>
          <Modal className="mod" show={show} centered>
            <Reg
            change={change}
            />
          </Modal>
        </Form>
        </section>
    </main>
  );
};
export default Main;