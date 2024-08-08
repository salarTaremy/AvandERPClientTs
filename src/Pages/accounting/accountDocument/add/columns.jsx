import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import * as defaultValues from "@/defaultValues";
const column = (onDelete, onEdit) => {
  return [
 {
      title: "شماره ردیف",
      dataIndex: "rowNumber",
      key: "rowNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "نام حساب",
      dataIndex: "accountName",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "شماره مرجع",
      dataIndex: "referenceNo",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح چهار",
      dataIndex: "detailedAccountName4",
      align: "center",
      width: 200,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح پنج",
      dataIndex: "detailedAccountName5",
      align: "center",
      width: 200,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح شش",
      dataIndex: "detailedAccountName6",
      align: "center",
      width: 200,
      className: "text-xs sm:text-sm",
    },
    {
      title: "شرح ",
      dataIndex: "article",
      key: "5",
      width: 200,
      className: "text-xs sm:text-sm",
    },
    {
      title: "بدهکار",
      dataIndex: "debtor",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
      render: (debtor) => debtor?.toLocaleString(),
    },
    {
      title: "بستانکار",
      dataIndex: "creditor",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
      render: (creditor) => creditor?.toLocaleString(),
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, val) => (
        <>
          <Ant.Space direction="horizontal" size={20}>
            <Ant.Button
              className="text-blue-600"
              onClick={() => onEdit(val)}
              icon={<FiEdit />}
              type="text"
            />
          </Ant.Space>
          <Ant.Popconfirm
            onConfirm={() => onDelete(val)}
            title={`برای حذف سطر مطمئن هستید؟`}
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
  ]
}

export default column
