import React from "react";
import * as Ant from "antd";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const columns = (onProductView, onBatchNumberView) => {
    return [
        {
            title: "کد کالا",
            dataIndex: "productCode",
            key: "productCode",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "نام کالا",
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
            title: "قیمت",
            dataIndex: "price",
            key: "price",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120,
            render: (text, record, index) => (
                record.price.toLocaleString()
            )
        },
        {
            title: "قیمت مصرف کننده",
            dataIndex: "consumerPrice",
            key: "consumerPrice",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120,
            render: (text, record, index) => (
                record.consumerPrice.toLocaleString()
            )
        },
    ];
}