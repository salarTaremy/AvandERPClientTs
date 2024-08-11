import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit,onView) => {
  return [
    {
      title: "کد",
      dataIndex: "code",
      key: "code",
      width: 50,
      className: "text-xs sm:text-sm",
      align:'center'
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "customerName",
      key: "customerName",
      width: 400,
      className: "text-xs sm:text-sm",
    },

    {
      title: "نوع طرف حساب",
      dataIndex: "counterpartyTypeTitle",
      key: "counterpartyTypeTitle",
      width: 100,
      align:'center',
      className: "text-xs sm:text-sm",
    },
    {
      title: "کدملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 80,
      align:'center',
      className: "text-xs sm:text-sm",
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
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
