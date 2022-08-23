import "./css/Feed.css";
import Post from './Post'

const AnswerFeed = ({userFeedPosts,addNewCommentOrAnswerToPost,deletePost,userFollowing,allUserPosts})=> {

    
  
  return (
    <div className="feed">
      <h2 style={{color:"white"}}>All Questions asked by you</h2>
      {allUserPosts?.map((post)=>{
                        return(
                            <div>
                              <Post key = {post._id} post={post} addNewCommentOrAnswerToPost ={addNewCommentOrAnswerToPost} deletePost={deletePost}/>
                            </div>
                            
                        )
                    })}
      <br/>
      <h2 style={{color:"white"}}>All Questions asked by the people you follow</h2>
      {userFeedPosts?.map((post)=>{
                        console.log(userFollowing);
                        return(
                          
                          <div>
                              {userFollowing.includes(post.user._id) && !post.isPost && <Post key={post._id} post={post} addNewCommentOrAnswerToPost ={addNewCommentOrAnswerToPost} deletePost={deletePost}/>}
                          </div>

                           
                        )
                    })}
    </div>
    
  );
}

export default AnswerFeed;