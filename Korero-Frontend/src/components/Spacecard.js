import React from "react";
import { Card,Button } from "react-bootstrap";
import './css/NavigationPanel.css';
import { Accordion } from "react-bootstrap";
const Spacecard = ({space,userSpaces,addFavoriteSpace,deleteFavoriteSpace}) =>{
    const handleClick =(event)=>{
        if(event.currentTarget.innerHTML==="Leave"){
            deleteFavoriteSpace(space._id)
        }else{
            addFavoriteSpace(space._id)
        }

    }
    return(
        <Card className="moviesListCard">
            
        <Card.Img className="smallPoster" src = {space.imageURL+"25px45"} onError={(e) => {
                e.target.onerror = null; // prevents looping
                e.target.src="/images/noposter.jpg"}} />
        <Card.Body>
            <Card.Title>{space.spaceTitle}</Card.Title>
            <Accordion>
                <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <span class="material-icons">more_horiz</span>
                </Accordion.Header>
                <Accordion.Body>{space.spaceDescription}</Accordion.Body>
                </Accordion.Item>
                </Accordion>
                <Button variant="primary" onClick={handleClick}>{userSpaces.includes(space._id)? "Leave":"Join"}</Button>
                 
            
        </Card.Body>
        </Card>

    )
}

export default Spacecard;