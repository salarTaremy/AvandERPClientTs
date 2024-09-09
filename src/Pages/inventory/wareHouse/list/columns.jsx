import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit,onConnection) => {
  return [
    {
      title: "نام انبار",
      dataIndex: "title",
      key: "title",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: " نام انباردار",
      dataIndex: "warehouseKeeperName",
      key: "warehouseKeeperName",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "نوع انبار",
      dataIndex: "warehouseType",
      key: "warehouseType",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "GLN ",
      dataIndex: "gln",
      key: "gln",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "آدرس ",
      dataIndex: "address",
      key: "address",
      width: 200,
      className: "text-xs sm:text-sm",
    },
    {
      title: "کدپستی ",
      dataIndex: "postalCode",
      key: "postalCode",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "وضعیت",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => (
        <Ant.Tag
          color={(record.isActive == true && "green") || "red"}
          key={record.id}
          bordered={false}
        >
          {(record.isActive == true && "فعال ") || "  غیر فعال"}
        </Ant.Tag>
      ),
    },
    {
      title: "توضیحات ",
      dataIndex: "description",
      key: "description",
      width: 200,
      className: "text-xs sm:text-sm",
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, val) => (
        <>
          <Ant.Button
            onClick={() => onConnection(val)}
            className="text-violet-600"
            icon={<IoIosLink />}
            type="text"
          />
          <Ant.Button
            onClick={() => onEdit(val)}
            className="text-blue-600"
            icon={<FiEdit />}
            type="text"
          />
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.id)}
            title={` برای حذف   "${val.title}" مطمئن هستید؟`}
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
