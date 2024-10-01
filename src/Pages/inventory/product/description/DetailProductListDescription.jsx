import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import CustomContent from "@/components/common/CustomContent";
import { AiOutlineProduct } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
const DetailProductListDescription = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.PRODUCT}/${id}`);
  useRequestManager({ error: error });

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active loading={loading}>
      <ModalHeader title={"جزئیات کالا/خدمات"} icon={<MdDescription />} />

      <Ant.Badge.Ribbon color="#87d068" text={`${data?.data?.brandName} `}>
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
                  icon={<AiOutlineProduct />}
                />

                <Ant.Typography.Text type="secondary">
                  {"شناسه"} :{data?.data?.id}
                </Ant.Typography.Text>
              </Ant.Space>
            </Ant.Col>
            <Ant.Col>
              <Ant.Row gutter={[8, 16]}>
                <Ant.Col span={24}>
                  <Ant.Typography.Text>
                    {"نام برند"}: {data?.data?.brandName}
                  </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col>
                  <Ant.Space direction="vertical">
                    <Ant.Typography.Text type="secondary">
                      {"کد"} :{data?.data?.code} , {"کد دوم"} :
                      {data?.data?.secondCode}
                    </Ant.Typography.Text>
                    <Ant.Typography.Text type="secondary">
                      {"نام کالا"}:{data?.data?.name}
                    </Ant.Typography.Text>
                    <Ant.Typography.Text type="secondary">
                      {"نام دوم کالا"}:{data?.data?.secondName}
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

export default DetailProductListDescription;
DetailProductListDescription.propTypes = {
  id: PropTypes.number,
};
