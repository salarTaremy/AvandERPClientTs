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
import { MdDescription } from "react-icons/md";
import {
  UserOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { TbBuildingWarehouse } from "react-icons/tb";

//====================================================================
//                        Declaration
//====================================================================

const CustomerDescription = (props) => {
  const { id, onSuccess } = props;
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
  const [data, loading, error] = api.useFetch(`${url.CUSTOMER}/${id}`);
  useRequestManager({ error: error });
  const counterpartyTypeId = data?.data?.counterpartyTypeId;

  //====================================================================
  //                        Functions
  //======================================================================
  const getCounterpartyTypeColor = () => {
    switch (counterpartyTypeId) {
      case COUNTERPARTY_TYPE.Individual:
        return COUNTERPARTY_ICON_COLOR.Individual;
      case COUNTERPARTY_TYPE.Institution:
        return COUNTERPARTY_ICON_COLOR.Institution;
      case COUNTERPARTY_TYPE.CivicParticipation:
        return COUNTERPARTY_ICON_COLOR.CivicParticipation;
      case COUNTERPARTY_TYPE.ForeignIndividual:
        return COUNTERPARTY_ICON_COLOR.ForeignIndividual;
      default:
        return "gray";
    }
  };

  const onSuccessEdit = () => {
    setModalState(false);
    onSuccess();
  };

  const onViewCounterparty = () => {
    setModalContent(
      <CounterpartyInformation
        id={data?.data?.counterpartyId}
      />,
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
      <ModalHeader title={"جزئیات مشتری"} icon={<MdDescription />} />
      <Ant.Skeleton active loading={loading}>

        <Ant.Badge.Ribbon
          text={`${data?.data?.counterpartyTypeTitle} `}
          color={getCounterpartyTypeColor()}
        >
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
                      backgroundColor: getCounterpartyTypeColor(),
                    }}
                  >
                    {counterpartyTypeId === COUNTERPARTY_TYPE.Individual && (
                      <UserOutlined className="text-3xl" />
                    )}
                    {counterpartyTypeId === COUNTERPARTY_TYPE.Institution && (
                      <TbBuildingWarehouse className="text-4xl" />
                    )}
                    {counterpartyTypeId ===
                      COUNTERPARTY_TYPE.ForeignIndividual && (
                      <UserSwitchOutlined className="text-3xl" />
                    )}
                    {counterpartyTypeId ===
                      COUNTERPARTY_TYPE.CivicParticipation && (
                      <TeamOutlined className="text-3xl" />
                    )}
                  </Ant.Avatar>
                  <Ant.Typography.Text type="secondary">
                    {"شناسه"} :{data?.data?.id}
                  </Ant.Typography.Text>
                </Ant.Space>
              </Ant.Col>
              <Ant.Col xs={24} sm={18} md={18} lg={18}>
                <Ant.Row gutter={[8, 16]}>
                  <Ant.Col span={24}>
                    <Ant.Typography.Text>
                      {" نام و نام خانوادگی"} :{data?.data?.firstName}{" "}
                      {data?.data?.lastName}
                    </Ant.Typography.Text>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={24} md={16} lg={16}>
                    <>
                      <Ant.Space direction="vertical">
                        <Ant.Typography.Text type="secondary">
                          {"کد"} :{data?.data?.code} , {"کد دوم"} :
                          {data?.data?.secondCode}
                        </Ant.Typography.Text>

                        <Ant.Typography.Text type="secondary">
                          {"عنوان شرکت"} :{data?.data?.companyTitle}
                        </Ant.Typography.Text>

                        <Ant.Typography.Text type="secondary">
                          {"طرف حساب "} :
                          <Typography.Link
                            onClick={() =>
                              onViewCounterparty(
                                data?.data?.relatedCounterpartyName,
                              )
                            }
                          >
                            {data?.data?.relatedCounterpartyName}
                          </Typography.Link>
                        </Ant.Typography.Text>
                      </Ant.Space>
                    </>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={24} md={8} lg={8}>
                    <Ant.Space direction="vertical">
                      <Ant.Typography.Text type="secondary">
                        {"نام شعبه "} :{data?.data?.branchName}
                      </Ant.Typography.Text>
                      <Ant.Typography.Text type="secondary">
                        {"رتبه مشتری"} :{data?.data?.gradeName}
                      </Ant.Typography.Text>
                      <Ant.Typography.Text type="secondary">
                        {"نوع فروش"} :{data?.data?.typeName}
                      </Ant.Typography.Text>

                      <Ant.Typography.Text type="secondary">
                        {"نام گروه"} :{data?.data?.groupName}
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
export default CustomerDescription;
CustomerDescription.propTypes = {
  id: PropTypes.number,
};
