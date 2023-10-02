import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import Posts from '../../Components/Posts/Posts';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Home.css';
import axios from 'axios';
import { useLocation } from 'react-router';
const Home = () => {
  const [posts, setposts] = useState([]);
  const { search } = useLocation();
  console.log(search);
  useEffect(() => {
    const fetchposts = async () => {
      try {
        const res = await axios.get('/posts' + search);
        setposts(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchposts();
  }, [search]);
  console.log(posts);

  return (
    <>
      <Header></Header>
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
