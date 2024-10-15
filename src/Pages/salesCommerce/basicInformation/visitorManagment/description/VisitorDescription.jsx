import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import * as uuid from "uuid";
import { Typography } from "antd";
import { useFetchWithHandler } from "@/api";
import * as defaultValues from "@/defaultValues";
import useRequestManager from "@/hooks/useRequestManager";
import CustomContent from "@/components/common/CustomContent";
import ModalHeader from "@/components/common/ModalHeader";
import { COUNTERPARTY_TYPE, COUNTERPARTY_ICON_COLOR } from "@/staticValues";
import CounterpartyInformation from "@/Pages/manageCounterParty/description/CounterpartyInformation";
import FormEditCounterParty from "@/Pages/manageCounterParty/edit/FormEditCounterParty";

import { RiUserLocationLine } from "react-icons/ri";
import { TbBuildingWarehouse } from "react-icons/tb";

//====================================================================
//                        Declaration
//====================================================================

const VisitorDescription = (props) => {
  const { id, onSuccess } = props;
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
  const [data, loading, error] = api.useFetch(`${url.VISITOR}/${id}`);
  useRequestManager({ error: error });
  const counterpartyTypeId = data?.data?.counterpartyTypeId;

  //====================================================================
  //                        Functions
  //======================================================================

  const onViewCounterparty = () => {
    setModalContent(
      <CounterpartyInformation id={data?.data?.counterpartyId} />,
    );
    setModalState(true);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        open={modalState}
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        {...defaultValues.MODAL_PROPS}
        {...modalSize}
        centered
      >
        {modalContent}
      </Ant.Modal>
      <ModalHeader title={"جزئیات ویزیتور"} icon={<RiUserLocationLine />} />
      <Ant.Skeleton active loading={loading}>
        <Ant.Badge.Ribbon text={`${data?.data?.branchName} `} color="#87d068">
          <CustomContent bordered>
            <Ant.Row>
              <Ant.Col xs={24} sm={6} md={6} lg={6}>
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
                    icon={<RiUserLocationLine />}
                  />

                  <Ant.Typography.Text type="secondary">
                    {"شناسه"} :{data?.data?.id}
                  </Ant.Typography.Text>
                </Ant.Space>
              </Ant.Col>
              <Ant.Col xs={24} sm={16} md={16} lg={16}>
                <Ant.Row gutter={[8, 16]}>
                  <Ant.Col span={24}>
                    <Ant.Space direction="vertical">
                      <Ant.Typography.Text type="secondary">
                        {"کد"} :{data?.data?.code}
                      </Ant.Typography.Text>
                      <Ant.Typography.Text type="secondary">
                        {" نام و نام خانوادگی"} :{" "}
                        <Typography.Link
                          onClick={() =>
                            onViewCounterparty(data?.data?.fullName)
                          }
                        >
                          {data?.data?.fullName}
                        </Typography.Link>
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
export default VisitorDescription;
VisitorDescription.propTypes = {
  id: PropTypes.number,
};
