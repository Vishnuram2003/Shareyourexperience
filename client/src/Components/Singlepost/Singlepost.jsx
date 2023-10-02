import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import './Singlepost.css';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
const Singlepost = () => {
  const [post, setpost] = useState({});
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [updatemode, setupdatemode] = useState(false);
  const location = useLocation();
  const path = location.pathname.split('/')[2]; //post id from url
  const pf = 'http://localhost:3003/images/';
  const { user } = useContext(Context);
  console.log(path);
  useEffect(() => {
    const getpost = async () => {
      const res = await axios.get('/posts/' + path);
      setpost(res.data);
      settitle(res.data.title);
      setdesc(res.data.desc);
    };
    getpost();
  }, [path]);

  const handledelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  };
  const handleupdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setupdatemode(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="singlepost">
      <div className="singlepostwrapper">
        {post.photo && (
          <img src={pf + post.photo} alt="" className="singlepostimage" />
        )}
        {updatemode ? 
          <input
            type="text"
            value={title}
            className="singleposttitleinput"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
         : (
          <h1 className="singleposttitle">
            <div>{title}</div>
            {post.username === user?.username && (
              <div className="singlepostedit">
                <i
                  className="singleposticon fa-solid fa-pen-to-square"
                  onClick={() => {
                    setupdatemode(true);
                  }}
                ></i>
                <i
                  className="singleposticon fa-solid fa-trash"
                  onClick={handledelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlepostinfo">
          <span className="singlepostauthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlepostdate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updatemode ? (
          <textarea
            className="singlepostdescriptioninput"
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
          />
        ) : (
          <p className="singlepostdescription">{desc}</p>
        )}
        {updatemode && (
        <button className="updatebutton" onClick={handleupdate}>
          Update
        </button>
        )}
      </div>
    </div>
  );
};

export default Singlepost;
