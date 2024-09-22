import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";
import qs from "qs";
import * as defaultValues from "@/defaultValues";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import useAllLoading from "@/hooks/useAllLoading ";
//====================================================================
//                        Declaration
//====================================================================
const BlankPage = (props) => {
  const { id } = props;
  const pageTitle = "شرح صفحه";
  // const [Data, Loading, Error, ApiCall] = api.useFetchWithHandler()
  // useRequestManager({ error: Error })
  //...
  //====================================================================
  //                        useEffects
  //====================================================================
  //useEffect(() => {}, [])
  //...
  //====================================================================
  //                        Functions
  //====================================================================
  // const onFinish = async (values) => {
  //   const req = { ...values}
  //   await ApiCall(url.ACCOUNT, req)
  // }
  //...
  //====================================================================
  //                        Child Components
  //====================================================================
  const BlankPage = () => {
    return (
      <>
        <Ant.Form.Item label={"نام"} rules={[{ required: true }]}>
          <Ant.Select
            allowClear
            showSearch
            placeholder="Select a person"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Jack",
              },
              {
                value: "2",
                label: "Lucy",
              },
              {
                value: "3",
                label: "Tom",
              },
            ]}
          />
          <Ant.InputNumber
            allowClear
            min={0}
            max={100}
            step={"0.01"}
            stringMode
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>
        <p>{"......"}</p>
        <p>{"......"}</p>
        <p>{"......"}</p>
        <p>{"......"}</p>
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Card
      style={{ ...styles.CARD_DEFAULT_STYLES }}
      loading={false}
      title={pageTitle}
      type="inner"
    >
      <BlankPage />
      {/* Write Code Here */}
    </Ant.Card>
  );
};

export default BlankPage;
BlankPage.propTypes = {
  id: PropTypes.any,
};
