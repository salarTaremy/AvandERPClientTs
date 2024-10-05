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
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active loading={batchNumberLoading}>
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
                    <Row justify="center" align="middle">
                      <Col span={8}>
                        <Ant.Typography.Text
                          type="secondary"
                          icon={<BsCalendar4Week className="text-blue-600" />}
                        >
                          {"تاریخ تولید:"}
                        </Ant.Typography.Text>
                      </Col>
                      <Col span={8}>
                        <Ant.Space direction="vertical">

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
                      </Col>
                    </Row>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={24} md={12} lg={12}>
                    <Row justify="center" align="middle">
                      <Col span={8}>
                        <Ant.Typography.Text
                          type="secondary"
                          icon={<BsCalendar4Week className="text-blue-600" />}
                        >
                          {"تاریخ انقضا:"}
                        </Ant.Typography.Text>

                      </Col>
                      <Col span={8}>
                        <Ant.Space direction="vertical">
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
                      </Col>
                    </Row>

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
