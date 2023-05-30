import React, { useEffect, useState } from "react";
import "./Post.css";
import PostModal from "./PostModal";

function Post({ contract, content, tags, author, title, id, cid, togglePop1, togglePost }) {
  const [likes, setLikes] = useState(null);
 

  useEffect(() => {
    getLikes();
  });

  

  const likePost = async () => {
    const tx = await contract.likePost(id);
    await tx.wait();
    getLikes();
  };

  const getLikes = async () => {
    const like = await contract.getLikes(id);
    setLikes(parseInt(like));
  };

  return (
    <div className="Post" onClick={togglePop1}>
      <div className="leftContent">
        <img src={`https://gateway.ipfs.io/ipfs/${cid}`} alt="" />
      </div>
      <div className="rightContent">
        <h1>{title}</h1>
        <div className="authorInfo">
          <div className="left">
            {/* eslint-disable-next-line */}
            <img className="profileImage" src={require("./images/bhai.png")} />
          </div>
          <div className="right">
            <p>Ankit Gupta</p>
            <p>{author}</p>
          </div>
        </div>
        {/* <div className="entry">
          <h5>Content :</h5>
          <p>{content}</p>
        </div> */}
        <p className="tags"># {tags}</p>
        <hr />
        {/* <div className="entry">
          <h5>Likes :</h5>
          <p>{likes}</p>
        </div> */}
        {/* <button
          onClick={() => {
            likePost();
          }}
        >
          Like
        </button> */}
        <div className="likeButton">
          <div
            className="con-like"
            onClick={() => {
              likePost();
            }}
          >
            <input title="like" type="checkbox" className="like" />
            <div className="checkmark">
              <svg
                viewBox="0 0 24 24"
                className="outline"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className="filled"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
              </svg>
              <svg
                className="celebrate"
                width={100}
                height={100}
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="10,10 20,20" className="poly" />
                <polygon points="10,50 20,50" className="poly" />
                <polygon points="20,80 30,70" className="poly" />
                <polygon points="90,10 80,20" className="poly" />
                <polygon points="90,50 80,50" className="poly" />
                <polygon points="80,80 70,70" className="poly" />
              </svg>
            </div>
          </div>
          <p>{likes}</p>
        </div>
        {togglePost && (
          <>
            <PostModal
              title={title}
              author={author}
              content={content}
              tags={tags}
              likes={likes}
              likePost={likePost}
              togglePop1={togglePop1}
              cid={cid}
            />
            
          </>
        )}
      </div>
    </div>
  );
}

export default Post;
