import React from 'react'

function PostModal({title, togglePop}) {
  return (
    <div className='PostModal'>
        <button onClick={togglePop}>X</button>
        <h2>{title}</h2>
        <p>Content</p>
        <h4>tags</h4>
    </div>
  )
}

export default PostModal