import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
const columns = (onDelete, onEdit,onView) => {
  return [
    {
      title: "نام",
      dataIndex: "firstName",
      key: "firstName",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: "نام خانوادگی",
      dataIndex: "lastName",
      key: "lastName",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: "نوع طرف حساب",
      dataIndex: "counterpartyTypeTitle",
      key: "counterpartyTypeTitle",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "کدملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 120,
      align: "center",
      fixed: "right",
      className: "text-xs sm:text-sm",
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
          <Ant.Button
            onClick={() => onView(val.id)}
            className="text-sky-600"
            icon={<GrView />}
            type="text"
          />
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.id)}
            title={`برای حذف رتبه مشتری "${val.counterpartyTypeTitle}" مطمئن هستید؟`}
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