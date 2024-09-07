import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import AddressList from "./AddressList";
import BankAccountList from "./BankAccountList";
import HeaderCounterParty from "./HeaderCounterParty";
import CoustomContent from "@/components/common/CoustomContent";

const { TabPane } = Ant.Tabs;

const DetailedCounterPartyList = (props) => {
  const { id, onHeaderEdit } = props;
  const [dataFromChild, setDataFromChild] = useState("");

  //====================================================================
  //                        Functions
  //====================================================================
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <CoustomContent height="80vh">
        {/* <Ant.Skeleton  > */}
        <HeaderCounterParty
          id={id}
          onHeaderEdit={onHeaderEdit}
          sendDataToParent={handleDataFromChild}
        />
        <Ant.Divider />
        <Ant.Tabs type="card" defaultActiveKey="1">
          <TabPane tab="اطلاعات تماس" key="1">
            {dataFromChild?.addressList &&
            dataFromChild?.addressList.length == 0 ? (
              <Ant.Empty />
            ) : (
              <AddressList id={id} />
            )}
          </TabPane>
          <TabPane tab="اطلاعات بانکی" key="2">
            {dataFromChild?.bankAccountList &&
            dataFromChild?.bankAccountList.length == 0 ? (
              <Ant.Empty />
            ) : (
              <BankAccountList data={dataFromChild?.data?.bankAccountList} />
            )}
          </TabPane>
        </Ant.Tabs>
        {/* </Ant.Skeleton> */}
      </CoustomContent>
    </>
  );
};

export default DetailedCounterPartyList;
DetailedCounterPartyList.propTypes = {
  id: PropTypes.number,
};
