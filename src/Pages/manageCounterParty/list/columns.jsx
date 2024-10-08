import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { TbLockOpen, TbLock } from "react-icons/tb";
import { CgMoreVertical } from "react-icons/cg";
import * as defaultValues from "@/defaultValues";
import { COUNTERPARTY_TYPE } from "@/staticValues";

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
      title: "شناسه ملی/کد ملی/کد فراگیر",
      dataIndex: "legalEntityIdentity",
      key: "legalEntityIdentity",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => {
        return (
          <>
            {(record.counterpartyTypeId == COUNTERPARTY_TYPE.Individual && record.nationalCode) && `${record.nationalCode}`}
            {(record.counterpartyTypeId == COUNTERPARTY_TYPE.ForeignIndividual && record.fidaCode) && `${record.fidaCode}`}
            {(record.counterpartyTypeId == COUNTERPARTY_TYPE.Institution || record.counterpartyTypeId == COUNTERPARTY_TYPE.CivicParticipation) && `${record.legalEntityIdentity}`}
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
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, val) => (
        <>
          <Ant.Space>
            <Ant.Dropdown
              menu={{
                items: getMenuItems(val),
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
              onClick={() => onView(val.id)}
              className="text-sky-600"
              icon={<GrView />}
              color="primary"
              variant="filled"
            />
            <Ant.Popconfirm
              onConfirm={() => onDelete(val.id)}
              title={`برای حذف  "${val.counterpartyTitle}" مطمئن هستید؟`}
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
