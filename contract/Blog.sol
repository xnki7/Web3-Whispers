// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract BlogFactory{

    uint id = 0;

    struct Post{
        uint id;
        address author;
        string tag;
        string postTitle;
        uint timestamp;
        string content;
        string imgCID;
        // uint likeCount;
    }
    
    struct Profile{
        address userAdd;
        string userName;
        string bio;
        string profilePicCID;
    }

    mapping(address=>mapping(uint=>bool)) isLiked; 
    mapping(uint=>uint) likeCount; 
    mapping (address => Profile) Profiles;

    // mapping(address => bool) didLike;
    //     address[] likersAddresses;

    Post[] public uploadedPosts;

    function createProfile(
        string memory _userName,
        string memory _bio,
        string memory _profilePicCID
    ) public {
        Profiles[msg.sender]=Profile(msg.sender, _userName, _bio, _profilePicCID);
    }

    function createBlogPost(
        string memory _postTitle,
        string memory _tag,
        string memory _content,
        string memory _imgCID
    ) public{
        Post memory newPost = Post(id, msg.sender, _tag, _postTitle, block.timestamp, _content, _imgCID);
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

    function getIfLiked(uint _postId) public view returns(bool){
        return isLiked[msg.sender][_postId];
    }

    function getProfile(address _add) public view returns(Profile memory){
        return Profiles[_add];
    }
}