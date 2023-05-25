import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import InputBox from "./components/InputBox";
import Post from "./components/Post";
import { contractAddress, contractAbi } from "./constant/constant";
import { ethers } from "ethers";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [tags, setTags] = useState(null);

  const [uploadedPosts, setUploadedPosts] = useState([]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const signer = provider.getSigner();
    setSigner(signer);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    setContract(contractInstance);
  }, []);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await provider.send("eth_requestAccounts", []);
        const address = await signer.getAddress();
        console.log("Metamask Connected to " + address);

        console.log(contract);
        setAccount(address);
        setIsConnected(true);
        getUploadedPostss();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function createPost() {
    const tx = await contract.createBlogPost(title, tags, content);
    await tx.wait();
  }

  async function getUploadedPostss() {
    const posts = await contract.getUploadedPosts();
    console.log(posts);
    setUploadedPosts(posts);
  }

  // async function likePost(){
  //   const tx = await contract.likePost
  // }

  return (
    <div className="App">
      <Navbar connectWallet={connectWallet} />
      <InputBox
        setTitle={setTitle}
        setContent={setContent}
        setTags={setTags}
        createPost={createPost}
      />
      {uploadedPosts.map((post) => {
        return (
          <Post
            content={post.content}
            tags={post.tag}
            author={post.author}
            title={post.postTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
