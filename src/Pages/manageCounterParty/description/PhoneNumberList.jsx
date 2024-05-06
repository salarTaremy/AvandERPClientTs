import React from "react";
import * as Ant from "antd";
const AddressList = ({ data }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <>
            <Ant.Descriptions layout="vertical" size={"small"}>
              <Ant.Descriptions.Item label="شماره تلفن">
                {item?.phoneNumber}
              </Ant.Descriptions.Item>
              <Ant.Descriptions.Item label="شماره اصلی">
                {item?.phoneNumber && (
                  <per>{JSON.stringify(item.isMainPhoneNumber)}</per>
                )}
              </Ant.Descriptions.Item>
            </Ant.Descriptions>
          </>
        );
      })}
    </>
  );
};
export default AddressList;
