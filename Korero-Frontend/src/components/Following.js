import React from "react";
import { Row,Col } from "react-bootstrap";
import {  selectUser } from "../feature/userSlice";
import {  useSelector } from "react-redux";
import Usercard from "./Usercard";
import './css/NavigationPanel.css';

const Following = ({users,addFollowing,deleteFollowing, userFollowing}) =>{
  
  
  const loggedUser = useSelector(selectUser);

  return (
    <div >
        <div className="Korero-contents">
          <div className="Korero-content">
          <Row className = "movieRow ">
                    {users.map((user)=>{
                        return(
                            <Col key = {user._id}>
                              {user._id!=loggedUser._id &&
                                <Usercard user = {user} addFollowing={addFollowing} deleteFollowing={deleteFollowing} userFollowing={userFollowing}/>}
                            </Col>
                        )
                    })}
                </Row>
        </div>
        </div>
        
    </div>
  );
}

export default Following;