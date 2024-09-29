import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import * as defaultValues from "@/defaultValues";
const getDocumentTypeColor = (documentTypeNature) => {
  switch (documentTypeNature) {
    case 1:
      return "green";
    case -1:
      return "red";
  }
};
const columns = () => {
  return [
    {
      title: "شماره برگه",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
      width: 50,
      className: "text-xs sm:text-sm",
    },
    {
      title: "تاریخ ثبت",
      dataIndex: "issueDate",
      key: "issueDate",
      align: "center",
      width: 80,
      className: "text-xs sm:text-sm",
      render: (text, record) => `${record.issueDate},${record.issueTime.substr(0,8)}`,
    },
    {
      title: "کد محصول",
      dataIndex: "productCode",
      key: "productCode",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: "نوع برگه",
      dataIndex: "inventoryDocumentTypeName",
      key: "inventoryDocumentTypeName",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: "ماهیت",
      dataIndex: "inventoryDocumentTypeName",
      key: "inventoryDocumentTypeName",
      width: 50,
      className: "text-xs sm:text-sm",
      align: "center",
      render: (text, record, index) => {
        return (
          <Ant.Tag
            bordered={false}
            color={getDocumentTypeColor(record?.documentTypeNature)}
          >
            {record?.documentTypeNature === 1 ? "IN" : "OUT"}
          </Ant.Tag>
        );
      },
    },
    {
      title: "سری ساخت",
      dataIndex: "batchNumber",
      key: "batchNumber",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: "تعداد",
      dataIndex: "quantity",
      key: "quantity",
      width: 50,
      className: "text-xs sm:text-sm",
    },
    {
      title: "مانده",
      dataIndex: "balance",
      key: "balance",
      width: 50,
      className: "text-xs sm:text-sm",
    },
  ];
};

export default columns;
