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
  const [contract, setContract] = useState(null);
  const [uploadedPosts, setUploadedPosts] = useState(null);

  useEffect(() => {
    loadBcData();
  }, []);

  const networks = {
    polygon: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Polygon Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  };

  async function loadBcData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    setProvider(provider);
    const signer = provider.getSigner();
    setSigner(signer);
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    setContract(contractInstance);
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        if (provider.network !== "matic") {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...networks["polygon"],
              },
            ],
          });
        }
        const address = await signer.getAddress();
        console.log("Metamask Connected to " + address);

        console.log(contract);
        setAccount(address);
        console.log(account);
        getUploadedPostss();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getUploadedPostss() {
    const posts = await contract.getUploadedPosts();
    setUploadedPosts(posts);
  }

  return (
    <div className="App">
      <Navbar connectWallet={connectWallet} />
      <InputBox getUploadedPostss={getUploadedPostss} contract={contract} />
      {uploadedPosts ? (
        uploadedPosts.slice(0).reverse().map((post) => {
          return (
            <Post
              contract={contract}
              id={post.id}
              content={post.content}
              tags={post.tag}
              author={post.author}
              title={post.postTitle}
              cid = {post.imgCID}
            />
          );
        })
      ) : (
        <p>Connect Wallet to see posts.</p>
      )}
      {/* {uploadedPosts.map((post) => {
        return (
          <Post
            contract={contract}
            id={post.id}
            content={post.content}
            tags={post.tag}
            author={post.author}
            title={post.postTitle}
          />
        );
      })} */}
    </div>
  );
}

export default App;
