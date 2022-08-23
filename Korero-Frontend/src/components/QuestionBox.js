import {React ,useState } from 'react'
import './css/NavigationPanel.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import Avatar from 'react-avatar';
import {  Tabs ,Tab} from 'react-bootstrap';
//import 'material-icons/iconfont/material-icons.css';

import {  selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form } from 'react-bootstrap';
import { Modal } from "react-responsive-modal";
import ReactQuill from 'react-quill';
import { Dropdown } from 'react-bootstrap';
import './css/QuestionBox.css'


const QuestionBox = ({addNewPostByUser})=> {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  //const [questionVisibility, setQuestionVisibility] = useState("");
  const [postVisibility, setPostVisibility] = useState("");
  const [postDescription,setPostDescription] = useState("")
  const [postTitle, setPostTitle] = useState("");

  const handleNewQuestion =(event)=>{
    setQuestion(event.target.value)
  }

  const handlePostVisibility =(event) =>{
    console.log(event);
    setPostVisibility(event);
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
        setIsModalOpen(false);
        addNewPostByUser(post);
        
    };
  }

  const handleSubmitPost=()=>{
    if (postTitle !== "") {
       
      const post = {
        title: postTitle,
        description: postDescription,
        inputUrl: null,
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
      addNewPostByUser(post);

      
  };

  }
  return (
    <div className="questionBox">
      <div className="questionBox-body">
        <div className="questionBox-avatar">
        <Avatar src={user?.imageURL} size = {30} round= {true}/>
        </div>
        <div className="questionBox-info">
          <h5>What is your question or link?</h5>
        </div>
      </div>
      <div className="questionBox-footer">
        <div className="questionBox-footer-item">
            <span class="material-icons md-12">question_mark</span>
            <span onClick={(e)=>setIsModalOpen(true)}>Ask</span>
        </div>
        <div className="questionBox-footer-item">
            <span class="material-icons md-12">edit_note</span>
            <Link style={{textDecoration:"none",color:"white"}} to = {"/answer"}><span>Answer</span></Link>
        </div>
        <div className="questionBox-footer-item">
            <span class="material-icons md-12">create</span>
            <span onClick={(e)=>setIsModalOpen(true)}>Post</span>
        </div>
        <Modal
            open={isModalOpen}
            closeIcon={<span class="material-icons">
            close
            </span>}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
              
            }}
            classNames= "modal"
          >
            <Tabs defaultActiveKey="first">
            <Tab eventKey="first" title="Add Question">
            <div className="modal-info">
              <Avatar src={user?.imageURL} size={30} round= {true}/>
              <div className="modal-scope">
              <div>
              <span class="material-icons">people</span>
              </div>
              
              <div>
                      <Dropdown onSelect={handlePostVisibility}>
                        <Dropdown.Toggle variant="success">
                          Visibility
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey = "public">
                           Public
                          </Dropdown.Item>
                          <Dropdown.Item eventKey ="private">
                            Private
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      </div>
              </div>
            </div>
            <div className="modal-Field">
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ask a question</Form.Label>
                <Form.Control type="email" placeholder="Start your question with 'What' , 'Why', 'How', 'When' etc."  onChange={handleNewQuestion} required  />
                </Form.Group>
                </Form>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: inclue a link that gives context"
                />
           
              </div>
            </div>
            <div className="modal-buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmitQuestion} type="submit" className="add">
                Add Question
              </button>
            </div>
            </Tab>
            <Tab eventKey="second" title="Add Post">
            <div className='modal-field'>
                  <div className="modal-info">
                    <div>
                    <Avatar src={user?.imageURL} size={30} round= {true}/>
                    </div>
                    
                    <div className="modal-scope">
                      <div>
                        <span class="material-icons">people</span>
                      </div>
                      <div>
                      <Dropdown onSelect={handlePostVisibility}>
                        <Dropdown.Toggle variant="success">
                          Visibility
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey= "public">
                           Public
                          </Dropdown.Item>
                          <Dropdown.Item eventKey = "private">
                            Private
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      </div>
                      
                      
                    </div>
                  </div>
                  <div className="modal-answer">
                    <div >
                    <input
                      type="text"
                      onChange={(e) => setPostTitle(e.target.value)}
                      style={{
                        margin: "5px 0",
                        border: "1px solid lightgray",
                        padding: "10px",
                        outline: "2px solid #000",
                        width : "100%"
                      }}
                      placeholder="Post Title"
                      
                    />
                    </div>
                   
                    <div>
                    <ReactQuill
                      value={postDescription}
                      onChange={handlePostDescription}
                      placeholder="Enter here"
                    />
                    </div>
          
                   
                  </div>

                  <div className="modal-buttons">
                    <button className="cancle" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                    <button onClick={handleSubmitPost} type="submit" className="add">
                      Add Post
                    </button>
                  </div>
              
            </div>
          
            </Tab>


            </Tabs>
           
          </Modal>
      </div>  
      
       
    </div>
  );
}

export default QuestionBox;
