import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
const columns = (onDelete, onEdit, onView) => {
  return [
    // {
    //   title: "شناسه",
    //   dataIndex: "id",
    //   key: "id",
    //   width: 80,
    //   fixed:true,
    //   align: "center",
    //   className:"text-xs sm:text-sm",
    // },
    {
      title: "نام",
      dataIndex: "name",
      key: "name",
      width: 100,
      className:"text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "عنوان",
      dataIndex: "persianTitle",
      key: "persianTitle",
      width: 100,
      className:"text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "محدوده نقش",
      dataIndex: "roleScopeName",
      key: "roleScopeName",
      width: 100,
      className:"text-xs sm:text-sm",
    },

    {
      title: "عنوان محدوده نقش",
      dataIndex: "roleScopePersianTitle",
      key: "roleScopePersianTitle",
      width: 100,
      className:"text-xs sm:text-sm",
    },

    {
      title: "isDenied",
      dataIndex: "isDenied",
      key: "isDenied",
      align: "center",
      width: 100,
      className:"text-xs sm:text-sm",
      render: (text, record, index) => (
        <Ant.Tag
          color={(record.isDenied == false && "green") || "red"}
          key={record.id}
        >
          {" "}
          {(record.isDenied == false && "دسترسی مجاز") || " عدم دسترسی"}{" "}
        </Ant.Tag>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      align: "center",
      fixed: "right",
      className:"text-xs sm:text-sm",
      render: (text, val) => (
        <>
          <Ant.Space direction="horizontal" size={20}>
            <Ant.Button
              onClick={() => onEdit(val)}
              className="text-blue-600"
              icon={<FiEdit />}
              type="text"
            />
          </Ant.Space>
          {/* <Ant.Button
            onClick={() => onView(val.id)}
            className="text-sky-600"
            icon={<GrView />}
            type="text"
          /> */}
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.id)}
            title={` برای حذف تامین کننده  "${val.name}" مطمئن هستید؟`}
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
