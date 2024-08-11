import React from "react";
import * as Ant from "antd";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PhoneOutlined } from "@ant-design/icons";
import * as defaultValues from "@/defaultValues";

export const columns = (onDelete, onEdit, onPhoneNumberAdd) => {
  return [
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "نشانی",
      dataIndex: "address",
      key: "address",
      align: "right",
      className: "text-xs sm:text-sm",
      width: 400,
      render: (text, record, index) =>
        `${record.provinceName}، ${record.cityName}، ${record.address}`,
    },
    {
      title: "کد پستی",
      dataIndex: "postalCode",
      key: "postalCode",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, value, index) => (
        <>
        <Ant.Tooltip placement="top" title={"افزودن شماره تماس"}>
            <Ant.Button
              className="text-blue-600"
              onClick={() => onPhoneNumberAdd(value)}
              icon={<PhoneOutlined />}
              type="text"
            />
          </Ant.Tooltip>
          <Ant.Tooltip placement="top" title={"ویرایش"}>
            <Ant.Button
              className="text-blue-600"
              onClick={() => onEdit(value.id)}
              icon={<FiEdit />}
              type="text"
            />
          </Ant.Tooltip>
          <Ant.Popconfirm
            onConfirm={() => onDelete(value.id)}
            title={`برای حذف  مطمئن هستید؟`}
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
