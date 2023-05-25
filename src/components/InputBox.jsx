import React from "react";
import "./InputBox.css";

function InputBox({setTitle, setContent, setTags, createPost}) {
  return (
    <div className="InputBox">
      <div className="entry">
        <h3>Title :</h3>
        <input type="text" onChange={(e)=>{setTitle(e.target.value)}}/>
      </div>
      <div className="entry">
        <h3>Tags :</h3>
        <input type="text" onChange={(e)=>{setTags(e.target.value)}} name="" id="" />
      </div>
      <div className="entry">
        <h3>Content :</h3>
        <textarea name="" id="" cols="30" rows="10" onChange={(e)=>{setContent(e.target.value)}}></textarea>
      </div>
      <button className="entry" onClick={createPost}>Submit</button>
    </div>
  );
}

export default InputBox;
