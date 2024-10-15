import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit,onView) => {
  return [
    {
      title: " کد ویزیتور",
      dataIndex: "code",
      key: "code",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "نام ویزیتور",
      dataIndex: "fullName",
      key: "fullName",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: " شعبه",
      dataIndex: "branchName",
      key: "branchName",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: " کانال فروش",
      dataIndex: "saleChannelNames",
      key: "saleChannelNames",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, val) => (
        <>
          <Ant.Space>
            <Ant.Button
              className="text-blue-600"
              onClick={() => onEdit(val)}
              icon={<FiEdit />}
              color="default"
              variant="filled"
            />
            <Ant.Button
              onClick={() => onView(val.id)}
              className="text-sky-600"
              icon={<GrView />}
              color="primary"
              variant="filled"
            />

            <Ant.Popconfirm
              onConfirm={() => onDelete(val.id)}
              title={` برای حذف ویزیتور  "${val.fullName}" مطمئن هستید؟`}
            >
              <Ant.Button
                className="text-red-600"
                icon={<RiDeleteBin6Line />}
                color="danger"
                variant="filled"
              />
            </Ant.Popconfirm>
          </Ant.Space>
        </>
      ),
    },
  ];
};

export default columns;
