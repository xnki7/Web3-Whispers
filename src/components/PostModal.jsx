import React from 'react'

function PostModal({title, author,content, tags,likes, likePost, togglePop}) {
  return (
    <div className='PostModal'>
      <div className="PostModal__details">
        <button onClick={togglePop}>X</button>
        <h2>{title}</h2>
        <p>{author}</p>
        <h4>{tags}</h4>
        <h3>{content}</h3>
        <h4>{likes}</h4>
        <button onClick={likePost}>like</button>
      </div>
    </div>
  )
}

export default PostModal