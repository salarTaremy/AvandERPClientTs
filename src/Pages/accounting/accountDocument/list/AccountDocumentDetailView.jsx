import React from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import * as api from "@/api";
import PropTypes from "prop-types";
import Loading from "@/components/common/Loading";
const AccountDocumentDetailView = (props) => {
  const cl = [
    {
      title: "ردیف",
      dataIndex: "rowNumber",
      key: "rowNumber",
      align: "center",
      width: 50,
    },
    {
      title: "معین",
      children: [
        {
          title: "کد",
          dataIndex: "accountCode",
          key: "accountCode",
          width: 100,
          render: (text, record, index) =>
            `${record.accountGroupCode}-${record.accountHeaderCode}-${record.accountCode}`,
        },
        {
          title: "شرح",
          dataIndex: "accountName",
          key: "accountName",
          width: 100,
          render: (text, record, index) => (
            <Ant.Tooltip
              title={`(${record.accountGroupCode}-${record.accountHeaderCode}-${record.accountCode}) ${record.accountGroupName} > ${record.accountHeaderName} > ${record.accountName}`}
            >
              {`${record.accountName}`}
            </Ant.Tooltip>
          ),
        },
      ],
    },
    {
      title: "تفصیل",
      children: [
        {
          title: "تفصیل 4",
          dataIndex: "detailedAccountId4",
          key: "detailedAccountId4",
          width: 200,
          render: (text, record, index) =>
            `${record.detailedAccountCode4}-${record.detailedAccountName4}`,
        },
        {
          title: "تفصیل 5",
          dataIndex: "detailedAccountId5",
          key: "detailedAccountId5",
          width: 200,
          render: (text, record, index) =>
            `${record.detailedAccountCode5}-${record.detailedAccountName5}`,
        },
        {
          title: "تفصیل 6",
          dataIndex: "detailedAccountId6",
          key: "detailedAccountId6",
          width: 200,
          render: (text, record, index) =>
            `${record.detailedAccountCode6}-${record.detailedAccountName6}`,
        },
      ],
    },
    {
      title: "شرح آرتیکل",
      dataIndex: "article",
      key: "article",
      width: 400,
    },
    {
      title: "بدهکار",
      dataIndex: "debtor",
      key: "debtor",
      width: 100,
    },
    {
      title: "بستانکار",
      dataIndex: "referenceNo",
      key: "referenceNo",
      width: 100,
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      width: 100,
    },
  ];

  const { id } = props;
  const [data, loading, error] = api.useFetch(
    url.ACCOUNT_DOCUMENT_DETAIL + "?AccountingDocumentID=" + id.toString(),
  );
  return (
    <>
      {(loading && (
        <Loading
          message="لطفا کمی صبر کنید"
          description={`درحال دانلود اطلاعات آرتیکل سند شناسه ${id}`}
        />
      )) || (
        <>
          <Ant.Table
            // {...defaultValues.TABLE_PROPS}
            // size= 'small'
            // rowKey= 'id'
            bordered
            scroll={{
              x: 1550,
              y: 240,
            }}
            columns={cl}
            dataSource={data?.data || null}
          />
          {/* <Ant.Typography>
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
          </Ant.Typography> */}
        </>
      )}
    </>
  );
};
AccountDocumentDetailView.propTypes = {
  id: PropTypes.any,
};

export default AccountDocumentDetailView;
