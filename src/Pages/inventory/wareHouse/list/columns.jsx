import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { CgMoreVertical } from "react-icons/cg";
import { IoIosLink } from "react-icons/io";
import { GrView } from "react-icons/gr";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit, onConnection,onView ) => {
  const getMenuItems = (val) => [
    {
      key: "1",
      label: (
        <Ant.Tooltip placement="right" title="ویرایش">

          <a onClick={() => onEdit(val)}><FiEdit  className="text-blue-600"/></a>
        </Ant.Tooltip>
      ),
    },
    {
      key: "2",
      label: (
        <Ant.Tooltip title="تخصیص کالا به انبار">
             <a onClick={() => onConnection(val)}><IoIosLink  className="text-violet-600"/></a>

        </Ant.Tooltip>
      ),
    },
  ];

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
      render: (text, record, index) => {
        return (
          <>
            <Ant.Space>
              <Ant.Dropdown
                menu={{
                  items: getMenuItems(record),
                }}
                placement="bottom"
                arrow
              >
                <Ant.Button
                  onClick={() => {}}
                  className="text-blue-600"
                  icon={<CgMoreVertical />}
                  color="default"
                  variant="filled"
                />
              </Ant.Dropdown>
              <Ant.Button
                onClick={() => onView(record?.id)}
                className="text-sky-600"
                icon={<GrView />}
                color="primary"
                variant="filled"
              />
              <Ant.Popconfirm
                onConfirm={() => onDelete(record?.id)}
                title={` برای حذف   "${record?.title}" مطمئن هستید؟`}
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
        );
      },
    },
  ];
};

export default columns;
