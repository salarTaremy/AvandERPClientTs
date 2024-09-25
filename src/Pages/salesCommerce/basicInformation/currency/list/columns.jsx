import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit) => {
  return [
    {
      title: "کد",
      dataIndex: "id",
      key: "code",
      width: 80,
      align: 'center',
      className: "text-xs sm:text-sm",
    },
    {
      title: "نام ",
      dataIndex: "title",
      key: "title",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "نام فارسی ",
      dataIndex: "persianTitle",
      key: "persianTitle",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.title.localeCompare(b.persianTitle),
    },
    {
      title: "نماد",
      dataIndex: "symbol",
      key: "symbol",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.title.localeCompare(b.symbol),
    },

    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, val) => (
        <>
          <Ant.Space >
            <Ant.Button
              className="text-blue-600"
              onClick={() => onEdit(val)}
              icon={<FiEdit />}
              color="default"
              variant="filled"
            />

            <Ant.Popconfirm
              onConfirm={() => onDelete(val.id)}
              title={`برای حذف  "${val.persianTitle}" مطمئن هستید؟`}
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
