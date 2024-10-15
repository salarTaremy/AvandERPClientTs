import React, { useState, useEffect } from "react";
import * as api from "@/api";
import * as url from "@/api/url";
import qs from "qs";
import * as Ant from "antd";
import CustomContent from "@/components/common/CustomContent";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { IoTimeOutline } from "react-icons/io5";
import { GrDocumentPpt } from "react-icons/gr";

//====================================================================
//                        Declaration
//====================================================================
const PriceCircularHeaderDescription = (props) => {
  const { priceCircularDetailId, id } = props;
  const [listDetail, setListDetail] = useState([]);
  const [fetchData, fetchLoading, fetchError, fetchApiCall] =
    api.useFetchWithHandler();
  useRequestManager({ error: fetchError });
  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    getPriceCircularHeader();
  }, []);
  useEffect(() => {
    fetchData?.isSuccess && setListDetail(fetchData?.data);
  }, [fetchData]);

  //====================================================================
  //                        Functions
  //====================================================================

  const getPriceCircularHeader = async () => {
    const queryString = qs.stringify({
      priceCircularDetailId: priceCircularDetailId,
      id: id,
    });

    await fetchApiCall(`${url.PRICE_CIRCULAR_HEADER}?${queryString}`);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active loading={fetchLoading}>
        {listDetail?.map((item) => (
          <>
            <ModalHeader title={"جزئیات بخشنامه قیمت"} />
            <Ant.Badge.Ribbon color="#87d068" text="test">
              <CustomContent bordered>
                <Ant.Row>
                  <Ant.Col xs={24} sm={4} md={4} lg={4}>
                    <Ant.Space
                      direction="vertical"
                      align="center"
                      size="middle"
                    >
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
                        icon={<GrDocumentPpt />}
                      />

                      <Ant.Space direction="horizontal">
                        <Ant.Badge
                          color={(item?.isActive && "green") || "red"}
                        />
                        <Ant.Typography.Text type="secondary">
                          {(item?.isActive && "فعال") || "غیرفعال"}
                        </Ant.Typography.Text>
                      </Ant.Space>
                    </Ant.Space>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={18} md={18} lg={18}>
                    <Ant.Row gutter={[8, 16]}>
                      <Ant.Col span={24}>
                        <Ant.Typography.Text>
                          {"عنوان"} : {item?.title}
                        </Ant.Typography.Text>
                      </Ant.Col>

                      <Ant.Col xs={24} sm={24} md={12} lg={12}>
                        <Ant.Space direction="vertical">
                          <Ant.Typography.Text type="secondary">
                            {"تاریخ شروع"} : {item?.startDate}
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {"تاریخ پایان"} :{item?.endDate}
                          </Ant.Typography.Text>

                          <Ant.Typography.Text type="secondary">
                            {"تاریخ اجرا"} : {item?.implementationDate}{" "}
                            <IoTimeOutline className="text-orange-400" />{" "}
                            {item?.implementationTime.substr(0, 8)}
                          </Ant.Typography.Text>
                        </Ant.Space>
                      </Ant.Col>
                      <Ant.Col xs={24} sm={24} md={12} lg={12}>
                        <Ant.Space direction="vertical">
                          <Ant.Typography.Text type="secondary">
                            {" نوع ارز"} :{item?.defaultCurrencyTitle}
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {"توضیحات"} :{item?.description}
                          </Ant.Typography.Text>
                        </Ant.Space>
                      </Ant.Col>
                    </Ant.Row>
                  </Ant.Col>
                </Ant.Row>
              </CustomContent>
            </Ant.Badge.Ribbon>
          </>
        ))}
      </Ant.Skeleton>
    </>
  );
};

export default PriceCircularHeaderDescription;
