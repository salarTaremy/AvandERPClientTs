import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { UserOutlined } from "@ant-design/icons";


const columns = (getId) => {
  return [
    {
      title: "شناسه",
      dataIndex: "id",
      key: "id",

      width: 80,
      // fixed:true,
      render: (text, record, index) => <a>{record.id}</a>,
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
      title: "دسسترسی عملیات",
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

    // {
    //   title: "عملیات",
    //   dataIndex: "operation",
    //   key: "operation",
    //   width: 100,
    //   align: "center",
    //   fixed: "right",

    //   render: (text, val) => (
    //     <>
    //       <Ant.Space direction="horizontal" size={20}>
    //         <Ant.Button
    //           onClick={() => onEdit(val)}
    //           className="text-blue-600"
    //           icon={<FiEdit />}
    //           type="text"
    //         />
    //       </Ant.Space>

    //       <Ant.Popconfirm
    //         onConfirm={() => onDelete(val.id)}
    //         title={` برای حذف تامین کننده  "${val.name}" مطمئن هستید؟`}
    //       >
    //         <Ant.Button
    //           className="text-red-600"
    //           icon={<RiDeleteBin6Line />}
    //           type="text"
    //         />
    //       </Ant.Popconfirm>
    //     </>
    //   ),
    // },
  ];
};

export default columns;
