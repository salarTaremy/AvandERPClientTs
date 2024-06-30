import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiEdit, FiCalendar, FiClock } from "react-icons/fi";

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

export const columns = (onDelete, onEdit, onView) => {
  return [
    {
      title: "شماره",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
    },
    {
      title: "شماره عطف",
      dataIndex: "inflectionNumber",
      key: "inflectionNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
    },
    {
      title: "شماره فرعی",
      dataIndex: "subNumber",
      key: "subNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
    },
    {
      title: "شماره روزانه",
      dataIndex: "dailyNumber",
      key: "dailyNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 50,
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
          {/* {`${record.persianDateTilte}`} <FiCalendar  /> {`${record.createTime.substring(0, 5)}`} <FiClock  />{' '} */}
          {`${record.persianDateTilte}`}
        </>
      ),
    },
    {
      title: "شعبه صادر کننده",
      dataIndex: "branchName",
      key: "branchName",
      className: "text-xs sm:text-sm",
      width: 80,
    },
    {
      title: "وضعیت",
      dataIndex: "stateName",
      key: "stateName",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
      render: (text, record, index) => (
        <Ant.Tag color={getStateColor(record.stateId)} key={record.id}>
          {record.stateName}
        </Ant.Tag>
      ),
    },
    {
      title: "نوع",
      dataIndex: "typeName",
      key: "typeName",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
      render: (text, record, index) => (
        <Ant.Tag color={getTypeColor(record.typeId)} key={record.id}>
          {record.typeName}
        </Ant.Tag>
      ),
    },
    {
      title: "عملیات",
      key: "id",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
      fixed: "right",
      render: (text, record, index) => {
        return (
          <>
            <Ant.Space>
              <Ant.Popconfirm
                onConfirm={() => onDelete(record.id)}
                title="حدف ایتم"
                description={`برای حذف سند ${record.subNumber} مورخه ${record.persianDateTilte} مطمئن هستید ؟`}
              >
                <Ant.Button
                  className="text-red-600"
                  icon={<RiDeleteBin6Line />}
                  type="text"
                />
              </Ant.Popconfirm>
              <Ant.Button
                onClick={() => onView(record.id)}
                className="text-sky-600"
                icon={<GrView />}
                type="text"
              />
              <Ant.Button
                onClick={() => onEdit(record.id)}
                className="text-blue-600"
                icon={<FiEdit />}
                type="text"
              />
            </Ant.Space>
          </>
        );
      },
    },
  ];
};
