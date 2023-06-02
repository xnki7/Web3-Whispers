import React, { useState, useEffect } from "react";
import "./PostModal.css";

function PostModal({ post, setSelectedPost, contract }) {
  const [likes, setLikes] = useState(null);
  const [authorCID, setAuthorCID] = useState(null);
  const [authorName, setAuthorName] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getLikes();
    getAuthorCID(post.author);
    getAuthorName(post.author);
    getIfLiked();
  }, []);

  const getAuthorCID = async (account) => {
    const tx = await contract.getAuthorCID(account);
    setAuthorCID(tx);
  };

  const getAuthorName = async (account) => {
    const tx = await contract.getAuthorName(account);
    setAuthorName(tx);
  };

  const getIfLiked = async () => {
    const tx = await contract.getIfLiked(post.id);
    setIsLiked(tx);
  };

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
        <div className="authorInfo">
          <div>
            <p className="written">Written By :</p>
          </div>
          <div className="left">
            <img
              className="profileImage"
              src={`https://gateway.ipfs.io/ipfs/${authorCID}`}
              alt="Profile"
            />
          </div>
          <div className="right">
            <p>{authorName}</p>
            <p>{post.author}</p>
          </div>
        </div>
      </div>
      <div className="content">
        <p>{post.content}</p>
      </div>
      <div className="tags">
        <p>{post.tag}</p>
        <div className="like">
          <button className="lkbtn" onClick={likePost} disabled={isLiked}>
            <p>👍</p>
          </button>
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
