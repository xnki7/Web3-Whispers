import React from "react";
import "./PostModal.css";

function PostModal({
  title,
  author,
  content,
  tags,
  likes,
  likePost,
  togglePop1,
  cid,
}) {
  return (
    <div className="PostModal">
      <div className="close">
        <p onClick={togglePop1}>X</p>
      </div>
      <div className="header">
        <img src={`https://gateway.ipfs.io/ipfs/${cid}`} alt="" />
      </div>

      <div className="title">
        <h1>{title}</h1>
        <p>By: {author}</p>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
      <div className="tags">
        <p>{tags}</p>
        <div className="like">
          <button onClick={likePost}>Like</button>
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
