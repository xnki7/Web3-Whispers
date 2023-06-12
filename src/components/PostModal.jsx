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

  useEffect(()=>{
    getIfLiked();
  },[likes])

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
        className="header"
      >
        {" "}
        <img src={`https://gateway.ipfs.io/ipfs/${post.imgCID}`} alt="" />
      </div>

      <div className="stuff">
        <h1 className="title">{post.postTitle}</h1>
        <p className="tags">{post.tag}</p>

        <div className="authorInfo">
          <img
            className="profileImage"
            src={`https://gateway.ipfs.io/ipfs/${authorCID}`}
            alt="Profile"
          />

          <div className="right">
            <p className="name">{authorName}</p>
            <p className="add">
              {post.author.slice(0, 6) + "..." + post.author.slice(38, 42)}
            </p>
          </div>
        </div>

        <hr />

        <p className="content">{post.content}</p>
      </div>

      <div className="like">
        <button className="lkbtn" onClick={likePost} disabled={isLiked}>
          <p>👍</p>
        </button>
        <p>{likes}</p>
      </div>
    </div>
  );
}

export default PostModal;
