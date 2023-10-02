import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import profile from "../../Assets/profile.jpeg";
import axios from "axios";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [cat, setcat] = useState([]);
  useEffect(() => {
    const getcats = async () => {
      const res = await axios.get("/category");
      setcat(res.data);
      console.log(res.data);
    };
    getcats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="profileimage" src={profile}></img>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi labore
          officia distinctio qui
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="topIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
