import React from "react";
import * as Ant from "antd";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import { GrDocumentLocked } from "react-icons/gr";
import { CgMoreVertical } from "react-icons/cg";
import * as defaultValues from "@/defaultValues";
import { LuFolderOpen } from "react-icons/lu";

export const columns = (onDelete, onEdit, onView, onCopy, onChange, onOpen) => {
  const getMenuItems = (record) => [
    {
      key: "1",
      label: (
        <Ant.Tooltip placement="right" title={"ویرایش"}>
          <a onClick={() => onEdit(record.id)}>
            <FiEdit className="text-blue-600" />
          </a>
        </Ant.Tooltip>
      ),
    },
    {
      key: "2",
      label: (
        <Ant.Tooltip placement="right" title={"گشایش"}>
          <a onClick={() => onOpen(record.id)}>
            <LuFolderOpen className="text-purple-600" />
          </a>
        </Ant.Tooltip>
      ),
    },
    {
      key: "3",
      label: (
        <Ant.Tooltip placement="right" title={"کپی و ایجاد بخشنامه "}>
          <a onClick={() => onCopy(record.id)}>
            <FaRegCopy className="text-green-600" />
          </a>
        </Ant.Tooltip>
      ),
    },
    {
      key: "4",
      label: (
        <Ant.Popconfirm
          onConfirm={() => onChange(record.id)}
          title={`برای تغییر وضعیت "${record.title}" مطمئن هستید؟`}
        >
          <Ant.Tooltip placement="right" title={"تغییر وضعیت"}>
            <a>
              <GrDocumentLocked className={(record.isActive === true && "text-green-400") || "text-rose-600"} />
            </a>
          </Ant.Tooltip>
        </Ant.Popconfirm>
      ),
    },

  ];

  return [
    {
      title: "شناسه",
      dataIndex: "id",
      key: "id",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 50,
      render: (text, record, index) => {
        return (
          <a >
            {record.id}
          </a>
        )
      }

    },
    {
      title: "عنوان",
      dataIndex: "title",
      key: "title",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "تاریخ شروع",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
    },
    {
      title: "تاریخ پایان",
      dataIndex: "endDate",
      key: "endDate",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
    },
    {
      title: "تاریخ اجرا",
      dataIndex: "implementationDate",
      key: "implementationDate",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
    },
    {
      title: "وضعیت",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 70,
      render: (text, record, index) => {
        return (
          <>
            {record.isActive && (
              <Ant.Tag color="green" bordered={false}>
                فعال
              </Ant.Tag>
            )}
            {!record.isActive && (
              <Ant.Tag color="red" bordered={false}>
                غیرفعال
              </Ant.Tag>
            )}
          </>
        );
      },
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 200,
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
                <a>
                  <Ant.Button
                    className="text-blue-600"
                    icon={<CgMoreVertical />}
                    color="default"
                    variant="filled"
                  />
                </a>
              </Ant.Dropdown>
              <Ant.Button
                onClick={() => onView(record)}
                className="text-sky-600"
                icon={<GrView />}
                color="primary"
                variant="filled"
              />
              <Ant.Popconfirm
                onConfirm={() => onDelete(record.id)}
                title="حذف آیتم"
                description={`آیا از حذف بخشنامه "${record.title}" مطمئن هستید؟`}
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
