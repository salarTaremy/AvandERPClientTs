import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { useFetchWithHandler } from "@/api";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { COUNTERPARTY_TYPE, COUNTERPARTY_ICON_COLOR } from "@/staticValues";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { FiEdit } from "react-icons/fi";
import { MdDescription } from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";
import {
  UserOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import CoustomContent from "@/components/common/CoustomContent";
import {
  green,
  gold,
  cyan,
  volcano,
  purple,
  magenta,
} from "@ant-design/colors";

const HeaderCounterParty = ({ id, onHeaderEdit }) => {
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [
    counterpartyData,
    counterpartyLoadingData,
    counterpartyError,
    counterpartyApiCall,
  ] = useFetchWithHandler();
  useRequestManager({ error: counterpartyError });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    handleCounterParty();
  }, [id]);

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

  const handleCounterParty = async () => {
    await counterpartyApiCall(`${url.COUNTER_PARTY}/${id}`);
  };

  const counterpartyTypeId = counterpartyData?.data?.counterpartyTypeId;
  const counterpartyInfo = (
    <>
      <Ant.Badge.Ribbon
        text={counterpartyData?.data?.counterpartyType}
        color={getCounterpartyTypeColor()}
      >
        <CoustomContent type="inner" bordered={false} shadow={true}>
          <Ant.Row>
            <Ant.Col span={24}>
              <CoustomContent bordered={false} shadow={false}>
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
                          backgroundColor: getCounterpartyTypeColor(),
                        }}
                      >
                        {counterpartyTypeId ===
                          COUNTERPARTY_TYPE.Individual && (
                          <UserOutlined className="text-3xl" />
                        )}
                        {counterpartyTypeId ===
                          COUNTERPARTY_TYPE.Institution && (
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
                      <Ant.Space direction="horizontal">
                        <Ant.Badge
                          color={
                            (counterpartyData?.data?.isActive && "green") ||
                            "red"
                          }
                        />
                        <Ant.Typography.Text type="secondary">
                          {(counterpartyData?.data?.isActive && "فعال") ||
                            "غیرفعال"}
                        </Ant.Typography.Text>
                      </Ant.Space>
                    </Ant.Space>
                  </Ant.Col>
                  <Ant.Col xs={24} sm={18} md={18} lg={18}>
                    <Ant.Row gutter={[8, 16]}>
                      <Ant.Col span={24}>
                        <Ant.Typography.Text className="text-base leading-9">
                          {counterpartyTypeId !=
                            COUNTERPARTY_TYPE.Institution &&
                            `${counterpartyData?.data?.code} - ${counterpartyData?.data?.fullName}`}
                          {counterpartyTypeId ===
                            COUNTERPARTY_TYPE.Institution &&
                            `${counterpartyData?.data?.code} - ${counterpartyData?.data?.companyTitle} ${counterpartyData?.data?.fullName}`}
                        </Ant.Typography.Text>
                        <Ant.Tooltip title="ویرایش">
                          <Ant.Button
                            onClick={() =>
                              onHeaderEdit(counterpartyData?.data?.id)
                            }
                            className="text-blue-600"
                            icon={<FiEdit />}
                            type="text"
                          />
                        </Ant.Tooltip>
                      </Ant.Col>
                      <Ant.Col xs={24} sm={24} md={12} lg={12}>
                        <Ant.Space direction="vertical">
                          <Ant.Typography.Text type="secondary">
                            {counterpartyTypeId ===
                              COUNTERPARTY_TYPE.Individual &&
                              `کد ملی: ${counterpartyData?.data?.nationalCode ?? "-"}`}
                            {counterpartyTypeId ===
                              COUNTERPARTY_TYPE.ForeignIndividual &&
                              `کد فراگیر: ${counterpartyData?.data?.fidaCode ?? "-"}`}
                            {(counterpartyTypeId ===
                              COUNTERPARTY_TYPE.Institution ||
                              counterpartyTypeId ===
                                COUNTERPARTY_TYPE.CivicParticipation) &&
                              `شناسه ملی: ${counterpartyData?.data?.legalEntityIdentity ?? "-"}`}
                          </Ant.Typography.Text>
                          {(counterpartyTypeId ===
                            COUNTERPARTY_TYPE.Individual ||
                            counterpartyTypeId ===
                              COUNTERPARTY_TYPE.CivicParticipation) && (
                            <>
                              <Ant.Typography.Text type="secondary">
                                {`نام پدر: ${counterpartyData?.data?.fatherName ?? "-"}`}
                              </Ant.Typography.Text>
                              <Ant.Typography.Text type="secondary">
                                {`شماره شناسنامه: ${counterpartyData?.data?.birthCertificateNumber ?? "-"}`}
                              </Ant.Typography.Text>
                              <Ant.Typography.Text type="secondary">
                                {`تاریخ تولد: ${counterpartyData?.data?.birthDate ?? "-"}`}
                              </Ant.Typography.Text>
                            </>
                          )}
                          {counterpartyTypeId ===
                            COUNTERPARTY_TYPE.ForeignIndividual && (
                            <>
                              <Ant.Typography.Text type="secondary">
                                {`نام پدر: ${counterpartyData?.data?.fatherName ?? "-"}`}
                              </Ant.Typography.Text>
                              <Ant.Typography.Text type="secondary">
                                {`تاریخ تولد: ${counterpartyData?.data?.birthDate ?? "-"}`}
                              </Ant.Typography.Text>
                              <Ant.Typography.Text type="secondary">
                                {`شماره گذرنامه: ${counterpartyData?.data?.passportNumber ?? "-"}`}
                              </Ant.Typography.Text>
                              <Ant.Typography.Text type="secondary">
                                {`تاریخ اعتبار گذرنامه: ${counterpartyData?.data?.passportValidityDateTitle ?? "-"}`}
                              </Ant.Typography.Text>
                            </>
                          )}
                          {counterpartyTypeId ===
                            COUNTERPARTY_TYPE.Institution && (
                            <>
                              <Ant.Typography.Text type="secondary">
                                {`شماره ثبت: ${counterpartyData?.data?.companyRegistrationNumber ?? "-"}`}
                              </Ant.Typography.Text>
                              <Ant.Typography.Text type="secondary">
                                {`محل ثبت: ${counterpartyData?.data?.companyRegistrationPlace ?? "-"}`}
                              </Ant.Typography.Text>
                            </>
                          )}
                        </Ant.Space>
                      </Ant.Col>
                      <Ant.Col xs={24} sm={24} md={12} lg={12}>
                        <Ant.Space direction="vertical">
                          <Ant.Typography.Text type="secondary">
                            {`کد اقتصادی: ${counterpartyData?.data?.economicCode ?? "-"}`}
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {`ایمیل: ${counterpartyData?.data?.email ?? "-"}`}
                          </Ant.Typography.Text>
                          <Ant.Typography.Text type="secondary">
                            {`موقعیت جغرافیایی: ${counterpartyData?.data?.cityName ?? ""}`}
                            {counterpartyData?.data?.longitude
                              ? ` (${counterpartyData?.data?.longitude}`
                              : ""}
                            {counterpartyData?.data?.latitude
                              ? ` / ${counterpartyData?.data?.latitude})`
                              : ""}
                          </Ant.Typography.Text>
                        </Ant.Space>
                      </Ant.Col>
                    </Ant.Row>
                  </Ant.Col>
                </Ant.Row>
              </CoustomContent>
            </Ant.Col>
          </Ant.Row>
        </CoustomContent>
      </Ant.Badge.Ribbon>
    </>
  );

  return (
    <>
      <ModalHeader title={"جزئیات طرف حساب"} icon={<MdDescription />} />
      <Ant.Modal
        {...defaultValues.MODAL_PROPS}
        open={modalState}
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        centered
      >
        {modalContent}
      </Ant.Modal>
      {counterpartyData?.data == null ? (
        <Ant.Skeleton
          loading={counterpartyLoadingData}
          className="w-11/12 h-full "
        />
      ) : (
        counterpartyInfo
      )}
    </>
  );
};
export default HeaderCounterParty;
