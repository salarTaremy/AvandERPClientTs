import React from "react";
import * as Ant from "antd";

const ModalHeader = (props) => {
  return (
    <Ant.Row>
      <Ant.Col span={24}>
       <span className="relative inset-y-1">{props.icon}</span>
        <strong className="mr-1">{props.title}</strong>

        <Ant.Divider />
      </Ant.Col>
    </Ant.Row>
  );
};
export default ModalHeader;
