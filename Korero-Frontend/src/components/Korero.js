import React from "react";
import { useState , useEffect, useCallback } from "react";
import NavigationPanel from './NavigationPanel';
import {  selectUser } from "../feature/userSlice";
import {  useSelector } from "react-redux";
import "./css/Korero.css";
import SpaceDataService from './services/space'
import UserDataService from "./services/UserDataService";
import PostDataServices from "./services/PostDataServices";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Following from "./Following"
import Answer from "./Answer";
import Spaces from "./Spaces";
import About from "./About"


const  Korero = ()=>{



  const user = useSelector(selectUser);
  const[spaces,setSpace] = useState([])
  const[users,setUsers] = useState([])
  const [newPostAdded,setNewPostAdded] = useState();
  const [isNewPostAdded,setIsNewPostAdded] = useState(false);
  const[userFeedPosts,setUserFeedPosts] = useState([]);
  const [editedPost,setEditedPost] = useState();
  const [isPostEdited,setIsPostEdited] = useState(false);

  const [userInfo,setUserInfo] = useState();
  const [userFound,setUserFound] = useState(false)
  const [isNewUserAdded,setIsNewUserAdded] = useState(false)
  const [userSpaces,setUserSpaces] = useState([])
  const [isFavoriteSpaceUpdated,setIsFavoriteSpaceUpdated]=useState(false);

  const [userFollowing,setUserFollowing] = useState([]);
  const [isFollowingUpdated,setIsfollowingUpdated] = useState(false);
  const [postDeleted,setPostDeleted] = useState(false);
  const [deletedPostId,setDeletedPostId] = useState("")
  const [allUserPosts,setAllUserPosts] = useState([]);




  const deletePost=(postId)=>{
    setDeletedPostId(postId);
    setPostDeleted(true);
  }

  const addFavoriteSpace =(spaceId)=>{
    setIsFavoriteSpaceUpdated(true);
    setUserSpaces([...userSpaces,spaceId])
  }

  const deleteFavoriteSpace =(spaceId)=>{
    setIsFavoriteSpaceUpdated(true);
    setUserSpaces(userSpaces.filter(f=>f !==spaceId));
  }

  const addFollowing =(userId)=>{
    setIsfollowingUpdated(true);
    setUserFollowing([...userFollowing,userId])
  }

  const deleteFollowing =(userId)=>{
    setIsfollowingUpdated(true);
    setUserFollowing(userFollowing.filter(f=>f !==userId));
  }

  const addUserToCollection = useCallback(()=>{
    const data = {
      user : user,
      upComments : [],
      downComments : [],
      upPosts : [],
      downPosts : [],
      upAnswers : [],
    downAnswers : [],
      favSpaces : [],
      Following :[]
    }
    UserDataService.addUser(data)
    .then(Response=>{
        
    })
    .catch(e=>{
      console.log(e);
    })
    
  },[])


  const getUserMetaData = useCallback ((userId)=>{
    UserDataService.getUser(userId)
    .then(Response=>{
        if(Response.data){
          setUserInfo(Response.data);
          setUserSpaces(Response.data.favSpaces);
          setUserFollowing(Response.data.following)
          setUserFound(true);  
        }else {
          setUserFound(false)
          const data = {
            user : user,
            upComments : [],
            downComments : [],
            upPosts : [],
            downPosts : [],
            upAnswers : [],
          downAnswers : [],
            favSpaces : [],
            Following :[]
          }
          setUserInfo(data);
        }
        
    })
    .catch(e=>{
     
      console.log(e);
    })
  },[])
  const addNewPostByUser =(newPost) =>{
    setNewPostAdded(newPost);
    setIsNewPostAdded(true);
  }
  const addNewCommentOrAnswerToPost =(editedPost)=>{
    setEditedPost(editedPost);
    setIsPostEdited(true)
  }

  const updatePostInfo = useCallback((post)=>{
    PostDataServices.updatePost(post)
    .then(Response=>{
      
    })
    .catch(e=>{

      console.log(e);
    })
  
  },[])


  const addNewPost = useCallback((newPostAdded)=>{
    PostDataServices.addPost(newPostAdded)
    .then(Response=>{
      
    })
    .catch(e=>{

      console.log(e);
    })
  
  },[])

  

  const updateUserInformationInCollection = useCallback((data)=>{
    UserDataService.updateUser(data)
    .then(Response=>{
      
    })
    .catch(e=>{

      console.log(e);
    })
  
  },[])



  const deletePostFromCollection = useCallback((postId)=>{
    PostDataServices.deletePost(postId)
    .then(Response=>{
      
    })
    .catch(e=>{

      console.log(e);
    })
  
  },[])




  useEffect(()=>{
    if(user && postDeleted){
        setPostDeleted(false);
        console.log(1);
        deletePostFromCollection(deletedPostId)
    }
  },[deletedPostId])


/**                 */
  useEffect(()=>{
    console.log(2);
    if(user){
      PostDataServices.getUserPosts(user._id)
      .then(Response => {
          
            if(Response.data){
              setAllUserPosts(Response.data)
            }

         

      })
      .catch(e=>{
       
          console.log(e);
      });
  }},[user,postDeleted,newPostAdded,editedPost])


  useEffect(()=>{
    console.log(3);
    if(user && isFollowingUpdated){
        setIsfollowingUpdated(false);
        const data = JSON.parse(JSON.stringify(userInfo));
        data.following = userFollowing;
        updateUserInformationInCollection(data)
    }
  },[userFollowing])
  
  useEffect(()=>{
    console.log(4);
    if(user && isFavoriteSpaceUpdated){
        setIsFavoriteSpaceUpdated(false);
        const data = JSON.parse(JSON.stringify(userInfo));
        data.favSpaces = userSpaces;
        updateUserInformationInCollection(data)
    }
  },[userSpaces])


  useEffect(()=>{  
    console.log(5);
    if(user && isPostEdited){
      updatePostInfo(editedPost)
      setIsPostEdited(false)
    }},[editedPost,updatePostInfo]);


  useEffect(()=>{
    console.log(6);
    if(user && !isNewUserAdded && !userFound){
      getUserMetaData(user._id);
    }
  },[user])


  useEffect(()=>{
    console.log(7);
      if(user && !userFound){
        addUserToCollection();
        setIsNewUserAdded(true);
      }
  },[userFound])



    useEffect(()=>{  
      console.log(8);
      if(user && isNewPostAdded){
        addNewPost(newPostAdded)
        setIsNewPostAdded(false)
      }},[newPostAdded,addNewPost]);
  


    useEffect(()=>{
      console.log(9);  
      if(user){
        PostDataServices.getUserFeed(user._id)
        .then(Response => {
            
              if(Response.data){
                setUserFeedPosts(Response.data)
              }
  
           
  
        })
        .catch(e=>{
         
            console.log(e);
        });
      }},[user,editedPost,newPostAdded,postDeleted]);









  useEffect(()=>{
    console.log(10);  
    if(user){
      SpaceDataService.getAllSpaces()
      .then(Response => {
          
          
          setSpace(Response.data);
          console.log( "All Spaces :"+Response.data);
         

      })
      .catch(e=>{
       
          console.log(e);
      });
    }},[user]);
    useEffect(()=>{  
      console.log(11);
      if(user){
        UserDataService.getAllUsers()
        .then(Response => {
            
            
            setUsers(Response.data);
            console.log( "All Users :"+Response.data);
           
  
        })
        .catch(e=>{
         
            console.log(e);
        });
      }},[user,isNewUserAdded]);


    return (
      <div className="Korero">
        <NavigationPanel addNewPostByUser = {addNewPostByUser} />
        <Routes>
          <Route exact path={"/"} element ={<Home 
            userFeedPosts={userFeedPosts} 
            addNewCommentOrAnswerToPost = {addNewCommentOrAnswerToPost}
            spaces={spaces}
            userSpaces={userSpaces}
            deletePost={deletePost}
            allUserPosts={allUserPosts}
            />}/>
          <Route exact path={"/home"} element ={<Home 
            userFeedPosts={userFeedPosts} 
            addNewCommentOrAnswerToPost = {addNewCommentOrAnswerToPost}
            spaces={spaces}
            userSpaces={userSpaces}
            deletePost={deletePost}
            allUserPosts={allUserPosts}
            />}/>
          <Route exact path={"/following"} element ={<Following users = {users} addFollowing={addFollowing} deleteFollowing={deleteFollowing} userFollowing={userFollowing} />}/>
          <Route exact path={"/answer"} element ={<Answer
          userFeedPosts={userFeedPosts} addNewCommentOrAnswerToPost = {addNewCommentOrAnswerToPost} 
          deletePost = {deletePost} userFollowing={userFollowing} allUserPosts={allUserPosts}/>}/>
          <Route exact path={"/spaces"} element ={<Spaces spaces={spaces} userSpaces={userSpaces} addFavoriteSpace={addFavoriteSpace} deleteFavoriteSpace = {deleteFavoriteSpace}/>}/>
          <Route exact path={"/about"} element ={<About/>}/>
            
  
    </Routes>

  
        
      </div>
    );
  }
  
  export default Korero;
  