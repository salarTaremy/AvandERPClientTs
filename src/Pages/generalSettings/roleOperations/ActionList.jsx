import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import qs from "qs";
import PropTypes from "prop-types";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
const ActionList = (props) => {
  const { id, roleId, updateActionId } = props;
  const listId = [];
  const listAction = [];
  const [data, loading, error, ApiCall] = useFetchWithHandler();
  useRequestManager({ error: error });
  const [dataSource, setDataSource] = useState([]);
  const [getValue, setgetValue] = useState(null);
  useEffect(() => {
    getAllActionList();
  }, []);
  useEffect(() => {
    dataSource.map((x) => {
      listAction.push({
        roleHasAccess: getValue,
        id: x.id,
        actionName: x.actionName,
        persianTitle: x.persianTitle,
        appControllerId: x.appControllerId,
      });
    });

    console.log(listId, "listId");
    console.log(dataSource, "lklklklk");
    console.log(listAction, "listAction");
  }, [getValue]);

  //====================================================================
  //                        Functions
  //====================================================================
  const getIdRow = (id, val) => {
    console.log(val.roleHasAccess, "fataaaa");
    listId.push(id);
    updateActionId(listId);
  };

  const onChange = (val) => {
    console.log(">>>>", val.target.checked);
    setgetValue(val.target.checked);
    const bb = val.target.checked;
  };

  useEffect(() => {
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
      title: "انتخاب عملیات",
      dataIndex: "",
      key: "roleHasAccess",

      width: 50,
      align: "center",
      render: (text, val) => (
        <>
          <h1>{getValue ? "Checked" : "Not checked"}</h1>

          <Ant.Form.Item   name={[record.key, "roleHasAccess"]}>
            <Ant.Checkbox
              defaultChecked={text.roleHasAccess}
              onChange={onChange}
              onClick={() => getIdRow(val.id, text)}
              className="text-blue-600"
            />
          </Ant.Form.Item>
        </>
      ),
    },
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
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton loading={loading}>
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          className="mt-5"
          bordered={false}
          pagination={false}
          columns={cl}
          dataSource={dataSource || null}
        />
      </Ant.Skeleton>
      <pre>{JSON.stringify(dataSource, null, 2)}</pre>
    </>
  );
};
ActionList.propTypes = {
  id: PropTypes.any,
  updateActionId: PropTypes.func,
};

export default ActionList;
