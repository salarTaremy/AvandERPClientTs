import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import qs from "qs";
import PropTypes from "prop-types";
import { useFetchWithHandler } from "@/api";

import useRequestManager from "@/hooks/useRequestManager";
const ActionList = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { id, roleId, updateActionId } = props;
  const [data, loading, error, ApiCall] = useFetchWithHandler();
  useRequestManager({ error: error });
  const [dataSource, setDataSource] = useState(null);
  const [getValue, setgetValue] = useState(null);
  useEffect(() => {
    getAllActionList();
  }, []);
  useEffect(() => {
    console.log(getValue);
  }, [getValue]);

  //====================================================================
  //                        Functions
  //====================================================================


  useEffect(() => {
    const TmpSelected = []
    if (data?.isSuccess && data?.data) {
      data?.data.map((item) => {
        if (item.roleHasAccess) {
          TmpSelected.push(item.id)
        }
      })
    }
    setSelectedRowKeys([...TmpSelected])

    setDataSource((data?.isSuccess && data?.data) || null);
  }, [data]);

  const getAllActionList = async () => {
    const queryString = qs.stringify({
      AppControllerId: id,
      RoleId: roleId,
    });
    await ApiCall(`${url.ACTIONS}?${queryString}`);
  };
  //====================================================================
  const cl = [
    {
      title: "نام عملیات",
      dataIndex: "actionName",
      key: "actionName",
      width: 100,
      render: (text, record) => <>{text}</>,
    },
    {
      title: "عنوان",
      dataIndex: "persianTitle",
      key: "persianTitle",
      width: 100,
    },
  ];


  const onSelectChange = (newSelectedRowKeys) => {
    debugger
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    updateActionId(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };



  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      {/* <pre>
        {JSON.stringify(selectedRowKeys, null, 2)}
      </pre> */}
      <Ant.Skeleton loading={loading}>
        <Ant.Table
          rowSelection={rowSelection}
          {...defaultValues.TABLE_PROPS}
          className="mt-5"
          bordered={false}
          pagination={false}
          columns={cl}
          dataSource={dataSource || null}
        />
      </Ant.Skeleton>
    </>
  );
};
ActionList.propTypes = {
  id: PropTypes.any,
  updateActionId: PropTypes.func,
};

export default ActionList;
