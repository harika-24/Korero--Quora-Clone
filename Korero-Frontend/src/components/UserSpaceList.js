
import React from "react";
import { Link } from "react-router-dom";
import "./css/UserSpaceList.css";

const UserSpaceList = ({spaces,userSpaces}) =>{
  return (
    <div className="UserSpaceList">
       <div className="UserSpace">
       <span class="material-icons md-16"> add</span>
        <span className="text">Your Spaces</span>
      </div>
      {spaces.map((space)=>{
        return(
        userSpaces.includes(space._id) &&  <div className="UserSpace">
        
        <img
          src="https://qphs.fs.quoracdn.net/main-thumb-t-930-100-cbbsbwijdhpyzlpipejvqpiijhhoaday.jpeg"
          alt=""
        />
        <span className="text">{space.spaceTitle}</span>
      </div>
        )
      })}
      <div className="UserSpace">
        <span class="material-icons md-16"> explore</span>
        <Link style ={{textDecoration:"none",color:"white"}} to={"/spaces"}><span className="text"> Discover Spaces</span></Link>
      </div>
      <hr />
      <Link  style ={{textDecoration:"none",color:"white"}} to = {"/about"}><span class>About The Team </span></Link>
    </div>
  );
}

export default UserSpaceList;