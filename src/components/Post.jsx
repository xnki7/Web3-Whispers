import React from "react";
import "./Post.css";

function Post({ content, tags, author, title }) {
  return (
    <div className="Post">
      <div className="entry">
        <h4>Title :</h4>
        <h6>{title}</h6>
      </div>
      <div className="entry">
        <h5>By :</h5>
        <p>{author}</p>
      </div>
      <div className="entry">
        <h5>Content :</h5>
        <p>{content}</p>
      </div>
      <div className="entry">
        <h5>Tags :</h5>
        <p>{tags}</p>
      </div>
      <div className="entry">
        <h5>Likes :</h5>
        <p></p>
      </div>
    </div>
  );
}

export default Post;
