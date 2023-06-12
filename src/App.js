import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import InputBox from "./components/InputBox";
import Post from "./components/Post";
import LeftCom from "./components/LeftCom";
import { contractAddress, contractAbi } from "./constant/constant";
import { ethers } from "ethers";
import PostModal from "./components/PostModal";
import CreateProfile from "./components/CreateProfile";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [uploadedPosts, setUploadedPosts] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [toggle2, setToggle2] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(false);

  useEffect(() => {
    loadBcData();
  }, []);

  const togglePop = () => {
    setToggle(!toggle);
  };

  const togglePop2 = () => {
    setToggle2(!toggle2);
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

  async function profileCreated(account) {
    const tx = await contract.profileCreated(account);
    setIsProfileCreated(tx);
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
        profileCreated(address);
        getProfile(address);
        setIsConnected(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getUploadedPosts() {
    const posts = await contract.getUploadedPosts();
    setUploadedPosts(posts);
    console.log(profile);
  }

  async function getProfile(address) {
    try {
      const tx = await contract.getProfile(address);
      const parsedStruct = {
        userAdd: tx.userAdd,
        userName: tx.userName,
        bio: tx.bio,
        profilePicCID: tx.profilePicCID,
      };
      setProfile(parsedStruct);
      console.log(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  return (
    <div className="App">
      <Navbar connectWallet={connectWallet} account={account} />
      <div className="contents">
        <LeftCom
          togglePop={togglePop}
          toggle={toggle}
          toggle2={toggle2}
          togglePop2={togglePop2}
          profile={profile}
          isProfileCreated={isProfileCreated}
        />
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
                  setSelectedPost={setSelectedPost}
                  selectedPost={selectedPost}
                  account={account}
                />
              ))
          ) : (
            <>
              <p>Connect Wallet to see posts.</p>
              <p>
                Connect Wallet and create profile to start posting your blogs.
              </p>
            </>
          )}
        </div>
      </div>
      {toggle && (
        <>
          <InputBox
            getUploadedPosts={getUploadedPosts}
            contract={contract}
            togglePop={togglePop}
            isProfileCreated={isProfileCreated}
            isConnected={isConnected}
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
      {toggle2 && (
        <>
          <CreateProfile contract={contract} togglePop2={togglePop2} />
          <div className="overlay" onClick={togglePop2}></div>
        </>
      )}
    </div>
  );
}

export default App;
