import React from "react";
import * as Ant from "antd";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Typography } from 'antd';
import { LuFolderOpen } from "react-icons/lu";
import { CgMoreVertical } from "react-icons/cg";
import * as defaultValues from "@/defaultValues";
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
            return "purple";
    }
};



export const columns = (onDelete, onEdit, onView, onViewCustomer) => {
    const getMenuItems = (record) => [
        {
            key: '1',
            label: (
                <Ant.Tooltip placement="right" title={`ویرایش ${record.saleDocumentType} (${record.documentNumber})`}>
                    <a onClick={() => onEdit(record.id)}><FiEdit className="text-blue-600" /></a>
                </Ant.Tooltip>
            ),
        },
        {
            key: '2',
            label: (
                <Ant.Tooltip placement="right" title={`گشایش ${record.saleDocumentType} (${record.documentNumber})`}>
                    <a onClick={() => { alert (JSON.stringify(record)) }}><LuFolderOpen className="text-purple-600" /></a>
                </Ant.Tooltip>
            ),
        }
    ]
    return [
        {
            title: "شماره برگه",
            dataIndex: "documentNumber",
            key: "documentNumber",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 100
        },
        {
            title: "شماره سریال",
            dataIndex: "serialNumber",
            key: "serialNumber",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120
        },
        {
            title: "نوع برگه",
            dataIndex: "saleDocumentType",
            key: "saleDocumentType",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 150,
            render: (text, record, index) => {
                return (
                    <Ant.Tag bordered={false} color={getDocumentTypeColor(record.saleDocumentTypeId)}>
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
            width: 200,
            render: (text, record, index) => {
                return (
                    <>
                        {record.referenceId === 0 && <Text>-</Text> ||
                            <Link onClick={() => onView(record.referenceId)}>{`${record.referenceDocumentType} (${record.referenceDocumentNumber})`}</Link>}
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
            width: 400,
            render: (text, record, index) => (
                <Link onClick={() => onViewCustomer(record.customerId)}>{record.customerName}</Link>
            )
        },
        {
            title: "زمان صدور",
            dataIndex: "issueDateTimeString",
            key: "issueDateTimeString",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 200,
            render: (text, record, index) => (
                <>{record.issueDateTimeString.substring(0, 18)}</>
            )
        },
        {
            title: "جمع خالص",
            dataIndex: "subTotal",
            key: "subTotal",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120,
            render: (text, record, index) => (
                record.subTotal.toLocaleString()
            )
        },
        {
            title: "تخفیفات",
            dataIndex: "discounts",
            key: "discounts",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120,
            render: (text, record, index) => (
                record.discounts.toLocaleString()
            )
        },
        {
            title: "مالیات و عوارض",
            dataIndex: "taxTotal",
            key: "taxTotal",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120,
            render: (text, record, index) => (
                record.taxTotal.toLocaleString()
            )
        },
        {
            title: "مبلغ قابل پرداخت",
            dataIndex: "totalPrice",
            key: "totalPrice",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120,
            render: (text, record, index) => (
                record.totalPrice.toLocaleString()
            )
        },
        {
            ...defaultValues.TABLES_OPERATION_COLUMN,
            render: (text, record, index) => {
                return (
                    <>
                        <Ant.Space>
                            <Ant.Dropdown
                                menu={{
                                    items: getMenuItems(record),
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
                )
            }
        },
    ];
}