import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { TbLockOpen, TbLock } from "react-icons/tb";

const columns = (onDelete, onEdit, onView, onBlock) => {
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
      title: "جزئیات حساب",
      dataIndex: "counterpartyTypeTitle",
      key: "counterpartyTypeTitle",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.counterpartyTypeTitle),
    },
    {
      title: "عنوان طرف حساب",
      dataIndex: "counterpartyTitle",
      key: "counterpartyTitle",
      width: 100,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.address.localeCompare(b.counterpartyTitle),
    },
    {
      title: "شناسه مالیاتی",
      dataIndex: "legalEntityIdentity",
      key: "legalEntityIdentity",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "شماره تلفن",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      align: "center",
      fixed: "right",
      className: "text-xs sm:text-sm",
      render: (text, val) => (
        <>
          <Ant.Tooltip placement="top" title={"وضعیت اعتبار طرف حساب"}>
            <Ant.Button
              className={
                (val.isBlocked === true && "text-red-600") || "text-green-600"
              }
              onClick={() => onBlock(val)}
              icon={(val.isBlocked === true && <TbLock />) || <TbLockOpen />}
              type="text"
            />
          </Ant.Tooltip>
          <Ant.Tooltip placement="top" title={"ویرایش"}>
            <Ant.Button
              className="text-blue-600"
              onClick={() => onEdit(val.id)}
              icon={<FiEdit />}
              type="text"
            />
          </Ant.Tooltip>

          <Ant.Button
            onClick={() => onView(val.id)}
            className="text-sky-600"
            icon={<GrView />}
            type="text"
          />
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
