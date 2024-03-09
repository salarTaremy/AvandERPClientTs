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
    },
    {
      title: "نام",
      dataIndex: "persianTitle",
      key: "persianTitle",
      className:"text-xs sm:text-sm",
      width: 100,
      sorter: (a, b) => a.name.localeCompare(b.persianTitle),
    },
    {
      title: "عنوان انگلیسی",
      dataIndex: "name",
      key: "name",
      width: 120,
      className:"text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "دسترسی عملیات",
      width: 50,
      align: "center",
      className:"text-xs sm:text-sm",
      render: (text, val) => (
        <>
          <UserOutlined onClick={() => getId(val.id)}  className="text-blue-600" />
        </>
      ),
    },

  ];
};

export default columns;
