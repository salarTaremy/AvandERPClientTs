import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { CiWarning } from "react-icons/ci";
import { TiWarningOutline } from "react-icons/ti";

function shouldShowWarning(val) {
  const hasDebtorOrCreditor = val.debtor !== 0 && val.creditor !== 0;

  const detailedAccountsDefined = val.detailedAccountName5.length !== 0;
  val.detailedAccountName4.length !== 0;
  val.detailedAccountName6.length !== 0;

  const detailedAccountCheck =
    detailedAccountsDefined &&
    (val.detailedAccountName5 === val.detailedAccountName6 ||
      val.detailedAccountName4 === val.detailedAccountName5 ||
      val.detailedAccountName4 === val.detailedAccountName6);

  return hasDebtorOrCreditor || detailedAccountCheck;
}

const column = (onDelete, onEdit, onError) => {
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
      render: (detailedAccountName4, record) => {
        const isRed =
          detailedAccountName4 == record.detailedAccountName5 ||
          detailedAccountName4 == record.detailedAccountName6;
        return {
          children: detailedAccountName4,
          props: {
            style: { color: isRed ? "red" : "black" },
          },
        };
      },
    },
    {
      title: "حساب تفصیلی سطح پنج",
      dataIndex: "detailedAccountName5",
      align: "center",
      width: 200,
      className: "text-xs sm:text-sm",
      render: (detailedAccountName5, record) => {
        const isRed =
          detailedAccountName5 == record.detailedAccountName4 ||
          detailedAccountName5 == record.detailedAccountName6;
        return {
          children: detailedAccountName5,
          props: {
            style: { color: isRed ? "red" : "black" },
          },
        };
      },
    },
    {
      title: "حساب تفصیلی سطح شش",
      dataIndex: "detailedAccountName6",
      align: "center",
      width: 200,
      className: "text-xs sm:text-sm",
      render: (detailedAccountName6, record) => {
        const isRed =
          detailedAccountName6 == record.detailedAccountName4 ||
          detailedAccountName6 == record.detailedAccountName5;
        return {
          children: detailedAccountName6,
          props: {
            style: { color: isRed ? "red" : "black" },
          },
        };
      },
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
      // render: (debtor) => debtor?.toLocaleString(),
      // render: (debtor, record) => {
      //   if (debtor === 0 && record.creditor === 0) {
      //     return {
      //       children: debtor.toLocaleString(),
      //       props: {
      //         style: { color: "red" }
      //       }
      //     };
      //   }
      //   return debtor.toLocaleString();
      // }
      render: (debtor, record) => {
        const isRed =
          (debtor !== 0 && record.creditor !== 0) ||
          (debtor === 0 && record.creditor === 0);
        return {
          children: debtor.toLocaleString(),
          props: {
            style: { color: isRed ? "red" : "black" },
          },
        };
      },
    },
    {
      title: "بستانکار",
      dataIndex: "creditor",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
      // render: (creditor) => creditor?.toLocaleString(),

      // render: (creditor, record) => {
      //   if (creditor === 0 && record.debtor === 0) {
      //     return {
      //       children: creditor.toLocaleString(),
      //       props: {
      //         style: { color: "red" }
      //       }
      //     };
      //   }
      //   return creditor.toLocaleString();
      // }
      render: (creditor, record) => {
        const isRed =
          (creditor !== 0 && record.debtor !== 0) ||
          (creditor === 0 && record.debtor === 0);

        return {
          children: creditor.toLocaleString(),
          props: {
            style: { color: isRed ? "red" : "black" },
          },
        };
      },
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      align: "center",
      fixed: "right",
      render: (text, val) => (
        <>
          <Ant.Space direction="horizontal">
            {/* {shouldShowWarning(val) && ( */}
            <Ant.Tooltip
              className={shouldShowWarning(val) ? "" : "invisible"}
              title="مشاهده خطا"
            >
              <Ant.Button
                onClick={() => onError(val)}
                type="text"
                icon={<TiWarningOutline />}
                className="text-orange-400"
              />
            </Ant.Tooltip>
            {/* )} */}
          </Ant.Space>
          <Ant.Space direction="horizontal">
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
  ];
};

export default column;
