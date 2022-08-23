import React from "react";
import WidgetContent from "./WidgetContent";
import "./css/Widget.css";

const  Widget = () =>{
  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Space to follow</h3>
      </div>
        <WidgetContent />
    </div>
  );
}

export default Widget;