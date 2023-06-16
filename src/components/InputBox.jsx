import React, { useState } from "react";
import "./InputBox.css";
import axios from "axios";

function InputBox({ contract, getUploadedPosts, togglePop }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [tags, setTags] = useState(null);
  const [cid, setCid] = useState(null);

  async function createPost() {
    const tx = await contract.createBlogPost(title, tags, content, cid);
    await tx.wait();
    getUploadedPosts();
    togglePop();
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setUploading(true);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "85a5038c4046d5649d57",
            pinata_secret_api_key:
              "b1092d5c4cc0ec356fa667ec48e0e945d888f5e58b0fb8922335231032d9a71c",
          },
        }
      );

      console.log("IPFS CID:", response.data.IpfsHash);
      setCid(response.data.IpfsHash);
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="InputBox">
      <div className="header">
        <p onClick={togglePop}>X</p>
      </div>
      <div>
        <p>** All feilds must be filled in order to submit the form **</p>
      </div>
      <div className="entry">
        <input
          placeholder="Title..."
          type="text"
          class="title"
          required="required"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <hr />

      <div className="entry">
        <textarea
          placeholder="Write Your Blog..."
          name=""
          id=""
          required="required"
          class="textarea"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <hr />
      <div className="entry">
        <input
          type="text"
          class="title"
          placeholder="Tags..."
          onChange={(e) => {
            setTags(e.target.value);
          }}
          name=""
          id=""
        />
      </div>
      <hr />
      <div className="fileUpload">
        <p className="uploadImage">Upload an image</p>
        <input type="file" onChange={handleFileChange} />
        <button
          className="entry button"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      {uploading && <div>Loading...</div>}
      <hr />
      <button class="entry cyberpunk-button" onClick={createPost}>
        Submit
      </button>
    </div>
  );
}

export default InputBox;
