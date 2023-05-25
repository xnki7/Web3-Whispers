// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract BlogFactory{

    uint id = 0;

    struct Post{
        uint id;
        address author;
        string tag;
        string postTitle;
        uint timestamp;
        string content;
        // uint likeCount;
    }

    mapping(address=>mapping(uint=>bool)) isLiked; 
    mapping(uint=>uint) likeCount; 

    // mapping(address => bool) didLike;
    //     address[] likersAddresses;

    Post[] public uploadedPosts;

    function createBlogPost(
        string memory _postTitle,
        string memory _tag,
        string memory _content
    ) public{
        Post memory newPost = Post(id, msg.sender, _tag, _postTitle, block.timestamp, _content);
        uploadedPosts.push(newPost);
        likeCount[id] = 0;
        id++;
    }

    function likePost(uint _postId) public{
        require(isLiked[msg.sender][_postId] == false, "You have already liked the post");
        likeCount[_postId]++;
        isLiked[msg.sender][_postId] = true;
    }

    function getUploadedPosts() public view returns (Post[] memory){
        return uploadedPosts;
    } 

    function getLikes(uint _postId) public view returns(uint){
        return likeCount[_postId];
    }
}