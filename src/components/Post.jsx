import React, { useEffect, useState } from "react";
import "./Post.css";

function Post({ contract, post, setSelectedPost, selectedPost, account }) {
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

  useEffect(() => {
    getIfLiked();
    getLikes();
  },[selectedPost]);

  const likePost = async () => {
    const tx = await contract.likePost(post.id);
    await tx.wait();
    getLikes();
    getIfLiked();
  };

  const getIfLiked = async () => {
    const tx = await contract.getIfLiked(post.id);
    setIsLiked(tx);
  };

  const getAuthorCID = async (account) => {
    const tx = await contract.getAuthorCID(account);
    setAuthorCID(tx);
  };

  const getAuthorName = async (account) => {
    const tx = await contract.getAuthorName(account);
    setAuthorName(tx);
  };

  const getLikes = async () => {
    const like = await contract.getLikes(post.id);
    setLikes(parseInt(like));
  };

  const handleClick = () => {
    setSelectedPost(post);
  };

  return (
    <div className="Post">
      <div className="leftContent" onClick={handleClick}>
        <img src={`https://gateway.ipfs.io/ipfs/${post.imgCID}`} alt="" />
      </div>
      <div className="rightContent">
        <h1 onClick={handleClick}>{post.postTitle}</h1>
        <div className="authorInfo" onClick={handleClick}>
          <div className="left">
            <img
              className="profileImage"
              src={`https://gateway.ipfs.io/ipfs/${authorCID}`}
              alt="Profile"
            />
          </div>
          <div className="right">
            <p>{authorName}</p>
            <p>{post.author.slice(0, 6) + "..." + post.author.slice(38, 42)}</p>
          </div>
        </div>
        <p className="tags" onClick={handleClick}>
          {post.tag}
        </p>
        <hr />
        <div className="likeButton">
          <button className="lkbtn" onClick={likePost} disabled={isLiked}>
            <p>👍</p>
          </button>
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
