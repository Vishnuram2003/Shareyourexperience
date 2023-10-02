import React from "react";
import "./Posts.css";
import Post from "../Post/Post";
const Posts = ({ posts }) => {
  // console.log(posts);
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
};

export default Posts;
