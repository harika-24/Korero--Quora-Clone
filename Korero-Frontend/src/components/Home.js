import React from "react";
import LeftPanel from "./LeftPanel";
import './css/Korero.css'
import Feed from "./Feed";
import Widget from "./Widget";

const Home = ({userFeedPosts,addNewCommentOrAnswerToPost,spaces,userSpaces,deletePost,addNewPostByUser}) =>{
  
  return (
    <div className="Korero-contents">
        <div className="Korero-content">
          <LeftPanel spaces={spaces} userSpaces={userSpaces} />
          <Feed posts = {userFeedPosts} addNewCommentOrAnswerToPost = {addNewCommentOrAnswerToPost} deletePost={deletePost}/>
          <Widget spaces={spaces} userSpaces={userSpaces}/>
        </div>
      </div>
  );
}

export default Home;