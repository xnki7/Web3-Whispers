import React, { useState } from "react";
import "./InputBox.css";
import axios from "axios";

function InputBox({ contract, getUploadedPostss }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [tags, setTags] = useState(null);
  const [cid, setCid] = useState(null);

  async function createPost() {
    const tx = await contract.createBlogPost(title, tags, content, cid);
    await tx.wait();
    getUploadedPostss();
    // emptyState();
  }

  // function emptyState() {
  //   setTitle(null);
  //   setContent(null);
  //   setTags(null);
  //   setCid(null);
  // }

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
            pinata_api_key: "3d07323041296c2f041f",
            pinata_secret_api_key:
              "c1300780df980e21c76e78c30593b3c23736357a85ebbc2481da0105d73b5315",
          },
        }
      );

      console.log("IPFS CID:", response.data.IpfsHash);
      setCid(response.data.IpfsHash);
      setUploaded(true);
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="InputBox">
      <div className="entry">
        <h3>Title :</h3>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="entry">
        <h3>Tags :</h3>
        <input
          type="text"
          onChange={(e) => {
            setTags(e.target.value);
          }}
          name=""
          id=""
        />
      </div>
      <div className="entry">
        <h3>Content :</h3>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div>
        <h2>Upload to IPFS via Pinata</h2>
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading || uploaded}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploading && <div>Loading...</div>}
      </div>
      <button className="entry" onClick={createPost}>
        Submit
      </button>
    </div>
  );
}

export default InputBox;
