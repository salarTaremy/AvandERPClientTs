import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiEdit, FiCalendar, FiClock } from "react-icons/fi";
import { LuFolderOpen } from "react-icons/lu";
import { GrAddCircle } from "react-icons/gr";
import { CgMoreVertical } from "react-icons/cg";
import * as defaultValues from "@/defaultValues";

const getStateColor = (stateId) => {
  switch (stateId) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "green";
    case 4:
      return "blue";
    default:
      return "black";
  }
};
const getTypeColor = (typeId) => {
  switch (typeId) {
    case 1:
      return "green";
    case 2:
      return "blue";
    case 3:
      return "pink";
    case 4:
      return "pink";
    case 5:
      return "gray";
    default:
      return "black";
  }
};

export const columns = (onDelete, onEdit, onView, addItem) => {
  const getMenuItems = (record) => [
    {
      key: '1',
      label: (
        <Ant.Tooltip placement="right" title={`ویرایش سند  (${record.inflectionNumber})`}>
          <a onClick={() => onEdit(record.id)}><FiEdit className="text-blue-600" /></a>
        </Ant.Tooltip>
      ),
    },
    {
      key: '2',
      label: (
        <Ant.Tooltip placement="right" title={`گشایش سند  (${record.inflectionNumber})`}>
          <a onClick={() => addItem(record.id)}><LuFolderOpen className="text-purple-600" /></a>
        </Ant.Tooltip>
      ),
    }
  ]


  return [
    {
      title: "شماره",
      dataIndex: "id",
      key: "id",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "شماره عطف",
      dataIndex: "inflectionNumber",
      key: "inflectionNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "شماره فرعی",
      dataIndex: "subNumber",
      key: "subNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "شماره روزانه",
      dataIndex: "dailyNumber",
      key: "dailyNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "تاریخ",
      // title: 'تاریخ/زمان ثبت',
      dataIndex: "persianDateTilte",
      key: "persianDateTilte",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
      render: (text, record, index) => (
        <>
          {`${record.persianDateTilte}`}
        </>
      ),
    },
    {
      title: "شعبه صادر کننده",
      dataIndex: "branchName",
      key: "branchName",
      className: "text-xs sm:text-sm",
      width: 150,
    },
    {
      title: "وضعیت/نوع",
      dataIndex: "stateName",
      key: "stateName",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
      render: (text, record, index) => (
        <>
          <Ant.Tag color={getStateColor(record.stateId)} bordered={false}>
            {record.stateName}
          </Ant.Tag>
          <Ant.Tag color={getTypeColor(record.typeId)} bordered={false}>
            {record.typeName}
          </Ant.Tag>
        </>
      ),
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

                  className="text-blue-600"
                  icon={<CgMoreVertical />}
                  color="default"
                  variant="filled"
                />
              </Ant.Dropdown>
              <Ant.Button
                onClick={() => onView(record.id)}
                className="text-sky-600"
                icon={<GrView />}
                color="primary"
                variant="filled"
              />
              <Ant.Popconfirm
                onConfirm={() => onDelete(record.id)}
                title="حدف ایتم"
                description={`برای حذف سند ${record.subNumber} مورخه ${record.persianDateTilte} مطمئن هستید ؟`}
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
