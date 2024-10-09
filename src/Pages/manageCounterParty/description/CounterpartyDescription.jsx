import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import AddressList from "./AddressList";
import BankAccountList from "./BankAccountList";
import CounterpartyInformation from "./CounterpartyInformation";
import CustomContent from "@/components/common/CustomContent";

const CounterpartyDescription = (props) => {
  const { id } = props;
  const [data, loading, error] = api.useFetch(`${url.COUNTER_PARTY}/${id}`);
  useRequestManager({ error: error });

  const items = [
    {
      label: "اطلاعات تماس",
      key: "1",
      children: data?.data?.addressList?.length === 0 ? (
        <Ant.Empty />
      ) : (
        <AddressList id={id} />
      ),
    },
    {
      label: "اطلاعات بانکی",
      key: "2",
      children: data?.data?.bankAccountList?.length === 0 ? (
        <Ant.Empty />
      ) : (
        <BankAccountList counterpartyId={id} />
      ),
    },
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <CustomContent height="80vh">
      <Ant.Skeleton active loading={loading}>
        <CounterpartyInformation id={id}/>
        <Ant.Divider />
        <Ant.Tabs
          type="card"
          defaultActiveKey="1"
          items={items.map(item => ({
            key: item.key,
            label: item.label,
            children: item.children,
          }))}
        />
      </Ant.Skeleton>
    </CustomContent>
  );
};

CounterpartyDescription.propTypes = {
  id: PropTypes.number.isRequired
};

export default CounterpartyDescription;