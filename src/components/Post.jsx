import React, { useEffect, useState } from "react";
import "./Post.css";

function Post({ contract, content, tags, author, title, id }) {
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    getLikes();
  });

  async function likePost() {
    const tx = await contract.likePost(id);
    await tx.wait();
    // window.location.reload();
    getLikes();
  }

  async function getLikes() {
    const like = await contract.getLikes(id);
    setLikes(parseInt(like));
  }

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
        <p>{likes}</p>
      </div>
      <button
        onClick={() => {
          likePost();
        }}
      >
        Like
      </button>
    </div>
  );
}

export default Post;
