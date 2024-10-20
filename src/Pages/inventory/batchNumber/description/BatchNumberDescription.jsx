import React, { useState } from "react";
import * as api from "@/api";
import * as url from "@/api/url";

import * as Ant from "antd";
// import { FaBarcode } from "react-icons/fa6";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import CustomContent from "@/components/common/CustomContent";
import { Col, Divider, Row } from 'antd';
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
  //====================================================================
  //                        Functions
  //====================================================================
  const getDaysLeftUntilExpirationInfo = (val) => {
    let result;

    switch (true) {
      case (val <= 0):
        result = { caption: 'منقضی شده', color: 'red' };
        break;
      case (val < 120):
        result = { caption: `فقط ${Math.floor(val / 30)} ماه و ${(val % 30)} روز تا انقضا`, color: 'orange' };
        break;
      case (val <= 365):
        result = { caption: `${Math.floor(val / 30)} ماه و ${(val % 30)} روز تا انقضا`, color: 'blue' };
        break;
      case (val > 365):
        if (Math.floor((val % 365) / 30) > 0) {
          result = { caption: `${Math.floor(val / 365)} سال و ${Math.floor((val % 365) / 30)} ماه تا انقضا`, color: 'green' };
        } else {
          result = { caption: `${Math.floor(val / 365)} سال تا انقضا`, color: 'green' };
        }
        break;
      default:
        result = { caption: `${val}مقدار نامعتبر`, color: 'gray' };
    }

    return result;
  }

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active loading={batchNumberLoading}>
        <ModalHeader
          title={` مشاهده سری ساخت (${batchNumberData?.data?.batchNumber}) `}
        />
        <Ant.Badge.Ribbon
          color={getDaysLeftUntilExpirationInfo(batchNumberData?.data?.daysLeftUntilExpiration).color}
          text={getDaysLeftUntilExpirationInfo(batchNumberData?.data?.daysLeftUntilExpiration).caption}
        >
          <CustomContent bordered>
            <Ant.Row>
              <Ant.Col xs={24} sm={4} md={4} lg={4}>
                <Ant.Space direction="vertical" align="center" size="middle">
                  <Ant.QRCode
                    size={110}
                    value={batchNumberData?.data?.batchNumber
                      + '\nPrd: ' + batchNumberData?.data?.gregorianProductionDate
                      + '\nExp: ' + batchNumberData?.data?.gregorianExpiryDate
                    }
                    color={token.colorInfoText}
                  />
                </Ant.Space>
              </Ant.Col>
              <Ant.Col xs={24} sm={18} md={18} lg={18}>
                <Ant.Row gutter={[8, 16]}>
                  <Ant.Col span={24}>
                    <Ant.Typography.Text>
                      {`عمر مفید: ${batchNumberData?.data?.shelfLife} ماه`}
                    </Ant.Typography.Text>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={24} md={12} lg={12}>
                    <Ant.Space direction="horizontal">
                      <Ant.Typography.Text
                        type="secondary"
                        icon={<BsCalendar4Week className="text-blue-600" />}
                      >
                        {"تاریخ تولید:"}
                      </Ant.Typography.Text>
                      <Ant.Space direction="vertical" align="center">

                        <Ant.Typography.Text
                          type="secondary"
                          icon={<BsCalendar4Week className="text-blue-600" />}
                        >
                          {batchNumberData?.data?.productionDate}
                        </Ant.Typography.Text>
                        <Ant.Typography.Text
                          type="secondary"
                          icon={<BsCalendar4Week className="text-blue-600" />}
                        >
                          {batchNumberData?.data?.gregorianProductionDate}
                        </Ant.Typography.Text>
                      </Ant.Space>
                    </Ant.Space>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={24} md={12} lg={12}>
                    <Ant.Space direction="horizontal">
                      <Ant.Typography.Text
                        type="secondary"
                        icon={<BsCalendar4Week className="text-blue-600" />}
                      >
                        {"تاریخ انقضا:"}
                      </Ant.Typography.Text>
                      <Ant.Space direction="vertical" align="center">

                        <Ant.Typography.Text
                          type="secondary"
                          icon={<BsCalendar4Week className="text-blue-600" />}
                        >
                          {batchNumberData?.data?.expiryDate}
                        </Ant.Typography.Text>
                        <Ant.Typography.Text
                          type="secondary"
                          icon={<BsCalendar4Week className="text-blue-600" />}
                        >
                          {batchNumberData?.data?.gregorianExpiryDate}
                        </Ant.Typography.Text>
                      </Ant.Space>
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
