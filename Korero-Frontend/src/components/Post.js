import Avatar from "react-avatar";
import React, { useState } from "react";
import "./css/Post.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import ReactHtmlParser from "html-react-parser";
import { Form } from "react-bootstrap";



const LastSeen = ({ date })=> {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}
const  Post = ({ post,addNewCommentOrAnswerToPost,deletePost}) =>{

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isEditingMode,setEditingMode] = useState(false);
  const user = useSelector(selectUser);
  const Close = <span class = "material-icons">close</span>
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  //const [questionVisibility, setQuestionVisibility] = useState("");
  const [postVisibility, setPostVisibility] = useState(post.visibility);
  const [postDescription,setPostDescription] = useState("")
  const [postTitle, setPostTitle] = useState("");


  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleDeletePost=()=>{
    deletePost(post._id)
  }
  // console.log(answer);

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const latestAnswer = {
        date : new Date(),
        body : answer,
        user : user,

      }
      post.answers.push(latestAnswer);
      setIsModalOpen(false);
      addNewCommentOrAnswerToPost(post);
      
    }
  };

  const handlEditedQuestion =(event)=>{
    setQuestion(event.target.value)
  }

 

  const handlePostDescription =(value)=>{
    setPostDescription(value)
  }


  const handleSubmitQuestion = async () => {
      if (question !== "") {
       
        const post = {
          title: question,
          description: null,
          inputURL: inputUrl,
          upvotes : 0,
          downvotes : 0,
          shares:0,
          visibility:postVisibility,
          isPost : false,
          user:user,
          userId : user._id,
          comments:[],
          answers :[],


        };
        addNewCommentOrAnswerToPost(post);
        
    };
  }

  const handleSubmitPost=()=>{
    if (postTitle !== "") {
       
      const post = {
        title: postTitle,
        description: postDescription,
        inputUrl: inputUrl,
        upvotes : 0,
        downvotes : 0,
        shares:0,
        visibility:postVisibility,
        isPost : true,
        user:user,
        userId : user._id,
        comments:[],
        answers :[],
      

      };
      setIsModalOpen(false);
      addNewCommentOrAnswerToPost(post);

      
  };
}
  return (
    <div className="post">
      <div className="post-info">
        <Avatar src={post.user.imageURL} alt = './image/dummy-avatar.png' size="40" round = {true} />
        <span className = "post-info-username">{post?.user?.name}</span>
        { <small> <LastSeen date={new Date(post?.date)} /> </small>}
        <div className="closeButton">
        
        {(post.user._id===user._id) &&<span className="material-icons " onClick={handleDeletePost}>close</span>}


        
        
        </div>
        
      </div>
      <div className="post-body">
        <div className="post-question">

          <div><h3>{post?.title}</h3></div>
          {post?.isPost &&   <div>{post?.description}</div> }
          {!post.isPost &&  <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="post-btnAnswer"
          >
            Answer
          </button>}
          
          <Modal
            open={isModalOpen}
            closeIcon={Close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal-question">
              <h1>{post?.title}</h1>
              <p>
                asked by <span className="name">{post?.user?.name}</span> on{" "}
                <span className="name">
                  {new Date(post?.date).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal-answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal-button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        <div>
        {(post.inputURL !== "" && post.inputURL) && <img src={post.inputURL} />}
        </div>
        
      </div>
      {/*<div className="post-footer">
        <div className="post-footerAction">
          <span class = "material-icons">arrow_upward</span>
          <span class = "material-icons">arrow_downward</span>
        </div>
        <span class = "material-icons">repeat</span>
        <span class = "material-icons">chat_bubble</span>
        <div className="post-footerLeft">
        <span class = "material-icons">share</span>
        <span class = "material-icons">more_horiz</span>
        </div>
      </div>*/}
      {!post.isPost && <p
        style={{
          color: "white",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
          
        }}
      >
        {post.answers?.length || 0} Answer(s)
      </p>}

      <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post-answer"
      >
        {post.answers.length >0 && post?.answers?.map((_a,index) => (
          <>
            <div
              key = {index}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                //borderTop: "1px solid lightgray",
              }}
              className="post-answer-container"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered"
              >
                <div className="post-answer-userinfo">
                  <div style={{margin:"5px"}}>
                  <Avatar src={_a.user.imageURL} size = {30} round = {true}/>
                  </div>
                  
                  <div style={{margin:"5px"}}>
                    {_a?.user?.name}
                  </div>
                    
                  <div style={{margin:"5px"}}> 
                    
                      {<LastSeen date={new Date(_a.date)} />}
                  
                  </div>
                 
                </div>
                
                
                
              </div>
              <div className="post-answer">{ReactHtmlParser(_a?.body)}</div>
            </div>
          </>
                ))}
      </div>
    </div>
  );
}

export default Post;