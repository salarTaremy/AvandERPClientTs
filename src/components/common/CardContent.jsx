import React from "react";
import * as Ant from "antd";
const CardContent = (props) => {
  const { Shadow, bordered } = props;
  return (
    <>
      {Shadow && (
        <Ant.Card
          {...props}
          style={{
            overflow: "auto",
            border: "none",
            maxHeight: "70vh",
            minHeight: "70vh",
          }}
          type="inner"
        >
          {props.children}
        </Ant.Card>
      )}
      {bordered && (
        <Ant.Card
        {...props}
          style={{
            boxShadow: "none",
            overflow: "auto",
            maxHeight: "70vh",
            minHeight: "70vh",
          }}
          type="inner"
        >
          {props.children}
        </Ant.Card>
      )}
    </>
  );
};

export default CardContent;
