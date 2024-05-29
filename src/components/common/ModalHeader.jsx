import React from "react";
import * as Ant from "antd";

const ModalHeader = (props) => {
  return (
    <Ant.Row>
      <Ant.Col span={24}>
        {props.icon}
        <strong className="mr-2">{props.title}</strong>
        <Ant.Divider> </Ant.Divider>
      </Ant.Col>
    </Ant.Row>
  );
};
export default ModalHeader;
