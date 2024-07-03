import React from "react";
import * as Ant from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { Typography } from 'antd';
const { Text, Link } = Typography;

const getStatusColor = (statusId) => {
    switch (statusId) {
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


export const columns = (onInquiry) => {
    return [
        {
            title: "استعلام",
            dataIndex: "id",
            key: "inquiryStatus",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80,
            render: (text, record, index) => {
                return (
                    <>
                        <Ant.Space>
                            <Ant.Button
                                onClick={() => onInquiry(record.id, record.saleDocumentUniqueFiscalId)}
                                className="text-sky-600"
                                icon={<FaQuestionCircle />}
                                type="text"
                            />
                        </Ant.Space>
                    </>
                )
            }
        },
        {
            title: "شماره سریال",
            dataIndex: "saleDocumentSerialNumber",
            key: "saleDocumentSerialNumber",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120
        },
        {
            title: "الگوی صورتحساب",
            dataIndex: "saleDocumentIssue",
            key: "saleDocumentIssue",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 150
        },
        {
            title: "نام خریدار",
            dataIndex: "customerFullName",
            key: "customerFullName",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 400
            //customerId
        },
        {
            title: "کد/شناسه ملی",
            dataIndex: "customerLegalEntityIdentity",
            key: "customerLegalEntityIdentity",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 150
        },
        {
            title: "کد اقتصادی",
            dataIndex: "customerEconomicCode",
            key: "customerEconomicCode",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120
        },
        {
            title: "تاریخ صدور",
            dataIndex: "invoiceIssueDate",
            key: "invoiceIssueDate",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120
        },
        {
            title: "نوع مشتری",
            dataIndex: "customerType",
            key: "customerType",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            key: "status",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
            // render: (text, record, index) => {
            //     return (
            //         <Ant.Tag bordered={false} color={getStatusColor(record.saleDocumentTypeId)}>
            //             {record.status}
            //         </Ant.Tag>
            //     )
            // }
        },
        {
            title: "موجود در کارپوشه",
            dataIndex: "isInTpsCartable",
            key: "isInTpsCartable",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 150,
            render: (text, record, index) => {
                return (
                    <>
                        {record.isInTpsCartable === true && <Text>{'بله'}</Text>}
                        {record.isInTpsCartable === false && <Text>{'خیر'}</Text>}
                    </>
                )
            }
        },
        {
            title: "شناسه مالیاتی",
            dataIndex: "saleDocumentUniqueFiscalId",
            key: "saleDocumentUniqueFiscalId",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 200
        },
        {
            title: "مبلغ",
            dataIndex: "subTotal",
            key: "subTotal",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 150,
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
            width: 150,
            render: (text, record, index) => (
                record.discounts.toLocaleString()
            )
        },
        {
            title: "مبلغ با احتساب تخفیف",
            dataIndex: "subTotalWithDiscount",
            key: "subTotalWithDiscount",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 200,
            render: (text, record, index) => (
                record.subTotalWithDiscount.toLocaleString()
            )
        },
        {
            title: "مالیات",
            dataIndex: "valueAddedTaxTotal",
            key: "valueAddedTaxTotal",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 150,
            render: (text, record, index) => (
                record.valueAddedTaxTotal.toLocaleString()
            )
        },
        {
            title: "جمع صورتحساب",
            dataIndex: "totalPrice",
            key: "totalPrice",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 150,
            render: (text, record, index) => (
                record.totalPrice.toLocaleString()
            )
        },
        {
            title: "روش تسویه",
            dataIndex: "settlementType",
            key: "settlementType",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 100
        },
    ];
}