import React from "react";
import * as Ant from "antd";
const AddressList = ({ data }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <>
            <Ant.Descriptions layout="vertical" size={"small"}>
              <Ant.Descriptions.Item label="نام استان">
                {item.provinceName}
              </Ant.Descriptions.Item>
              <Ant.Descriptions.Item label="نام شهر">
                {item.cityName}
              </Ant.Descriptions.Item>
              <Ant.Descriptions.Item label="آدرس">
                {item.address}
              </Ant.Descriptions.Item>
              {/* <Ant.Descriptions.Item label="آدرس اصلی">
                <per>{JSON.stringify(item.isMainAddress)}</per>
              </Ant.Descriptions.Item> */}
            </Ant.Descriptions>
            {/* <AiOutlinePhone /> {item.accountNumber} */}
          </>
        );
      })}
    </>
  );
};
export default AddressList;
