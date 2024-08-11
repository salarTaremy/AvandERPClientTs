import React from "react";
import * as Ant from "antd";

const CoustomContent = (props) => {
  const { shadow, bordered, height } = props;
  const cardStyle = {
    overflow: "auto",

    //  maxHeight: "20vh",
    //   minHeight: "20vh",
    maxHeight: height,
    minHeight: height,
    border: bordered ? "1px solid rgb(217 217 217 / 45%)" : "none",
    boxShadow: shadow ? "0 2px 8px rgba(0, 0, 0, 0.09)" : "none",
  };

  return (
    <Ant.Card style={cardStyle}  {...props} type="inner">
      {props.children}
    </Ant.Card>
  );
};

export default CoustomContent;
