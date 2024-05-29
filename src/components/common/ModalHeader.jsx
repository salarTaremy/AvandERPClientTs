import React from "react";
import * as Ant from "antd";

const ModalHeader = (props) => {
  return (
    <Ant.Row>
      <Ant.Col span={24}>
        {props.icon}
        <Ant.Typography><strong>{props.title}</strong></Ant.Typography>
        <Ant.Divider/>
      </Ant.Col>
    </Ant.Row>
  );
};
export default ModalHeader;
