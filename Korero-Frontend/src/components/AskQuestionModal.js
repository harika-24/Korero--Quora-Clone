
import {React ,useState } from 'react'
import { Modal } from "react-responsive-modal";
import {  selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from 'react-avatar';
import axios from "axios";
import { Form } from 'react-bootstrap';
const QuestionModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputUrl, setInputUrl] = useState("");
    const [question, setQuestion] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleSubmit = async () => {
        if (question !== "") {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const body = {
            questionName: question,
            questionUrl: inputUrl,
            user: user,
          };
          await axios
            .post("/api/questions", body, config)
            .then((res) => {
              console.log(res.data);
              alert(res.data.message);
              window.location.href = "/";
            })
            .catch((e) => {
              console.log(e);
              alert("Error in adding question");
            });
        }
      };
  

    return(
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
          >
            <div className="modal-title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal-info">
              <Avatar src={user?.photo} className="avatar" size= {30} round = {true} />
              <div className="modal-scope">
              <span class="material-icons">people</span>
                <p>Public</p>
                <span class="material-icons">expand_more</span>
              </div>
            </div>
            <div className="modal-Field">
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
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
                {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="displayimage"
                  />
                )}
              </div>
            </div>
            <div className="modal-buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSubmit} type="submit" className="add">
                Add Question
              </button>
            </div>
          </Modal>
    )

}

export default QuestionModal;
