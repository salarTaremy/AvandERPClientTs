import React from "react";
import * as Ant from "antd";
const Informationccounts = () => {
  return (
    <div>
      <Ant.Row gutter={[16, 8]}>
        <Ant.Col lg={12} md={12} sm={12} xs={24}>
          <Ant.Form.Item
            rules={[
              { required: false },
              {
                max: 20,
              },
            ]}
            name={"branchCode"}
            label="کد شعبه"
          >
            <Ant.InputNumber className="w-full" allowClear showCount maxLength={20} />
          </Ant.Form.Item>
        </Ant.Col>
      </Ant.Row>
    </div>
  );
};
export default Informationccounts;
