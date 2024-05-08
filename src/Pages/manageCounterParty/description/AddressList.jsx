import React from "react";
import { CheckOutlined, CloseOutlined, PhoneOutlined } from "@ant-design/icons";

import { FaRegAddressBook } from "react-icons/fa6";
import * as Ant from "antd";
const AddressList = ({ data }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <>
            <Ant.List itemLayout="horizontal">
              <Ant.Card size="small">
                <Ant.List.Item>
                <FaRegAddressBook   className="mx-2" />
                  {"استان:"}
                  {" "}
                  {item.provinceName}
                  {" ,"}
                  {"شهر :"}
                  {" "}
                  {item.cityName}
                  {" ,"}
                  {"آدرس :"}
                  {" "}
                  {item.address}

                  {item?.isMainAddress}{" "}
                  {item?.isMainAddress ? "( آدرس اصلی)" : ""}
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
