import React, { useEffect, useState } from "react";
import "./Post.css";
import PostModal from "./PostModal";

function Post({ contract, content, tags, author, title, id, cid }) {
  const [likes, setLikes] = useState(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getLikes();
  });

  function togglePop(){
    // setToggle(true);
    toggle ? setToggle(false) : setToggle(true)
  }

  // function closeTogglePop(){
  //   setToggle(false);
  // }

  const likePost = async ()=>{
    const tx = await contract.likePost(id);
    await tx.wait();
    // window.location.reload();
    getLikes();
  }

  const getLikes = async ()=>{
    const like = await contract.getLikes(id);
    setLikes(parseInt(like));
  }

  return (
    <div className="Post" onClick={togglePop}>
      <div className="entry">
        <img src={`https://gateway.ipfs.io/ipfs/${cid}`} alt="" />
      </div>
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
        <p>{likes}</p>
      </div>
      <button
        onClick={() => {
          likePost();
        }}
      >
        Like
      </button>
      {toggle && (<PostModal title={title} author={author} content={content} tags={tags} likes={likes} likePost={likePost} togglePop={togglePop}/>)}
    </div>
  );
}

export default Post;
