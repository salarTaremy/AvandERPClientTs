import React from "react";
import * as Ant from 'antd'
const HeaderModal = (props) => {
  return (
    <Ant.Row>
      <Ant.Col span={24}>
        <strong>{props.title}</strong>
        <Ant.Divider> </Ant.Divider>
      </Ant.Col>
    </Ant.Row>
  );
};
export default HeaderModal;
