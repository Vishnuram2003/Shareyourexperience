import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
const Post = ({ post }) => {
  // console.log(post.title);
  const pf = 'http://localhost:3003/images/'
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={pf + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <div className="postCat">{c.title}</div>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDescription">{post.desc}</p>
    </div>
  );
};

export default Post;
