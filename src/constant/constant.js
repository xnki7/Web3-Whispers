const contractAddress = "0x13d7f77C8784Eb4C0678fE8367F7Df51Ec071Db6";

const contractAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_postTitle",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tag",
        type: "string",
      },
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imgCID",
        type: "string",
      },
    ],
    name: "createBlogPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_postId",
        type: "uint256",
      },
    ],
    name: "likePost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_postId",
        type: "uint256",
      },
    ],
    name: "getLikes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUploadedPosts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "author",
            type: "address",
          },
          {
            internalType: "string",
            name: "tag",
            type: "string",
          },
          {
            internalType: "string",
            name: "postTitle",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "string",
            name: "imgCID",
            type: "string",
          },
        ],
        internalType: "struct BlogFactory.Post[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uploadedPosts",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        internalType: "string",
        name: "tag",
        type: "string",
      },
      {
        internalType: "string",
        name: "postTitle",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "string",
        name: "imgCID",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export { contractAddress, contractAbi };
