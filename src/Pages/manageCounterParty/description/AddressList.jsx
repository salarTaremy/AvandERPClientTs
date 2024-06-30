import React from "react";
import { CheckOutlined, CloseOutlined, PhoneOutlined } from "@ant-design/icons";
import CoustomContent from "@/components/common/CoustomContent";
import { FaRegAddressBook } from "react-icons/fa6";
import * as Ant from "antd";
const AddressList = ({ data }) => {
  return (
    <>
      <CoustomContent bordered Height="20vh">
        <Ant.List>
          {data?.map((item) => {
            return (
              <>
                <Ant.List.Item>
                  <FaRegAddressBook className="mx-2" />
                  {"استان:"} {item.provinceName}
                  {","}
                  {"شهر :"} {item.cityName}
                  {","}
                  {"آدرس :"} {item.address}
                  {item?.isMainAddress}{" "}
                  {item?.isMainAddress ? "( آدرس اصلی)" : ""}
                </Ant.List.Item>
                <Ant.List.Item>
                  <FaRegAddressBook className="mx-2" />
                  {"استان:"} {item.provinceName}
                  {","}
                  {"شهر :"} {item.cityName}
                  {","}
                  {"آدرس :"} {item.address}
                  {item?.isMainAddress}{" "}
                  {item?.isMainAddress ? "( آدرس اصلی)" : ""}
                </Ant.List.Item>
                <Ant.List.Item>
                  <FaRegAddressBook className="mx-2" />
                  {"استان:"} {item.provinceName}
                  {","}
                  {"شهر :"} {item.cityName}
                  {","}
                  {"آدرس :"} {item.address}
                  {item?.isMainAddress}{" "}
                  {item?.isMainAddress ? "( آدرس اصلی)" : ""}
                </Ant.List.Item>
              </>
            );
          })}
        </Ant.List>
      </CoustomContent>
    </>
  );
};
export default AddressList;
