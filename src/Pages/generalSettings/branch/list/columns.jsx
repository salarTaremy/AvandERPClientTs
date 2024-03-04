import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const columns = (onDelete, onEdit) => {
  return [
    {
      title: "کد",
      dataIndex: "id",
      key: "code",
      width: 80,
      align:'center'
    },
    {
      title: "نام شعبه ",
      dataIndex: "name",
      key: "name",
      width: 100,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "آدرس",
      dataIndex: "address",
      key: "address",
      width: 100,
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      align: "center",
      fixed: "right",

      render: (text, val) => (
        <>
          <Ant.Space direction="horizontal" size={20}>
            <Ant.Button
              className="text-blue-600"
              onClick={() => onEdit(val)}
              icon={<FiEdit />}
              type="text"
            />
          </Ant.Space>
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.id)}
            title={`برای حذف شعبه "${val.name}" مطمئن هستید؟`}
          >
            <Ant.Button
              className="text-red-600"
              icon={<RiDeleteBin6Line />}
              type="text"
            />
          </Ant.Popconfirm>
        </>
      ),
    },
  ];
};

export default columns;
