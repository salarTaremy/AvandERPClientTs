import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import CustomContent from "@/components/common/CustomContent";
import { MdDescription } from "react-icons/md";

import { MdOutlineWarehouse } from "react-icons/md";

const DetailWareHouse = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.WAREHOUSE}/${id}`);
  useRequestManager({ error: error });

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active loading={loading}>
      <ModalHeader title={"جزئیات انبار"} icon={<MdDescription />} />

      <Ant.Badge.Ribbon color="orange" text={`${data?.data?.warehouseType} `}>
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
                    backgroundColor: "orange",
                  }}
                  icon={<MdOutlineWarehouse />}
                />

                <Ant.Typography.Text type="secondary">
                  {"شناسه"} :{data?.data?.id}
                </Ant.Typography.Text>
              </Ant.Space>
            </Ant.Col>
            <Ant.Col xs={24} sm={18} md={18} lg={18}>
              <Ant.Row gutter={[8, 16]}>
                <Ant.Col span={24}>
                  <Ant.Typography.Text>
                    {"نام انبار"} : {data?.data?.title}
                  </Ant.Typography.Text>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={12}>
                  <Ant.Space direction="vertical">
                    <Ant.Typography.Text type="secondary">
                      {" نوع انبار"} : {data?.data?.warehouseType}
                    </Ant.Typography.Text>
                    <Ant.Typography.Text type="secondary">
                      {"کدپستی"} : {data?.data?.postalCode}
                    </Ant.Typography.Text>
                    <Ant.Typography.Text type="secondary">
                      {"آدرس"} : {data?.data?.address}
                    </Ant.Typography.Text>
                  </Ant.Space>
                </Ant.Col>
                <Ant.Col xs={24} sm={24} md={12} lg={12}>
                  <Ant.Space direction="vertical">
                    <Ant.Typography.Text type="secondary">
                      {"GLN"} :{data?.data?.gln}
                    </Ant.Typography.Text>
                    <Ant.Typography.Text type="secondary">
                      {"کد"} : {data?.data?.code}
                    </Ant.Typography.Text>

                    <Ant.Typography.Text type="secondary">
                      {"مسول انبار"} :{data?.data?.warehouseKeeperName}
                    </Ant.Typography.Text>

                    <Ant.Typography.Text type="secondary">
                      {"توضیحات"} :{data?.data?.description}
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

export default DetailWareHouse;
DetailWareHouse.propTypes = {
  id: PropTypes.number,
};
