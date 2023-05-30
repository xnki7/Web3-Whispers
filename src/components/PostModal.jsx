import React from 'react'
import "./PostModal.css"

function PostModal({title, author,content, tags,likes, likePost, togglePop, cid}) {
  return (
    <div className='PostModal'>
      <div className="header">
      <img src={`https://gateway.ipfs.io/ipfs/${cid}`} alt="" />
      <div className="close">
        <p>X</p>
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
      </div>
      </div>
    </div>
  )
}

export default PostModal