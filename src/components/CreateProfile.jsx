import React from "react";
import { useState } from "react";
import axios from "axios";
import "./CreateProfile.css";
import { ethers } from "ethers";

function CreateProfile({ contract }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [profileCid, setProfileCid] = useState(null);

  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);

  const createProfile = async () => {
    const tx = await contract.createProfile(username, bio, profileCid);
    await tx.wait();
    window.location.reload();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // handleUpload();
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
      setProfileCid(response.data.IpfsHash);
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="CreateProfile">
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="bio"
        onChange={(e) => {
          setBio(e.target.value);
        }}
      ></textarea>
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
      <button class="entry cyberpunk-button" onClick={createProfile}>
        Submit
      </button>
    </div>
  );
}

export default CreateProfile;
