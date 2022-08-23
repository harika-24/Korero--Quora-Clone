import React from "react";
import { Row,Col } from "react-bootstrap";
import Spacecard from "./Spacecard";

import Usercard from "./Usercard";


const Spaces = ({spaces,userSpaces,addFavoriteSpace,deleteFavoriteSpace}) =>{
  
 


  return (
    <div >
        <div className="Korero-contents">
          <div className="Korero-content">
          <Row className = "movieRow">
                    {spaces.map((space)=>{
                        return(
                            <Col key = {space._id}>
                                <Spacecard space = {space} userSpaces={userSpaces} addFavoriteSpace={addFavoriteSpace} deleteFavoriteSpace={deleteFavoriteSpace}/>
                            </Col>
                        )
                    })}
                </Row>
        </div>
        </div>
        
    </div>
  );
}

export default Spaces;