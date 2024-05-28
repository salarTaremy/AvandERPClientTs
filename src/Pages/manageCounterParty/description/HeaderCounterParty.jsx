import React from "react";
import * as Ant from "antd";
import PropTypes from 'prop-types'
const HeaderCounterParty = ({ data }) => {
  const borderedItems = [
    {
      key: "1",
      label: "کد",
      children: data?.data?.code,
    },
    {
      key: "2",
      label: "نام",
      children: data?.data?.firstName,
    },
    {
      key: "3",
      label: "نام خانوادگی",
      children: data?.data?.lastName,
    },
    {
      key: "4",
      label: "نام پدر",
      children: data?.data?.fatherName,
    },
    {
      key: "5",
      label: "نام حساب تفصیل",
      children: data?.data?.detailedAccountName,
    },
    {
      key: "6",
      label: "کد ملی",
      children: data?.data?.nationalCode,
    },
    {
      key: "6",
      label: "شماره شناسنامه",
      children: data?.data?.birthCertificateNumber,
    },
    {
      key: "7",
      label: "تاریخ تولد",
      children: data?.data?.birthDate,
    },
    {
      key: "8",
      label: "کد اقتصادی",
      children: data?.data?.economicCode,
    },
    {
      key: "8",
      label: "کد ملی",
      children: data?.data?.nationalCode,
    },
    {
      key: "9",
      label: " ایمیل",
      children: data?.data?.email,
    },
  ];
  return (
    <>
      <Ant.Descriptions
        bordered
        layout="vertical"
        title={"جزئیات طرف حساب"}
        size={"middle"}
        items={borderedItems}
      />
    </>
  );
};
export default HeaderCounterParty;
