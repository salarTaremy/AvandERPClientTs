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
      align:'center',
      className:"text-xs sm:text-sm",
    },
    {
      title: "جزئیات حساب",
      dataIndex: "counterpartyTypeTitle",
      key: "counterpartyTypeTitle",
      width: 100,
      className:"text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.counterpartyTypeTitle),
    },
    {
      title: "عنوان شرکت",
      dataIndex: "companyTitle",
      key: "companyTitle",
      width: 100,
      className:"text-xs sm:text-sm",
      sorter: (a, b) => a.address.localeCompare(b.companyTitle),
    },
    {
      title: "شناسه مالیاتی",
      dataIndex: "legalEntityIdentity",
      key: "legalEntityIdentity",
      width: 100,
      className:"text-xs sm:text-sm",
    },
    {
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 100,
      className:"text-xs sm:text-sm",
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
              className="text-blue-600"
              onClick={() => onEdit(val.id)}
              icon={<FiEdit />}
              type="text"
            />
          </Ant.Space>
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.id)}
            title={`برای حذف  "${val.companyTitle}" مطمئن هستید؟`}
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
