import React from "react";
import * as Ant from "antd";

const CardContent = (props) => {
  const { Shadow, bordered,Height } = props;
  const cardStyle = {
    overflow: "auto",

    //  maxHeight: "20vh",
    //   minHeight: "20vh",
       maxHeight: Height ,
      minHeight: Height,
    border: bordered ?  "1px solid rgb(217 217 217 / 45%)" :"none" ,
    boxShadow: Shadow ? "0 2px 8px rgba(0, 0, 0, 0.09)" : "none",
  };

  return (
    <Ant.Card {...props} style={cardStyle} type="inner">
      {props.children}
    </Ant.Card>
  );
};

export default CardContent