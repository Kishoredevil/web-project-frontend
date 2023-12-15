import React, { useEffect, useState } from "react";
import "../assets/css/Reg.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import lk from "../assets/images/lk.png";
import ReactLoading from "react-loading";
import {Button,Row,Col,Form, Modal, CloseButton, Card} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import Select from 'react-select'
let dis = true;
let cp = 'false'
const Reg = ({change}) => {
  const [success, setSuccess] = useState([]);
  const [eyes1,setEyes1] = useState(eyeOff)
  const [eyes2,setEyes2] = useState(eyeOff)
  const [details,setDetails]=useState({})
  const [showp1, setShowp1] = useState(true);
  const [showp2, setShowp2] = useState(true);
  const [ver1, setVer1] = useState(false);
  const [stles,setStles]=useState({border:'none'})
  const [erro, setErro] = useState([])
  const [col, setCol] = useState([]);
  const [secret, setSecret] = useState([]);
  const handlet1=()=>{
  if(showp1===true){
    setShowp1(false)
    setEyes1(eye)
  }
  else{
    setShowp1(true)
    setEyes1(eyeOff)
  }
}
const handlet2=()=>{
  if(showp2===true){
    setShowp2(false)
    setEyes2(eye)
  }
  else{
    setShowp2(true)
    setEyes2(eyeOff)
  }
}

const mySty1={
  control:(defaultStyles)=>({
    ...defaultStyles,
    border: '1px solid #dee2e6',
    borderRadius:'6px',
    paddingTop:'2px',
    paddingBottom:'2px',
  }),
  menu:(defaultStyles)=>({
    ...defaultStyles,
    textAlign:'center',
    fontWeight:'bold',
    border:'5px solid gray',
  }),
  singleValue:(defaultValue)=>({
    ...defaultValue,
    color:'black',
  }),
}
const mySty={
  control:(defaultStyles)=>({
    ...defaultStyles,
    border: '1px solid #dee2e6',
    borderRadius:'6px',
    paddingTop:'2px',
    paddingBottom:'2px',
  }),
  menu:(defaultStyles)=>({
    ...defaultStyles,
    textAlign:'center',
    fontWeight:'bold',
    border:'5px solid gray',
  }),
  singleValue:(defaultValue)=>({
    ...defaultValue,
    color:'black',
  }),
}

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/secret-questions")
      .then((response) => {
        setSecret(response.data);
      })
      .catch((error) => {
        console.error("Error fetching secret questions:", error);
      });
    axios
      .get("http://localhost:5000/api/institution-details")
      .then((response) => {
        setCol(response.data);
      })
      .catch((error) => {
        console.error("Error fetching secret questions:", error);
      });
  }, []);
  const option = [];
  const option1 = [];
  for (let i = 0; i < secret.length; i++) {
    let obj = {};
    if (secret[i].question_text !== details.Question2) {
      obj["value"] = secret[i].question_id;
      obj["label"] = secret[i].question_text;
      option.push(obj);
    } else {
      continue;
    }
  }
  if (details.Question1) {
    for (let i = 0; i < option.length; i++) {
      let oj = {};
      if (option[i].value !== details.Question1) {
        oj["value"] = option[i].value;
        oj["label"] = option[i].label;
        option1.push(oj);
      } else {
        dis = false;
        continue;
      }
    }
  }
  const parent = [];
  let child = [];
  let bo = {};
  let ob = {};
  for (let i = 0; i < col.length; i++) {
    if (!col[i].parent_institution_id) {
      ob["label"] = col[i].name;
    }
    for (let j = 0; j < col.length; j++) {
      if (col[i].id === col[j].parent_institution_id) {
        bo["value"] = col[j].id;
        bo["label"] = col[j].name;
        bo["pare"] = col[j].parent_institution_id;
        child.push(bo);
        ob["options"] = child;
        parent.push(ob);
        child = [];
        bo = {};
        ob = {};
      }
    }
  }
  if(details.Password===details.ConfirmPassword){
    cp='true'
  }
  else{
    cp='false'
  }
  const handleChange=(e)=>{
    if(ver1===true){
      window.grecaptcha.reset();
    }
    setVer1(false)
    setErro([])
    //console.log(e.target)
    //console.log(details)
    setDetails({...details,[e.target.id]:e.target.value})
    
  }
  const sonChange=(e,id)=>{
    setDetails({...details,[id.name]:e.value})
  }
  const capta1 = () => {
    setStles({border:'none'})
    setTimeout(() => {
      window.grecaptcha.reset();
      setVer1(false);
    }, 60000);
    setVer1(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErro([])
    const backendEndpoint = "http://localhost:5000/api/register";
    const dataToSend = JSON.stringify(details);
    if (ver1 === true) {
      axios
        .post(backendEndpoint, dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          console.log('success')
          setStles({ border: "none" });
          setSuccess(
            <Modal show='true' className="sec"   >
            <section className="lo">
              <ReactLoading
                type="balls"
                color="#0000FF"
                height={1}
                width={200}
              />
            </section>
            </Modal>
          );
          setTimeout(() => {
            setSuccess(
              <Modal className="sec" show='true'>
                <section className="load">
                <h3>Registered Successfully</h3>
                <img src={lk} alt="success"></img>
                <br/>
                <a href="/ ">
                  <button>HOME</button>
                </a>
                </section>
              </Modal>
            );
          }, 2000);
        })
        .catch((er) => {
          setErro(er.response.data.er)
        });
    } else {
      setStles({ border: "5px solid red" });
    }
  }

  return (
      <Card className="inter">
      <div className="sd">
        {success}
      </div>
      <Card.Header>
        <CloseButton className="cutter" onClick={change} />
        <h1>SIGN UP</h1>
      </Card.Header>
      <Card.Body>
        <Form className="forum" onSubmit={handleSubmit} >
          {erro.map((n) => (
            <span style={{ color: "red",display:'block',background:'none' }}>{n.message}</span>
          ))}
          <Row className="row">
          <Form.Group as={Col} controlId="UserName">
            <Form.Control
              autoComplete="off"
              placeholder="Username"
              type='text'
              onChange={handleChange}
              focused='false'
              pattern="^[A-Za-z0-9.@_]{8,30}$"
              required
            />
            <span>
              invalid User Name
            </span>
          </Form.Group>
          <Form.Group as={Col}  controlId="Email">
            <Form.Control
              autoComplete="off"
              type='email'
              placeholder="Email Address"
              onChange={handleChange}
              focused='false'
              pattern="^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$"
              required
            />
            <span>
              invalid User Name
            </span>
          </Form.Group>
          </Row>
          <Row className="row">
          <Form.Group as={Col} className="ic1" controlId="Password">
          <div className="ico1">
            <div style={{width:'100%'}}>
            <Form.Control
              autoComplete="off"
              placeholder="Password"
              type={showp1?'password':'text'}
              onChange={handleChange}
              focused='false'
              pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.])[a-zA-Z0-9.!@#$%^&*]{8,20}$"      
              required
              />
           <span>
            Invalid Password
           </span>
           </div>
           <Icon className="eyer1" icon={eyes1} size={18} onClick={handlet1}/>
           </div>
          </Form.Group>
          <Form.Group as={Col} className="ic2" controlId="ConfirmPassword">
          <div className="ico1">
            <div style={{width:'100%'}}>
            <Form.Control
              className='ox'
              placeholder="Confirm Password"
              autoComplete="off"
              type={showp2?'password':'text'}
              onChange={handleChange}
              focused={cp}
              required
            />
            <span>Invalid</span>
           </div>
           <Icon className="eyer1" icon={eyes2} size={18} onClick={handlet2}/>
           </div>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group controlId="Institution">
            <Select
              styles={mySty1}
              placeholder='Institutions'
              name="Institution"
              onChange={(e,name)=>sonChange(e,name)}
              options={parent}
              required
              menuPlacement="auto"
            />
            <span>
              invalid User Name
            </span>
          </Form.Group>
          </Row>
          <Row className="row">
          <Form.Group as={Col} controlId="Question1">
            <Select
              styles={mySty}
              placeholder="Questions"
              name="Question1"
              onChange={(e,name)=>sonChange(e,name)}
              options={option}
              menuPlacement="auto"
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Answer1">
            <Form.Control
              autoComplete="off"
              placeholder="Answer"
              type='text'
              onChange={handleChange}
              focused='false'
              required
            />
            <span>
              invalid User Name
            </span>
          </Form.Group>
          </Row>
          <Row className="row">
          <Form.Group as={Col} controlId="Question2">
            <Select
              styles={mySty}
              name="Question2"
              placeholder='Questions'
              onChange={(e,name)=>sonChange(e,name)}
              required
              options={option1}
              isDisabled={dis}
              menuPlacement="auto"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="Answer2">
            <Form.Control
              placeholder="Answer"
              autoComplete="off"
              type='text'
              onChange={handleChange}
              focused='false'
              required
              disabled={dis}
            />
            <span>
              invalid User Name
            </span>
          </Form.Group>
          </Row>
          <Form.Group className="cape">
              <ReCAPTCHA
                style={stles}
                className="lost"
                onChange={capta1}
                sitekey={process.env.REACT_APP_SITE_KEY}
                />
          </Form.Group>
              <Button id="sig" type="submit">
                SIGN UP
              </Button>
        </Form>
        </Card.Body>
      </Card>
  );
};
export default Reg;