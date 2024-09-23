import React from "react";
import PropTypes from "prop-types";
import * as Ant from "antd";
import * as defaultValues from "@/defaultValues";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const getDocumentTypeColor = (documentTypeNature) => {
  switch (documentTypeNature) {
    case 1:
      return "green";
    case -1:
      return "red";
    default:
      return "default";
  }
};

export const columns = (onDelete, onEdit, onView, onViewCounterparty) => {
  return [
    {
      title: "شماره برگه",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      sorter: true,
      width: 100,
    },
    {
      title: "نوع برگه",
      dataIndex: "documentType",
      key: "documentType",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
      render: (text, record, index) => {
        return (
          <Ant.Tag
            bordered={false}
            color={getDocumentTypeColor(record.inventoryDocumentTypeNature)}
          >
            {record.documentType}
          </Ant.Tag>
        );
      },
    },
    {
      title: "نام انبار",
      dataIndex: "warehouseName",
      key: "warehouseName",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "نام انبار مقابل",
      dataIndex: "oppositeWarehouseName",
      key: "oppositeWarehouseName",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "طرف حساب",
      dataIndex: "counterpartyTitle",
      key: "counterpartyId",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 400,
      render: (text, record, index) => (
        <Ant.Typography.Link
          onClick={() => onViewCounterparty(record.counterpartyId)}
        >
          {record.counterpartyTitle}
        </Ant.Typography.Link>
      ),
    },
    {
      title: "زمان صدور",
      dataIndex: "issueDateTime",
      key: "issueDateTime",
      align: "center",
      className: "text-xs sm:text-sm",
      sorter: true,
      width: 200,
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      align: "right",
      className: "text-xs sm:text-sm",
      width: 200,
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, record, index) => {
        return (
          <>
            <Ant.Space>
              <Ant.Button
                onClick={() => onEdit(record.id)}
                className="text-blue-600"
                icon={<FiEdit />}
                type="text"
              />
              <Ant.Button
                onClick={() => onView(record.id)}
                className="text-sky-600"
                icon={<GrView />}
                type="text"
              />
              <Ant.Popconfirm
                onConfirm={() => onDelete(record.id)}
                title="حذف آیتم"
                description={`آیا از حذف برگه شماره ${record.documentNumber} مطمئن هستید؟`}
              >
                <Ant.Button
                  className="text-red-600"
                  icon={<RiDeleteBin6Line />}
                  type="text"
                />
              </Ant.Popconfirm>
            </Ant.Space>
          </>
        );
      },
    },
  ];
};

columns.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
};
