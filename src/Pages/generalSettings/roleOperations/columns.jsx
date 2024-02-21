import React from "react";
import * as Ant from "antd";
import { UserOutlined } from "@ant-design/icons";


const columns = (getId) => {
  return [
    {
      title: "شناسه",
      dataIndex: "id",
      key: "id",
      width: 50,
      align: "center",
      // fixed:true,

    },
    {
      title: "نام",
      dataIndex: "persianTitle",
      key: "persianTitle",
      width: 100,
      sorter: (a, b) => a.name.localeCompare(b.persianTitle),
    },

    {
      title: "نام کنترل کننده",
      dataIndex: "controllerName",
      key: "controllerName",
      width: 100,
    },
    {
      title: "دسترسی عملیات",
      dataIndex: "",
      key: "",

      width: 50,
      align: "center",
      render: (text, val) => (
        <>
          <UserOutlined onClick={() => getId(val.id)}  className="text-blue-600" />
        </>
      ),
    },


  ];
};

export default columns;
