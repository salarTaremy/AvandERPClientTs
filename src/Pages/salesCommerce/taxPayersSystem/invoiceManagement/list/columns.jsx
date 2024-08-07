import React from "react";
import * as Ant from "antd";
import { BiMessageSquareError } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { BsSend } from "react-icons/bs";
import { green, lime, red, geekblue, orange } from "@ant-design/colors";

const getSendingProgressPercent = (progressStatusId) => {
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
const getSendingProgress = (
  progressStatusId,
  statusId,
  sendingProgressStatus,
) => {
  return (
    <>
      {/*  not send */}
      {progressStatusId === 0 && statusId === undefined && (
        <Ant.Progress
          percent={0}
          steps={3}
          format={(percent) => {
            return (
              <Ant.Tooltip title={"ارسال نشده"}>{`${percent}%`}</Ant.Tooltip>
            );
          }}
        />
      )}

      {/*  waiting to be sent */}
      {progressStatusId !== 3 && progressStatusId !== 0 && (
        <Ant.Progress
          percent={getSendingProgressPercent(progressStatusId)}
          steps={3}
          strokeColor={[geekblue[1], geekblue[3], geekblue[6]]}
          format={(percent) => {
            return (
              <Ant.Tooltip title={sendingProgressStatus}>
                {`${percent}%`}
              </Ant.Tooltip>
            );
          }}
        />
      )}

      {/* sent - success status */}
      {progressStatusId === 3 && statusId === 1 && (
        <Ant.Progress
          percent={100}
          steps={3}
          strokeColor={[lime[2], lime[4], green[6]]}
          format={(percent) => {
            return (
              <Ant.Tooltip title={"ارسال موفق"}>
                {`${percent}%`}
              </Ant.Tooltip>
            );
          }}
        />
      )}

      {/* sent - error status */}
      {progressStatusId === 3 && statusId === 2 && (
        <Ant.Progress
          percent={100}
          steps={3}
          strokeColor={[red[1], red[3], red[6]]}
          format={(percent) => {
            return (
              <Ant.Tooltip title={"ارسال ناموفق"} className="text-red-600">
                {`${percent}%`}
              </Ant.Tooltip>
            );
          }}
        />
      )}

      {/* sent - waiting status */}
      {progressStatusId === 3 && (statusId === 3 || statusId === 4) && (
        <Ant.Progress
          percent={100}
          steps={3}
          strokeColor={[orange[1], orange[3], orange[5]]}
          format={(percent) => {
            return (
              <Ant.Tooltip
                title={"ارسال در انتظار بررسی"}
                className="text-orange-600"
              >
                {`${percent}%`}
              </Ant.Tooltip>
            );
          }}
        />
      )}

      {/* sent - unknown status */}
      {progressStatusId === 3 && (statusId === 5 || statusId === undefined) && (
        <Ant.Progress
          percent={100}
          steps={3}
          strokeColor={[geekblue[1], geekblue[3], geekblue[6]]}
          format={(percent) => {
            return (
              <Ant.Tooltip
                title={"ارسال بدون وضعیت"}
                className="text-blue-700"
              >
                {`${percent}%`}
              </Ant.Tooltip>
            );
          }}
        />
      )}
    </>
  );
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

export const columns = (onViewSaleDocument, onViewCustomer, onInquiry, onSendToTaxPayersSystem, onViewCompanyinformation) => {
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
        return getSendingProgress(
          record.sendingProgressStatusId,
          record.statusId,
          record.sendingProgressStatus,
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
      render: (text, record, index) => {
        return (

          (record.customerTypeId == '2' && <Ant.Typography.Link
            onClick={() => onViewCompanyinformation(record.customerLegalEntityIdentity)}
          >
            {text}
          </Ant.Typography.Link>) || (record.customerLegalEntityIdentity)
        );
      },
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
      sorter: true,
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
      sorter: true,
      render: (text, record, index) => record.subTotal.toLocaleString(),
    },
    {
      title: "تخفیفات",
      dataIndex: "discounts",
      key: "discounts",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 150,
      sorter: true,
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
      sorter: true,
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
      className: "text-xs sm:text-sm",
      width: 120,
      align: "center",
      fixed: "right",
      render: (text, record, index) => {
        return (
          <>
            <Ant.Space size={5}>
              <Ant.Popconfirm
                title="آیا از ارسال این صورتحساب به سامانه مودیان مطمئن هستید؟"
                onConfirm={() => onSendToTaxPayersSystem(record.id)}
              >
                <Ant.Tooltip title="ارسال به سامانه مودیان">
                  <Ant.Button
                    className="text-pink-600"
                    icon={<BsSend />}
                    type="text"
                    size="middle"
                    disabled={record.statusId && record.statusId === 1}
                  />
                </Ant.Tooltip>
              </Ant.Popconfirm>
              <Ant.Tooltip title="استعلام وضعیت">
                <Ant.Button
                  onClick={() =>
                    onInquiry(record.id, record.saleDocumentUniqueFiscalId)
                  }
                  className="text-cyan-400"
                  icon={<BiMessageSquareError />}
                  type="text"
                  size="middle"
                  disabled={!record.sentTimes}
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
