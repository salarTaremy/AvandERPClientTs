import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import * as defaultValues from "@/defaultValues";
const columns = (onDelete, onEdit) => {
  return [
    // {
    //   title: 'شناسه',
    //   dataIndex: 'id',
    //   key: 'id',
    //   width: 80,
    //   align:'center',
    //   fixed:true,
    // },
    {
      title: "نوع سند",
      dataIndex: "name",
      key: "name",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "نوع سند",
      dataIndex: "isSystematic",
      key: "isSystematic",
      width: 100,
      align: "center",
      render: (text, val) => {
        // console.log(val.isSystematic,"jjjj")
        return (
          <>

            {val.isSystematic ? (
            <Ant.Tag color="green">سیستمی</Ant.Tag>
            ) : (
              <Ant.Tag color="pink">غیر سیستمی</Ant.Tag>
            )}
          </>
        );
      },
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
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
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.id)}
            title={`برای حذف نوع سند "${val.name}" مطمئن هستید؟`}
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
