import React from "react";
import "./css/LeftPanel.css";
import UserSpaceList from "./UserSpaceList";

const LeftPanel = ({spaces,userSpaces}) => {
  return (
    <div className="LeftPanel">
      <UserSpaceList spaces={spaces} userSpaces={userSpaces}/>
    </div>
  );
}

export default LeftPanel;