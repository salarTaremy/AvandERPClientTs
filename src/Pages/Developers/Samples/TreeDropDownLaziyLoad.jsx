import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Cascader } from 'antd';
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const TreeDropDownLaziyLoad = (props) => {
  const [options, setOptions] = useState([])

  const [
    detailedAccGroupData,
    detailedAccGroupLoading,
    detailedAccGroupError,
    detailedAccGroupApiCall,
  ] = api.useFetchWithHandler();

  const [
    detailedAccData,
    detailedAccLoading,
    detailedAccError,
    detailedAccApiCall,
  ] = api.useFetchWithHandler();

  useRequestManager({ error: detailedAccGroupError });

  useEffect(() => {
    detailedAccGroupApiCall(url.DETAILED_ACCOUNT_GROUP);
  }, []);

  useEffect(() => {
    setOptions(detailedAccGroupData?.data && detailedAccGroupData?.data)
  }, [detailedAccGroupData]);

  useEffect(() => {
    if (detailedAccData?.isSuccess && detailedAccData?.data && detailedAccData?.data.length > 0) {
      const newOptions = [...options]
      const dtAccGrpId = detailedAccData.data[0].detailedAccountGroupId
      const index = options.findIndex(item => item.id === dtAccGrpId);
      newOptions[index].children = detailedAccData.data
      setOptions(newOptions)

    }
  }, [detailedAccData]);

  const loadData = (selectedOptions) => {
    detailedAccApiCall(url.DETAILED_ACCOUNT + '?DetailedAccountGroupId=' + selectedOptions[0].id);
  };
  return <Cascader
    fieldNames={{ label: "name", value: "id", children: "children" }}
    loading={detailedAccGroupLoading}
    options={options}
    loadData={loadData}
    changeOnSelect />;
};

export default TreeDropDownLaziyLoad;
TreeDropDownLaziyLoad.propTypes = {
  id: PropTypes.any,
};
