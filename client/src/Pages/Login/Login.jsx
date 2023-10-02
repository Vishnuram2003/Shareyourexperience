import React, { useContext } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { Context } from '../../Context/Context';
import axios from 'axios';


const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const handlesubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'LOGIN_START' });
    console.log('inside handle submit');
    try {
      const res = await axios.post('/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      console.log('inside login try');
      console.log(res.data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };
  console.log(user);
  return (
    <div className="login">
      <span className="logintitle">LOGIN</span>
      <form className="loginform" onSubmit={handlesubmit}>
        <input type="text" placeholder="Username" ref={userRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="loginbutton" type="submit" disabled={isFetching}>
          LOGIN
        </button> 
        <button className="loginregisterbutton">
          <Link to="/register" className="link">
            REGISTER
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
