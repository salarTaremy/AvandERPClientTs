import React from "react";
import * as Ant from "antd";
import { UserOutlined } from "@ant-design/icons";
const columns = (getId ) => {
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
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.persianTitle),
    },
    {
      title: "عنوان انگلیسی",
      dataIndex: "name",
      key: "name",
      width: 120,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "دسترسی عملیات",
      width: 50,
      align: "center",
      className: "text-xs sm:text-sm",
      render: (text, val) => (
        <>
          <Ant.Button
            className="text-blue-600"
            onClick={() => getId(val.id)}
            icon={<UserOutlined />}
            type="text"
          />
        </>
      ),
    },
  ];
};

export default columns;
