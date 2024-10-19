import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import * as defaultValues from "@/defaultValues";
import { BsBuildingGear } from "react-icons/bs";
const columns = (
  onWareHouseStockView,
  onBatchNumberView,
  onWarehouseView,
  onProductView,
  onWareHouseStockBatchNumberView,
) => {
  return [
    // {
    //   title: "تاریخ",
    //   dataIndex: "issueDate",
    //   key: "issueDate",
    //   align: "center",
    //   width: 80,
    //   className: "text-xs sm:text-sm",
    //   render: (text, record) =>
    //     `${record.issueTime.substr(0, 8)} - ${record.issueDate} `,
    // },

    {
      title: "نام انبار",
      dataIndex: "warehouseName",
      key: "warehouseName",
      align: "center",
      width: 80,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => (
        <Ant.Typography.Link
          onClick={() => onWarehouseView(record.warehouseId)}
        >
          {record.warehouseName}
        </Ant.Typography.Link>
      ),
    },

    {
      title: "کد محصول",
      dataIndex: "productCode",
      key: "productCode",
      align: "center",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: "کد دوم محصول",
      dataIndex: "productSecondCode",
      key: "productSecondCode",
      align: "center",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: " نام محصول",
      dataIndex: "productName",
      key: "productName",
      align: "center",
      width: 100,
      className: "text-xs sm:text-sm",
      render: (text, record, index) => (
        <Ant.Typography.Link onClick={() => onProductView(record.productId)}>
          {record.productName}
        </Ant.Typography.Link>
      ),
    },
    {
      title: " واحد محصول",
      dataIndex: "productUnitName",
      key: "productUnitName",
      align: "center",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: "نوع واحد محصول",
      dataIndex: "productUnitTypeName",
      key: "productUnitTypeName",
      align: "center",
      width: 80,
      className: "text-xs sm:text-sm",
    },
    {
      title: "عمرمفید",
      dataIndex: "shelfLife",
      key: "shelfLife",
      align: "center",
      width: 80,
      className: "text-xs sm:text-sm",
    },

    {
      title: "سری ساخت",
      dataIndex: "batchNumber",
      key: "batchNumber",
      width: 60,
      align: "center",
      className: "text-xs sm:text-sm",
      render: (text, record, index) => (
        <Ant.Typography.Link
          onClick={() => onBatchNumberView(record.batchNumberId)}
        >
          {record.batchNumber}
        </Ant.Typography.Link>
      ),
    },
    {
      title: "کل موجودی",
      dataIndex: "totalStock",
      key: "totalStock",
      width: 60,
      className: "text-xs sm:text-sm",
      align: "center",
      sorter: true,
      render: (text, record, index) => record.totalStock.toLocaleString(),
    },
    {
      title: "جمع کل",
      dataIndex: "sumReserve",
      key: "sumReserve",
      width: 60,
      className: "text-xs sm:text-sm",
      align: "center",
      sorter: true,
      render: (text, record, index) => record.sumReserve.toLocaleString(),
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,

      render: (text, value, index) => (
        <>
          <Ant.Space>
            <Ant.Button
              onClick={() => onWareHouseStockBatchNumberView(value)}
              className="text-orange-600"
              icon={<BsBuildingGear />}
              color="default"
              variant="filled"
            />
            <Ant.Button
              onClick={() => onWareHouseStockView(value)}
              className="text-sky-600"
              icon={<GrView />}
              color="primary"
              variant="filled"
            />
          </Ant.Space>
        </>
      ),
    },
  ];
};

export default columns;
