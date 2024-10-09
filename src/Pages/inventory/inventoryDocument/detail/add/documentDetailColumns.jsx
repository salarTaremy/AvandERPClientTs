import React from "react";
import PropTypes from "prop-types";
import * as Ant from "antd";
import * as defaultValues from "@/defaultValues";
import { RiDeleteBin6Line } from "react-icons/ri";

export const documentDetailColumns = (onDelete, onProductView, onBatchNumberView) => {
  return [
    {
      title: "ردیف",
      dataIndex: "rowNumber",
      key: "key",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 80,
    },
    {
      title: "کالا",
      dataIndex: "productName",
      key: "productName",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 400,
      render: (text, record, index) => (
        <Ant.Typography.Link onClick={() => onProductView(record.productId)}>{record.productName}</Ant.Typography.Link>
      )
    },
    {
      title: "سری ساخت",
      dataIndex: "batchNumber",
      key: "batchNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
      render: (text, record, index) => (
        <Ant.Typography.Link onClick={() => onBatchNumberView(record.batchNumberId)}>{record.batchNumber}</Ant.Typography.Link>
      )
    },
    {
      title: "تعداد",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "واحد",
      dataIndex: "productUnit",
      key: "productUnit",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "مبلغ واحد  ",
      dataIndex: "unitPrice",
      key: "unitPrice",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
    },
    {
      title: "مبلغ کل",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      hidden: !onDelete,
      render: (text, record, index) => {
        return (
          <>
            <Ant.Space>
              <Ant.Button
                className="text-red-600"
                icon={<RiDeleteBin6Line />}
                type="text"
                color="danger"
                variant="filled"
                onClick={() => onDelete(record.key)}
              />
            </Ant.Space>
          </>
        );
      },
    },
  ];
};

documentDetailColumns.propTypes = {
  onDelete: PropTypes.func,
};
