import React, { useEffect, useState } from "react";
import { useFetchWithHandler } from "@/api";
import * as Ant from "antd";
import * as url from "@/api/url";
import qs from "qs";
import { PhoneOutlined, RightOutlined } from "@ant-design/icons";
import { PiAddressBook } from "react-icons/pi";

const AddressList = ({ id }) => {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [items, setItems] = useState(null);
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    listData?.isSuccess && createAddressItems(listData?.data);
  }, [listData]);

  useEffect(() => {
    console.log(id,"idid")
    getDescriptiontById();
  }, []);

  //=====================================================================
  //                        Functions
  //=====================================================================
  const getDescriptiontById = async () => {
    const queryString = qs.stringify({
      CounterpartyId: id,
    });
    await ApiCall(`${url.COUNTERPARTY_ADDRESS}?${queryString}`);
  };

  const createAddressItems = (listData) => {
    let itemList = [];
    listData?.map((addressItem) => {
      //====================================================
      //    create list items for phone-numbers
      //====================================================
      const renderPhoneList = (phoneItem) => {
        return (
          <Ant.List.Item key={phoneItem.id} style={{ borderBlockEnd: "none" }}>
            <Ant.Avatar
              style={{ backgroundColor: "transparent" }}
              icon={<PhoneOutlined />}
            />
            <Ant.Typography.Text>{`${phoneItem.title}: `}</Ant.Typography.Text>
            <Ant.Typography.Text>{phoneItem.phoneNumber}</Ant.Typography.Text>
          </Ant.List.Item>
        );
      };

      //====================================================
      //    create list react-node for phone-numbers
      //====================================================
      const phoneCount = addressItem.phoneNumberList?.length;
      const phoneList = phoneCount > 0 && (
        <Ant.List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={addressItem?.phoneNumberList}
          renderItem={renderPhoneList}
        />
      );

      const showArrow = phoneCount > 0;

      itemList.push({
        key: addressItem.id,
        label: (
          <>
            <Ant.Space wrap>
              <PiAddressBook size={20} className="text-indigo-600" />
              <Ant.Typography.Text strong>
                {`نشانی ${addressItem.title}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {`${addressItem.provinceName} - ${addressItem.cityName} - ${addressItem.address}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {`کد پستی: ${addressItem.postalCode}`}
              </Ant.Typography.Text>
            </Ant.Space>
          </>
        ),
        children: <>{phoneList}</>,
        showArrow: showArrow,
        collapsible: `${!showArrow ? "disabled" : ""}`,
      });
    });

    setItems(itemList);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active loading={loadingData}>
        <Ant.Collapse
          items={items}
          expandIconPosition="end"
          expandIcon={({ isActive }) => {
            return <RightOutlined rotate={isActive ? -90 : 0} />;
          }}
        />
      </Ant.Skeleton>
    </>
  );
};
export default AddressList;
