import React from "react";
import * as Ant from "antd";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PhoneOutlined } from "@ant-design/icons";

export const columns = (onDelete, onEdit, onPhoneNumberAdd) => {
  return [
    {
      title: "نشانی",
      dataIndex: "address",
      key: "address",
      align: "right",
      className: "text-xs sm:text-sm",
      width: 500,
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
      title: "عملیات",
      dataIndex: "operations",
      key: "operations",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
      render: (text, value, index) => (
        <>
        <Ant.Tooltip placement="top" title={"افزودن شماره تماس"}>
            <Ant.Button
              className="text-blue-600"
              onClick={() => onPhoneNumberAdd(value.id)}
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
