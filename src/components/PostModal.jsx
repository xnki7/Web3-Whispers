import React, { useState, useEffect } from "react";
import "./PostModal.css";

function PostModal({ post, setSelectedPost, contract }) {
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    getLikes();
  }, []);

  const likePost = async () => {
    const tx = await contract.likePost(post.id);
    await tx.wait();
    getLikes();
  };

  const getLikes = async () => {
    const like = await contract.getLikes(post.id);
    setLikes(parseInt(like));
  };

  return (
    <div className="PostModal">
      <div
        className="close"
        onClick={() => {
          setSelectedPost(null);
        }}
      >
        <p>X</p>
      </div>
      <div className="header">
        <img src={`https://gateway.ipfs.io/ipfs/${post.imgCID}`} alt="" />
      </div>
      <div className="title">
        <h1>{post.postTitle}</h1>
        <p>By: {post.author}</p>
      </div>
      <div className="content">
        <p>{post.content}</p>
      </div>
      <div className="tags">
        <p>{post.tag}</p>
        <div className="like">
          <button onClick={likePost}>Like</button>
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
