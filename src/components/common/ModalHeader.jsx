import React from "react";
import * as Ant from "antd";

const ModalHeader = (props) => {
  return (
    <Ant.Row>
      <Ant.Col span={24}>
        <Ant.Space>
          <span className="relative inset-y-1">{props.icon}</span>
          <strong >{props.title} {props.children} </strong>
        </Ant.Space>
        <Ant.Divider />
      </Ant.Col>
    </Ant.Row>
  );
};
export default ModalHeader;
