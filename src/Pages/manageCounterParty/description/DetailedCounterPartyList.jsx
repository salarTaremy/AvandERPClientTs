import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { AiOutlinePhone } from "react-icons/ai";
import AddressList from "./AddressList";
import BankAccountList from "./BankAccountList";
import PhoneNumberList from "./PhoneNumberList";
import HeaderCounterParty from "./HeaderCounterParty";
// import Informationccounts from "./Informationccounts";
const { TabPane } = Ant.Tabs;

const DetailedCounterPartyList = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.COUNTER_PARTY}/${id}`);
  useRequestManager({ error: error });
  // const borderedItems = [
  //   {
  //     key: "1",
  //     label: "کد",
  //     children: data?.data?.code,
  //   },
  //   {
  //     key: "2",
  //     label: "نام",
  //     children: data?.data?.firstName,
  //   },
  //   {
  //     key: "3",
  //     label: "نام خانوادگی",
  //     children: data?.data?.lastName,
  //   },
  //   {
  //     key: "4",
  //     label: "نام پدر",
  //     children: data?.data?.fatherName,
  //   },
  //   {
  //     key: "5",
  //     label: "نام حساب تفصیل",
  //     children: data?.data?.detailedAccountName,
  //   },
  //   {
  //     key: "6",
  //     label: "کد ملی",
  //     children: data?.data?.nationalCode,
  //   },
  //   {
  //     key: "6",
  //     label: "شماره شناسنامه",
  //     children: data?.data?.birthCertificateNumber,
  //   },
  //   {
  //     key: "7",
  //     label: "تاریخ تولد",
  //     children: data?.data?.birthDate,
  //   },
  //   {
  //     key: "8",
  //     label: "کد اقتصادی",
  //     children: data?.data?.economicCode,
  //   },
  //   // {
  //   //   key: "9",
  //   //   label: "ایمیل",
  //   //   children: data?.data?.email,
  //   // },
  //   // {
  //   //   key: "10",
  //   //   label: "اطلاعات تماس",
  //   //   span: 3,
  //   //   children: <PhoneNumberList data={data?.data?.phoneNumberList} />,
  //   // },
  //   // {
  //   //   key: "11",
  //   //   label: "اطلاعات آدرس",
  //   //   span: 3,
  //   //   children: <AddressList data={data?.data?.addressList} />,
  //   // },
  //   // {
  //   //   key: "12",
  //   //   label: "اطلاعات بانکی",
  //   //   span: 3,
  //   //   children: <BankAccountList data={data?.data?.bankAccountList} />,

  //   // },
  // ];
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active={true} loading={loading}>
        <HeaderCounterParty data={data} />
        <Ant.Divider />
        <Ant.Tabs type="card" defaultActiveKey="1">
          <TabPane tab="اطلاعات تماس " key="1">
            {data?.data?.phoneNumberList &&
            data?.data?.phoneNumberList.length == 0 ? (
              <Ant.Empty />
            ) : (
              <PhoneNumberList data={data?.data?.phoneNumberList} />
            )}
          </TabPane>
          <TabPane tab="اطلاعات آدرس" key="2">
            {data?.data?.addressList && data?.data?.addressList.length == 0 ? (
              <Ant.Empty />
            ) : (
              <AddressList data={data?.data?.addressList} />
            )}
          </TabPane>
          <TabPane tab="اطلاعات بانکی" key="3">
            {data?.data?.bankAccountList &&
            data?.data?.bankAccountList.length == 0 ? (
              <Ant.Empty />
            ) : (
              <BankAccountList data={data?.data?.bankAccountList} />
            )}
          </TabPane>
          {/* <TabPane tab="اطلاعات تکمیلی طرف حساب ها" key="4">
            {data?.data?.branchCode && data?.data?.branchCode == 0 ? (
              <Ant.Empty />
            ) : (
              <Informationccounts />
            )}
          </TabPane> */}
        </Ant.Tabs>
      </Ant.Skeleton>
    </>
  );
};

export default DetailedCounterPartyList;
DetailedCounterPartyList.propTypes = {
  id: PropTypes.number,
};
