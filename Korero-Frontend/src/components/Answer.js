import React from "react";
import "./css/LeftPanel.css";
import AnswerLeftPanel from "./AnswerLeftPanel";
import AnswerFeed from "./AnswerFeed";

const Answer = ({userFeedPosts,addNewCommentOrAnswerToPost,deletePost,userFollowing,allUserPosts}) =>{
  
    return (
      <div className="Korero-contents">
          <div className="Korero-content">
            <AnswerLeftPanel/>
            <AnswerFeed userFeedPosts={userFeedPosts} userFollowing ={userFollowing} 
            allUserPosts={allUserPosts} addNewCommentOrAnswerToPost={addNewCommentOrAnswerToPost}
             deletePost={deletePost}/>  
          </div>
        </div>
    );
  
}

export default Answer;