import React, { useContext, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Settings.css';
import { Context } from '../../Context/Context';
import axios from 'axios';
const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setfile] = useState(null);
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [success, setsuccess] = useState(false);
  const pf = 'http://localhost:3003/images/';
  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updateduser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      console.log('inseide file');
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updateduser.profilePic = filename;
      try {
        console.log('uploading file');
        const res = await axios.post('/upload', data);
        // const res = await axios.post("/upload", data);
        console.log(res);
      } catch (error) {
        console.log('Error in uploading image');
      }
    }
    try {
      console.log(user._id);
      console.log(updateduser);
      const res = await axios.put(`/users/${user._id}`, updateduser);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
      if (res.status === 200) setsuccess(true);
    } catch (error) {
      dispatch({ type: 'UPDATE_FAILURE' });
      console.log(error);
    }
    console.log(file);
  };
  return (
    <div className="settings">
      <div className="settingswrapper">
        <div className="settingstitle">
          <span className="settingsupdatetitle">Update your account</span>
          <span className="settingsdeletetitle">Delete account</span>
        </div>
        <form action="" className="settingsform" onSubmit={handlesubmit}>
          <label>Profile Picture</label>
          <div className="settingsprofilepicture">
            <img
              src={file ? URL.createObjectURL(file) : pf + user.profilePic}
              alt=""
            />
            <label htmlFor="fileinput">
              <i class="settingsprofilepicicon fa-solid fa-user"></i>
            </label>
            <input
              type="file"
              name=""
              id="fileinput"
              style={{ display: 'none' }}
              onChange={(e) => setfile(e.target.files[0])}
            />
          </div>
          <label htmlFor="">Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />

          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder=""
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button className="settingssubmit" type="submit">
            Update
          </button>
          {success && <span>Profile updated successfully</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
