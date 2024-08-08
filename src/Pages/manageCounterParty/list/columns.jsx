import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { TbLockOpen, TbLock } from "react-icons/tb";
import { CgMoreVertical } from "react-icons/cg";

const columns = (onDelete, onEdit, onView, onBlock) => {
  const getMenuItems = (val) => [
    {
      key: '1',
      label: (
        <Ant.Tooltip placement="right" title={'ویرایش'}>
          <a onClick={() => onEdit(val)}><FiEdit className="text-blue-600" /></a>
        </Ant.Tooltip>
      ),
    },
    {
      key: '2',
      label: (
        <Ant.Tooltip placement="right" title={"وضعیت اعتبار طرف حساب"}>
          <a onClick={() => onBlock(val)}>{(val.isBlocked === true && <TbLock className="text-red-600" />) || <TbLockOpen className="text-green-600" />} </a>
        </Ant.Tooltip>
      ),
    }
  ]


  return [
    {
      title: "کد",
      dataIndex: "code",
      key: "code",
      width: 80,
      align: "center",
      className: "text-xs sm:text-sm",

    },
    {
      title: "نوع طرف حساب",
      dataIndex: "counterpartyTypeTitle",
      key: "counterpartyTypeTitle",
      width: 70,
      className: "text-xs sm:text-sm",
      sorter: (a, b) =>
        a.counterpartyTypeTitle.localeCompare(b.counterpartyTypeTitle),
    },
    {
      title: "عنوان طرف حساب",
      dataIndex: "counterpartyTitle",
      key: "counterpartyTitle",
      width: 200,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.counterpartyTitle.localeCompare(b.counterpartyTitle),
    },
    {
      title: "شناسه/کد ملی",
      dataIndex: "legalEntityIdentity",
      key: "legalEntityIdentity",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => {
        return (
          <>
            {(record.counterpartyTypeId == 1 && record.nationalCode) && `${record.nationalCode}`}
            {record.counterpartyTypeId == 2 && `${record.legalEntityIdentity}`}
          </>
        )
      }
    },
    {
      title: "کد اقتصادی",
      dataIndex: "economicCode",
      key: "economicCode",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      align: "center",
      fixed: "right",
      className: "text-xs sm:text-sm",
      render: (text, val) => (
        <>
          <Ant.Dropdown
            menu={{
              items: getMenuItems(val),
            }}
            placement="bottom"
            arrow
          >
            <Ant.Button
              onClick={() => { }}
              className="text-blue-600"
              icon={<CgMoreVertical />}
              type="text"
            />
          </Ant.Dropdown>
          <Ant.Button
            onClick={() => onView(val.id)}
            className="text-sky-600"
            icon={<GrView />}
            type="text"
          />
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.id)}
            title={`برای حذف  "${val.counterpartyTitle}" مطمئن هستید؟`}
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
