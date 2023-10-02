import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Write.css';
import { Context } from '../../Context/Context';
const Write = () => {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [file, setfile] = useState('');
  const { user } = useContext(Context);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const newpost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newpost.photo = filename;
      try {
        const res =   await axios.post('/upload', data);
        // const res = await axios.post("/upload", data);
        console.log(res);
      } catch (error) {
        console.log("Error in uploading image");
      }
    }
    try {
      const res = await axios.post('/posts', newpost);
      window.location.replace('/post/' + res.data._id);
    } catch (error) {}
    console.log(file);
  };

  return (
    <div className="write">
    {file && (
      <img
        src={URL.createObjectURL(file)}
        alt=""
        className="writeimage"
      />)
    }
      <form className="writeform" onSubmit={handlesubmit}>
        <div className="writeformgroup">
          <label htmlFor="fileinput">
            <i class="writeicon fa-solid fa-plus"></i>
          </label>
          <input type="file" id="fileinput" style={{ display: 'none' }} onChange={e=>setfile(e.target.files[0])}/>
          <input
            type="text"
            placeholder="Title"
            className="writeinput"
            autoFocus={true}
            onChange={e=>settitle(e.target.value)}
          />
        </div>
        <div className="writeformgroup">
          <textarea
            placeholder="Tell your experience"
            type="text"
            className="writeinput writetext"
            onChange={e=>setdesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writesubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
