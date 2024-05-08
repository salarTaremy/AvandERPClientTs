import React from "react";
import * as Ant from "antd";
import { CheckOutlined, PhoneOutlined } from "@ant-design/icons";
const AddressList = ({ data }) => {
  return (
    <>


      {data?.map((item) => {
        return (
          <>
            <Ant.List itemLayout="horizontal">
              <Ant.Card size="small">
                <Ant.List.Item>
                  <PhoneOutlined className="mx-2" />
                  {item?.phoneNumber}{" "}
                  {item?.isMainPhoneNumber ? "(شماره تماس اصلی)" : ""}
                </Ant.List.Item>
              </Ant.Card>
            </Ant.List>
          </>
        );
      })}
    </>
  );
};
export default AddressList;
