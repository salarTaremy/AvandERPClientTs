import React, { useEffect, useState } from "react";
import { useFetchWithHandler } from '@/api'
import * as Ant from "antd";
import * as url from "@/api/url";
import { FaPhoneSquare } from "react-icons/fa";
import qs from "qs";
import { FaAddressCard } from "react-icons/fa6";


const AddressList = ({ id }) => {
  const [dataSource, setDataSource] = useState(null);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [items, setItems] = useState(null);

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
    createAddressItems(listData?.data);
  }, [listData]);

  useEffect(() => {
    getDescriptiontById()
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
    setItems(listData?.map((item, index) => {
      const address =
        <div>
          <div> <FaAddressCard /> {item.title} </div>
          <div>نشانی: {item.provinceName} - {item.cityName} - {item.address} </div>
          <div> کد پستی: {item.postalCode}</div>
        </div>;

      const phoneNumbers = item.phoneNumberList?.map((phoneItem) => {
        return (<div><FaPhoneSquare /> {phoneItem.title} : {phoneItem.phoneNumber}</div>)
      });

      return {
        key: index,
        label: address,
        children: phoneNumbers
      }
    }))
  }

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active  loading={loadingData}>
        <Ant.Collapse accordion items={items} />
      </Ant.Skeleton>
    </>
  )

};
export default AddressList;
