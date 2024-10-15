import React, { useState } from "react";
import * as api from "@/api";
import * as url from "@/api/url";
import * as Ant from "antd";
import useRequestManager from "@/hooks/useRequestManager";
import CustomContent from "@/components/common/CustomContent";
import ModalHeader from "@/components/common/ModalHeader";
import {GrDocumentPerformance} from "react-icons/gr";

//====================================================================
//                        Declaration
//====================================================================
const PriceCircularHeaderDescription = (props) => {
  const { id } = props;
  // const pageTitle = "بخشنامه قیمت مرتبط";
  const [
    priceCircularHeaderData,
    priceCircularHeaderLoading,
    priceCircularHeaderError,
  ] = api.useFetch(
    `${url.PRICE_CIRCULAR_HEADER}/${id}`,
  );
  useRequestManager({ error: priceCircularHeaderError });

   //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active loading={priceCircularHeaderLoading}>
      <ModalHeader title={"جزئیات بخشنامه قیمت"} icon={<GrDocumentPerformance />} />

      <Ant.Badge.Ribbon color={(priceCircularHeaderData?.data?.isActive && "#87d068") || "#f5222d"}
        text={(priceCircularHeaderData?.data?.isActive && "فعال") || "غیرفعال"}>
        <CustomContent bordered>
          <Ant.Row>
            <Ant.Col xs={24} sm={4} md={4} lg={4}>
              <Ant.Space direction="vertical" align="center" size="middle">
                <Ant.Avatar
                  shape="square"
                  size={{
                    xs: 32,
                    sm: 50,
                    md: 64,
                    lg: 64,
                    xl: 64,
                    xxl: 64,
                  }}
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  icon={<GrDocumentPerformance />}
                />

                <Ant.Typography.Text type="secondary">
                  {"شناسه"} :{priceCircularHeaderData?.data?.id}
                </Ant.Typography.Text>
              </Ant.Space>
            </Ant.Col>
            <Ant.Col>
              <Ant.Row gutter={[8, 16]}>
                <Ant.Col span={24}>
                  <Ant.Typography.Text>
                    {"عنوان"}: {priceCircularHeaderData?.data?.title}
                  </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col>
                  <Ant.Space direction="vertical">
                    <Ant.Typography.Text type="secondary">
                      {"تاریخ شروع"} :{priceCircularHeaderData?.data?.startDate}
                    </Ant.Typography.Text>
                    <Ant.Typography.Text type="secondary">
                      {"تاریخ پایان"}:{priceCircularHeaderData?.data?.endDate}
                    </Ant.Typography.Text>
                    <Ant.Typography.Text type="secondary">
                      {"توضیحات"}:{priceCircularHeaderData?.data?.description}
                    </Ant.Typography.Text>
                  </Ant.Space>
                </Ant.Col>
              </Ant.Row>
            </Ant.Col>
          </Ant.Row>
        </CustomContent>
      </Ant.Badge.Ribbon>
    </Ant.Skeleton>
  );
};

export default PriceCircularHeaderDescription;
