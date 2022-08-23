import QuestionBox from "./QuestionBox";
import "./css/Feed.css";
import Post from "./Post";



const Feed = ({posts,addNewCommentOrAnswerToPost,deletePost,addNewPostByUser})=> {

  
  
  return (
    <div className="feed">
      <QuestionBox addNewPostByUser={addNewPostByUser}/>
      {posts?.map((post)=>{
                        return(
                            <Post key = {post._id} post={post} addNewCommentOrAnswerToPost ={addNewCommentOrAnswerToPost} deletePost={deletePost}/>
                        )
                    })}
      
     
    </div>
  );
}

export default Feed;