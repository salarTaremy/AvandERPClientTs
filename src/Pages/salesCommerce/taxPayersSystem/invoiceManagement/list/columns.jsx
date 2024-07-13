import React from "react";
import * as Ant from "antd";
import { BiMessageSquareError } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { BsCheckCircle } from "react-icons/bs";
import { GoNoEntry } from "react-icons/go";
import { green, lime } from "@ant-design/colors";

const getSendingProgress = (progressStatusId) => {
  switch (progressStatusId) {
    case 1:
      return 30;
    case 2:
      return 50;
    case 3:
      return 100;
    default:
      return 0;
  }
};
const getSaleDocIssueColor = (issueId) => {
  switch (issueId) {
    case 1:
      return "green";
    case 2:
      return "cyan";
    case 3:
      return "volcano";
    case 4:
      return "red";
    default:
      return 0;
  }
};

export const columns = (onViewSaleDocument, onViewCustomer, onInquiry) => {
  return [
    {
      title: "شماره سریال",
      dataIndex: "saleDocumentSerialNumber",
      key: "saleDocumentSerialNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "شناسه مالیاتی",
      dataIndex: "saleDocumentUniqueFiscalId",
      key: "saleDocumentUniqueFiscalId",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 200,
    },
    {
      title: "پروسه ارسال",
      dataIndex: "status",
      key: "status",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
      render: (text, record, index) => {
        return (
          <>
            <Ant.Progress
              percent={getSendingProgress(record.sendingProgressStatusId)}
              steps={3}
              strokeColor={[lime[2], lime[4], green[6]]}
              format={(percent) => {
                return (
                  <Ant.Tooltip title={record.sendingProgressStatus}>
                    {`${percent}%`}
                  </Ant.Tooltip>
                );
              }}
            />
          </>
        );
      },
    },
    {
      title: "نام خریدار",
      dataIndex: "customerFullName",
      key: "customerFullName",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 400,
      render: (text, record, index) => {
        return (
          <Ant.Typography.Link
            onClick={() => onViewCustomer(record.customerId)}
          >
            {text}
          </Ant.Typography.Link>
        );
      },
    },
    {
      title: "کد/شناسه ملی",
      dataIndex: "customerLegalEntityIdentity",
      key: "customerLegalEntityIdentity",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
    },
    {
      title: "کد اقتصادی",
      dataIndex: "customerEconomicCode",
      key: "customerEconomicCode",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "تاریخ صدور",
      dataIndex: "invoiceIssueDate",
      key: "invoiceIssueDate",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "نوع مشتری",
      dataIndex: "customerType",
      key: "customerType",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    // {
    //   title: "موجود در کارپوشه",
    //   dataIndex: "isInTpsCartable",
    //   key: "isInTpsCartable",
    //   align: "center",
    //   className: "text-xs sm:text-sm",
    //   width: 150,
    //   render: (text, record, index) => {
    //     return (
    //       <>
    //         {record.isInTpsCartable === true && (
    //           <BsCheckCircle className="text-green-600" />
    //         )}
    //         {record.isInTpsCartable === false && (
    //           <GoNoEntry className="text-rose-700" />
    //         )}
    //       </>
    //     );
    //   },
    // },
    // {
    //   title: "وضعیت",
    //   dataIndex: "status",
    //   key: "status",
    //   align: "center",
    //   className: "text-xs sm:text-sm",
    //   width: 80,
      // render: (text, record, index) => {
      //     return (
      //         <Ant.Tag bordered={false} color={getStatusColor(record.statusId)}>
      //             {record.status}
      //         </Ant.Tag>
      //     )
      // }
    // },
    {
      title: "الگوی صورتحساب",
      dataIndex: "saleDocumentIssue",
      key: "saleDocumentIssue",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
      render: (text, record, index) => {
        return (
          <Ant.Tag
            bordered={false}
            color={getSaleDocIssueColor(record.saleDocumentIssueId)}
          >
            {record.saleDocumentIssue}
          </Ant.Tag>
        );
      },
    },
    {
      title: "مبلغ",
      dataIndex: "subTotal",
      key: "subTotal",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
      render: (text, record, index) => record.subTotal.toLocaleString(),
    },
    {
      title: "تخفیفات",
      dataIndex: "discounts",
      key: "discounts",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
      render: (text, record, index) => record.discounts.toLocaleString(),
    },
    {
      title: "مبلغ با احتساب تخفیف",
      dataIndex: "subTotalWithDiscount",
      key: "subTotalWithDiscount",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 200,
      render: (text, record, index) =>
        record.subTotalWithDiscount.toLocaleString(),
    },
    {
      title: "مالیات",
      dataIndex: "valueAddedTaxTotal",
      key: "valueAddedTaxTotal",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
      render: (text, record, index) =>
        record.valueAddedTaxTotal.toLocaleString(),
    },
    {
      title: "جمع صورتحساب",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
      render: (text, record, index) => record.totalPrice.toLocaleString(),
    },
    {
      title: "روش تسویه",
      dataIndex: "settlementType",
      key: "settlementType",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: "عملیات",
      dataIndex: "id",
      key: "inquiryStatus",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
      fixed: "right",
      render: (text, record, index) => {
        return (
          <>
            <Ant.Space>
              <Ant.Tooltip title="استعلام وضعیت">
                <Ant.Button
                  onClick={() =>
                    onInquiry(record.id, record.saleDocumentUniqueFiscalId)
                  }
                  className="text-cyan-400"
                  icon={<BiMessageSquareError />}
                  type="text"
                  size="middle"
                />
              </Ant.Tooltip>
              <Ant.Tooltip title="مشاهده صورتحساب">
                <Ant.Button
                  onClick={() => onViewSaleDocument(record.id)}
                  className="text-sky-600"
                  icon={<GrView />}
                  type="text"
                  size="middle"
                />
              </Ant.Tooltip>
            </Ant.Space>
          </>
        );
      },
    },
  ];
};
