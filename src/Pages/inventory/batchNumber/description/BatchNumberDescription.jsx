import React, { useState } from "react";
import * as api from "@/api";
import * as url from "@/api/url";

import * as Ant from "antd";
// import { FaBarcode } from "react-icons/fa6";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import CustomContent from "@/components/common/CustomContent";

import { theme } from "antd";
const { useToken } = theme;
import { BsCalendar4Week } from "react-icons/bs";
//====================================================================
//                        Declaration
//====================================================================
const BatchNumberDescription = (props) => {
  const { token } = useToken();
  const { id } = props;
  const pageTitle = "سری ساخت";
  const [batchNumberData, batchNumberLoading, batchNumberError] = api.useFetch(
    `${url.BATCH_NUMBER}/${id}`,
  );
  useRequestManager({ error: batchNumberError });

  const descriptionItems = [
    {
      key: "1",
      label: "سری ساخت",
      children: batchNumberData?.data?.batchNumber,
      span: 3,
    },
    {
      key: "2",
      label: "تاریخ تولید",
      children: batchNumberData?.data?.productionDate,
      children: `${batchNumberData?.data?.expiryDate} ( ${batchNumberData?.data?.gregorianProductionDate})`,
      span: 3,
    },
    {
      key: "3",
      label: "تاریخ انقضا",

      children: `${batchNumberData?.data?.expiryDate} ( ${batchNumberData?.data?.gregorianExpiryDate})`,

      span: 3,
    },
    {
      key: "4",
      label: "عمر مفید",
      children: `${batchNumberData?.data?.shelfLife} ماه`,
      span: 3,
    },
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active loading={batchNumberLoading}>
        {/* <ModalHeader title={pageTitle} /> */}
        {/* <Ant.Descriptions
          bordered
          layout="horizontal"
          size="medium"
          items={descriptionItems}
        /> */}
        <ModalHeader
          title={` مشاهده سری ساخت (${batchNumberData?.data?.batchNumber}) `}
        />
        <Ant.Badge.Ribbon
          text={`عمر مفید${batchNumberData?.data?.shelfLife} ماه`}
        >
          <CustomContent bordered>
            <Ant.Row>
              <Ant.Col xs={24} sm={4} md={4} lg={4}>
                <Ant.Space direction="vertical" align="center" size="middle">
                  <Ant.QRCode
                    size={100}
                    value={batchNumberData?.data?.batchNumber}
                    color={token.colorInfoText}
                  />
                </Ant.Space>
              </Ant.Col>
              <Ant.Col xs={24} sm={18} md={18} lg={18}>
                <Ant.Row gutter={[8, 16]}>
                  <Ant.Col span={24}>
                    <Ant.Typography.Text>
                      {"سری ساخت"}: {batchNumberData?.data?.batchNumber}
                    </Ant.Typography.Text>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={24} md={12} lg={12}>
                    <Ant.Space direction="vertical">
                      <Ant.Typography.Text
                        type="secondary"
                        icon={<BsCalendar4Week className="text-blue-600" />}
                      >
                        {"تاریخ تولید"}:{batchNumberData?.data?.productionDate}
                      </Ant.Typography.Text>
                      <Ant.Typography.Text type="secondary">
                        {"تاریخ تولید"}:
                        {batchNumberData?.data?.gregorianProductionDate}
                      </Ant.Typography.Text>
                    </Ant.Space>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={24} md={12} lg={12}>
                    <Ant.Space direction="vertical">
                      <Ant.Typography.Text
                        type="secondary"
                        icon={<BsCalendar4Week className="text-blue-600" />}
                      >
                        {"تاریخ انقضا "}:{batchNumberData?.data?.expiryDate}
                      </Ant.Typography.Text>
                      <Ant.Typography.Text type="secondary">
                        {"تاریخ انقضا "}:
                        {batchNumberData?.data?.gregorianExpiryDate}
                      </Ant.Typography.Text>
                    </Ant.Space>
                  </Ant.Col>
                </Ant.Row>
              </Ant.Col>
            </Ant.Row>
          </CustomContent>
        </Ant.Badge.Ribbon>
      </Ant.Skeleton>
    </>
  );
};

export default BatchNumberDescription;
