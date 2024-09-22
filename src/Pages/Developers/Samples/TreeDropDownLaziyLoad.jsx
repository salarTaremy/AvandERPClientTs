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
  // const filter = (inputValue, path) =>
  //   path.some(
  //     (option) =>
  //       option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  //   );
    // const filter = (inputValue, path) =>
    //   path.some((option) => {

    //     return (
    //       option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
    //       (option.children && option.children.some((child) => filter(inputValue, [child])))
    //     );
    //   });
      const filter = (inputValue, path) => {
        return path.some((option) => {

          if (!option || typeof option.label !== 'string') return false;


          return option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
            (option.children && option.children.length > 0 &&
              option.children.some((child) => filter(inputValue, [child])));
        });
      };


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
      console.log(newOptions,"newOptions")
      const dtAccGrpId = detailedAccData.data[0].detailedAccountGroupId
      const index = options.findIndex(item => item.id === dtAccGrpId);
      newOptions[index].children = detailedAccData.data
      setOptions(newOptions)

    }
  }, [detailedAccData]);


  const loadData = (selectedOptions) => {
    console.log(selectedOptions,"selectedOptions")
    detailedAccApiCall(url.DETAILED_ACCOUNT + '?DetailedAccountGroupId=' + selectedOptions[0].id);
  };
  return <Cascader
    fieldNames={{ label: "name", value: "id", children: "children" }}
    loading={detailedAccGroupLoading}
    options={options}
    loadData={loadData}
    showSearch={{
      filter,
    }}
    changeOnSelect />;
};

export default TreeDropDownLaziyLoad;
TreeDropDownLaziyLoad.propTypes = {
  id: PropTypes.any,
};
