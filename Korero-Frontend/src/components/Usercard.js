import React from "react";
import { Card,Button } from "react-bootstrap";

import './css/NavigationPanel.css';
const Usercard = ({user,addFollowing,deleteFollowing,userFollowing}) =>{
    const handleClick =(event)=>{
        if(event.currentTarget.innerHTML==="Unfollow"){
            deleteFollowing(user._id)
        }else{
            addFollowing(user._id)
        }

    }
    return(
        <Card className="moviesListCard">
            
        <Card.Img className="smallPoster" src = {user.user.imageURL+"25px45"} onError={(e) => {
                e.target.onerror = null; // prevents looping
                e.target.src="/images/noposter.jpg"}} />
        <Card.Body>
            <Card.Title>{user.user.name}</Card.Title>
            <Button variant="primary" onClick={handleClick}>{userFollowing.includes(user._id)? "Unfollow":"Follow"}</Button>   
            
        </Card.Body>
        </Card>

    )
}

export default Usercard;