import React from "react";
import * as Ant from "antd";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { Typography } from 'antd';
const { Text, Link } = Typography;

const getDocumentTypeColor = (saleDocumentTypeId) => {
    switch (saleDocumentTypeId) {
        case 1:
          return "pink";
        case 5:
          return "cyan";
        case 6:
          return "green";
        case 7:
          return "red";
        case 8:
          return "orange";
        case 9:
            return "blue";
        default:
          return "black";
    }
};


export const columns = (onDelete, onEdit, onView) => {
    return [
        {
            title: "شماره برگه",
            dataIndex: "documentNumber",
            key: "documentNumber",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "شماره سریال",
            dataIndex: "serialNumber",
            key: "serialNumber",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 100
        },
        {
            title: "نوع برگه",
            dataIndex: "saleDocumentType",
            key: "saleDocumentType",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 100,
            render: (text, record, index) => {
                return (
                    <Ant.Tag color={getDocumentTypeColor(record.saleDocumentTypeId)}>
                        {record.saleDocumentType}
                    </Ant.Tag>
                )
            }
        },
        {
            title: "برگه مرجع",
            dataIndex: "referenceId",
            key: "referenceId",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80,
            render: (text, record, index) => {
                return (
                    <>
                        {record.referenceId === 0 && <Text>-</Text>}
                        {record.referenceId !== 0 && <Link>{record.referenceDocumentNumber}</Link>}
                    </>
                )
            }
        },
        {
            title: "کانال فروش",
            dataIndex: "saleChannel",
            key: "saleChannel",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "نام شعبه",
            dataIndex: "branchName",
            key: "branchName",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "مشتری",
            dataIndex: "customerName",
            key: "customerId",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 100,
            render: (text, record, index) => (
                <Link href="#">{record.customerName}</Link>
            )
        },
        {
            title: "زمان صدور",
            dataIndex: "issueDateTimeString",
            key: "issueDateTimeString",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "جمع خالص",
            dataIndex: "subTotal",
            key: "subTotal",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "تخفیفات",
            dataIndex: "discounts",
            key: "discounts",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "مالیات و عوارض",
            dataIndex: "taxTotal",
            key: "taxTotal",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "مبلغ قابل پرداخت",
            dataIndex: "totalPrice",
            key: "totalPrice",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
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
                            <Ant.Button
                                onClick={() => onView(record.id)}
                                className="text-sky-600"
                                icon={<GrView/>}
                                type="text"
                            />
                            <Ant.Button
                                onClick={() => onEdit(record.id)}
                                className="text-blue-600"
                                icon={<FiEdit/>}
                                type="text"
                            />
                        </Ant.Space>
                    </>
                )
            }
        },
    ];
}