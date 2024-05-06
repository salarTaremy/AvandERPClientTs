import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { AiOutlinePhone } from "react-icons/ai";

const AccountNumberList = ({ data }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <>
          <br/>
            <AiOutlinePhone /> {item.accountNumber}
          </>
        );
      })}
    </>
  );
};
const PhoneNumberList = ({ data }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <>
          <br/>
            <AiOutlinePhone /> {item.phoneNumber}
          </>
        );
      })}
    </>
  );
};

const DetailedCounterPartyList = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.COUNTER_PARTY}/${id}`);
  useRequestManager({ error: error });
  const borderedItems = [
    {
      key: "1",
      label: "شناسه",
      children: data?.data?.id,
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
      children: data?.data?.birthDateCalendarId
        ?.toString()
        .replace(/\B(?=(\d{2})+(?!\d))/g, "/"),
    },
    {
      key: "8",
      label: "کد اقتصادی",
      children: data?.data?.economicCode,
    },
    // {
    //   key: "9",
    //   label: "ایمیل",
    //   children: data?.data?.email,
    // },
    {
      key: "10",
      label: "اطلاعات تماس",
      span: 3,
      children: <PhoneNumberList data={data?.data?.phoneNumberList} />,
    },
    {
      key: "11",
      label: "اطلاعات آدرس",
      span: 3,
      // children: data?.data?.addressList,
    },
    {
      key: "12",
      label: "اطلاعات بانکی",
      span: 3,
      children: <AccountNumberList data={data?.data?.bankAccountList} />,
      // children:
      //   data?.data?.bankAccountList &&
      //   data?.data?.bankAccountList.map((item) => {
      //     <>
      //       <ul>
      //         <li>{item?.accountNumber}</li>
      //       </ul>
      //     </>;

      //   }),

      // render: (text, val) => (
      //   <>
      //   {'test'}
      //       {/* <pre>{JSON.stringify(text, null, 2)}</pre>
      //       <pre>{JSON.stringify(val, null, 2)}</pre> */}
      //        </>
      // ),
    },
  ];
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Skeleton active={true} loading={loading}>
      <Ant.Descriptions
        bordered
        layout="vertical"
        title={"جزئیات طرف حساب"}
        size={"middle"}
        items={borderedItems}
      />
    </Ant.Skeleton>
  );
};

export default DetailedCounterPartyList;
DetailedCounterPartyList.propTypes = {
  id: PropTypes.number,
};
