import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import AddressList from "./AddressList";
import BankAccountList from "./BankAccountList";
import HeaderCounterParty from "./HeaderCounterParty";

const { TabPane } = Ant.Tabs;

const DetailedCounterPartyList = (props) => {
  const { id, onHeaderEdit } = props;
  const [data, loading, error] = api.useFetch(`${url.COUNTER_PARTY}/${id}`);
  useRequestManager({ error: error });

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active={true} loading={loading}>
        <HeaderCounterParty data={data} onHeaderEdit={onHeaderEdit} />
        <Ant.Divider />
        <Ant.Tabs type="card" defaultActiveKey="1">
          <TabPane tab="اطلاعات تماس" key="1">
            {data?.data?.addressList && data?.data?.addressList.length == 0 ? (
              <Ant.Empty />
            ) : (
              <AddressList id={id} />
            )}
          </TabPane>
          <TabPane tab="اطلاعات بانکی" key="2">
            {data?.data?.bankAccountList &&
              data?.data?.bankAccountList.length == 0 ? (
              <Ant.Empty />
            ) : (
              <BankAccountList data={data?.data?.bankAccountList} />
            )}
          </TabPane>
        </Ant.Tabs>
      </Ant.Skeleton>
    </>
  );
};

export default DetailedCounterPartyList;
DetailedCounterPartyList.propTypes = {
  id: PropTypes.number,
};
