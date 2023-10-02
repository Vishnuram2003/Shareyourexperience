import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import axios from 'axios';
const Register = () => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // const [conpassword, setconpassword] = useState('');
  const [err, seterror] = useState('');
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Try starting');
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      });
      console.log('Response recieved after registering');
      console.log(res.data);
      window.location.replace('/login');
      console.log('End of try block');
    } catch (error) {
      console.log('in error block');
      if (
        error.response.data.code === '11000' &&
        error.response.data.keyPattern.username
      )
        console.log('This username already exists');
      else if (
        error.response.data.code === '11000' &&
        error.response.data.keyPattern.email
      )
        seterror('This email already exists');
      console.log(err);
    }
  };
  return (
    <div className="register">
      <span className="registertitle">REGISTER</span>
      <form className="registerform" onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Username"
          autoComplete="on"
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          autoComplete="on"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="on"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          autoComplete="on"
          onChange={(e) => {
            // setconpassword(e.target.value);
          }}
        />
        <button className="registerbutton">
          <Link to="/register" className="link">
            REGISTER
          </Link>
        </button>
        {/* {error && <span>Username already exists</span>} */}
      </form>
    </div>
  );
};

export default Register;
