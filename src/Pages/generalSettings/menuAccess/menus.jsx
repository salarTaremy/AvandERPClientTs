import React, { useState, useEffect } from "react";

import * as styles from "@/styles";
import * as Ant from "antd";
import * as url from "@/api/url";
import qs from "qs";
import { useFetchWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const Menus = () => {
  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [idRol, setIdRol] = useState(0);
  const [disable, setDisable] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [items, setItems] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [data, loading, error, apiCall] = useFetchWithHandler();
  const [roleScopeData, roleScopeLoading, roleScopeError] = useFetch(
    url.ROLE_SCOPE,
  );
  const [roleData, roleLoading, roleError, roleApi] = useFetchWithHandler();
  useRequestManager({ error: roleScopeError });
  useRequestManager({ error: roleError });
  const [form] = Ant.Form.useForm();
  useEffect(() => {
    apiCall(url.NAV_MENU_TREE);
  }, []);

  useEffect(() => {
    const dataList = data?.data[0]?.children;
    setItems(dataList);
  }, [data?.data]);

  useRequestManager({ error });
  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    setDisableButton(false);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };
  const onsubmit = () => {
    // setDisableButton(false);
  };
  const onChangeRoleScope = async (val) => {
    console.log(val, "val");
    const data = qs.stringify({
      Id: parseInt(val),
    });
    await roleApi(`${url.ROLE}?${data}`);
    setDisable(false);
  };
  return (
    <Ant.Card Card title={"دسترسی منوها"} type="inner">
      <Ant.Row  gutter={[16, 16]}>
        <Ant.Col lg={12} md={12} sm={24} xs={24}>
          <Ant.Card
            className="w-full"
            style={{ ...styles.CARD_DEFAULT_STYLES }}
          >
            <Ant.Form form={form} layout="vertical" onFinish={null}>
            <Ant.Row gutter={[8, 8]} >
              <Ant.Col  md={12} lg={12} sm={24} xs={24}>
                <Ant.Form.Item
                  name={"accountTypeId"}
                  label="محدود نقش"
                  rules={[{ required: true }]}
                >
                  <Ant.Select
                    onChange={(value) => onChangeRoleScope(value)}
                    placeholder={"انتخاب کنید..."}
                    disabled={roleScopeLoading || false}
                    loading={roleScopeLoading}
                    options={roleScopeData?.data}
                    fieldNames={{ label: "name", value: "id" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              <Ant.Col lg={12} md={12} sm={24} xs={24}>
                <Ant.Form.Item
                  name={"role"}
                  label="نقش"
                  rules={[{ required: true }]}
                >
                  <Ant.Select
                    placeholder={"انتخاب کنید..."}
                    onChange={(value) => setIdRol(value)}
                    disabled={disable}
                    loading={roleLoading}
                    options={roleData?.data}
                    fieldNames={{ label: "name", value: "roleScopeId" }}
                  />
                </Ant.Form.Item>
              </Ant.Col>
              </Ant.Row>
              <Ant.Col className="text-center" span={24} md={24} lg={24} xs={24}>
                <Ant.Button
                  disabled={disableButton}
                  onClick={onsubmit}
                  block
                  key="submit"
                  type="primary"
                >
                  تایید
                </Ant.Button>
              </Ant.Col>
            </Ant.Form>
          </Ant.Card>
        </Ant.Col>
        <Ant.Col span={24} md={12} sm={24} xs={24}>
          <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}>
            <Ant.Skeleton loading={loading}>
              <Ant.Tree
                disabled={disable}
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={items}
              />
            </Ant.Skeleton>
          </Ant.Card>
        </Ant.Col>
      </Ant.Row>
    </Ant.Card>
  );
};
export default Menus;
