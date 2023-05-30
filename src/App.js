import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import InputBox from "./components/InputBox";
import Post from "./components/Post";
import LeftCom from "./components/LeftCom";
import { contractAddress, contractAbi } from "./constant/constant";
import { ethers } from "ethers";
import PostModal from "./components/PostModal";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [uploadedPosts, setUploadedPosts] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    loadBcData();
  }, []);

  const togglePop1 = () => {
    setToggle(false);
  };

  const togglePop = () => {
    setToggle(!toggle);
  };

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
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
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
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        if (provider.network.chainId !== networks.polygon.chainId) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networks.polygon],
          });
        }
        const address = await signer.getAddress();
        console.log("Metamask Connected to " + address);

        setAccount(address);
        getUploadedPosts();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getUploadedPosts() {
    const posts = await contract.getUploadedPosts();
    setUploadedPosts(posts);
  }

  return (
    <div className="App">
      <Navbar connectWallet={connectWallet} account={account} />
      <div className="contents">
        <LeftCom togglePop={togglePop} toggle={toggle} />
        <div className="posts">
          {uploadedPosts ? (
            uploadedPosts
              .slice(0)
              .reverse()
              .map((post) => (
                <Post
                  key={post.id}
                  contract={contract}
                  post={post}
                  togglePop1={togglePop1}
                  setSelectedPost={setSelectedPost}
                />
              ))
          ) : (
            <p>Connect Wallet to see posts.</p>
          )}
        </div>
      </div>
      {toggle && (
        <>
          <InputBox
            getUploadedPosts={getUploadedPosts}
            contract={contract}
            togglePop={togglePop}
          />
          <div className="overlay" onClick={togglePop}></div>
        </>
      )}
      {selectedPost && (
        <>
          <PostModal
            post={selectedPost}
            contract={contract}
            setSelectedPost={setSelectedPost}
          />
          <div className="overlay" onClick={() => setSelectedPost(null)}></div>
        </>
      )}
    </div>
  );
}

export default App;
