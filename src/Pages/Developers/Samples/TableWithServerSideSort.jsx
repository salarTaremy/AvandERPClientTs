import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import qs from "qs";
import * as url from "@/api/url";
import * as api from "@/api";
import * as defaultValues from "@/defaultValues";

const TableWithServerSideSort = () => {
  const [
    invoiceListData,
    invoiceListLoading,
    invoiceListError,
    invoiceListApiCall,
  ] = api.useFetchWithHandler();

  const [dataSource, setDataSource] = useState(null);

  const columns = [
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
      title: "تاریخ صدور",
      dataIndex: "invoiceIssueDate",
      key: "invoiceIssueDate",
      align: "center",
      className: "text-xs sm:text-sm",
      sorter: true,
      width: 200,
    },
    {
      title: "نام خریدار",
      dataIndex: "customerFullName",
      key: "customerFullName",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 600,
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
      width: 150,
    },
    {
      title: "مبلغ",
      dataIndex: "subTotal",
      key: "subTotal",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 200,
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
      width: 400,
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
      width: 300,
      sorter: true,
      render: (text, record, index) => record.totalPrice.toLocaleString(),
    },
    {
      title: "روش تسویه",
      dataIndex: "settlementType",
      key: "settlementType",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 200,
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    const queryString = qs.stringify({
      pageNumber: tableParams?.pagination?.current,
      pageSize: tableParams?.pagination?.pageSize,
      order: tableParams?.sortOrder,
      orderByField: tableParams?.sortField,
    });
    await invoiceListApiCall(`${url.TPS_INVOICE_MANAGEMENT}?${queryString}`);

    // fetch(
    //   `https://randomuser.me/api?${qs.stringify(
    //     getRandomuserParams(tableParams),
    //   )}`,
    // )
    //   .then((res) => res.json())
    //   .then(({ results }) => {
    //     setData(results);
    //     setLoading(false);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: 200,
    //         // 200 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //   });
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    //JSON.stringify(tableParams.filters),
  ]);

  useEffect(() => {
    setDataSource(invoiceListData?.data);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: invoiceListData?.data[0]?.totalCount,
      },
    });
  }, [invoiceListData]);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("sorter", sorter);
    setTableParams({
      pagination,
      //filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
  };

  const rowSelection = {
    selectedRowKeys,
    //hideSelectAll: true,
    preserveSelectedRowKeys: true,
    //onChange: onSelectChange,
  };

  return (
    <Card>
      <Table
        columns={columns}
        //rowKey={(record) => record.login.uuid}
        rowSelection={rowSelection}
        dataSource={dataSource}
        pagination={tableParams?.pagination}
        loading={invoiceListLoading}
        onChange={handleTableChange}
        {...defaultValues.TABLE_PROPS}
      />
    </Card>
  );
};

export default TableWithServerSideSort;
