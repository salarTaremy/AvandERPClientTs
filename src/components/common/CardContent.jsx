import React from "react";
import * as Ant from "antd";
const CardContent = (props) => {

  return (
    <>
      <Ant.Card style={{boxShadow:'none', overflow: 'auto' ,border:'none', maxHeight:'70vh',minHeight:'70vh' }} type="inner">
        {props.children}
      </Ant.Card>
    </>
  );
};

export default CardContent;
