import React, { useState, useEffect } from "react";

import * as styles from "@/styles";
import * as Ant from "antd";
import * as url from "@/api/url";
import qs from "qs";
import { useFetchWithHandler, useFetch, usePutWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
const Menus = () => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [idRol, setIdRol] = useState(0);
  const [disable, setDisable] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [items, setItems] = useState([]);
  const [showErrore, setShowError] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [data, loading, error, apiCall] = useFetchWithHandler();
  const [roleScopeData, roleScopeLoading, roleScopeError] = useFetch(
    url.ROLE_SCOPE,
  );
  const [
    listRoleNavMenuAssignment,
    loadingRoleNavMenuAssignment,
    errorRoleNavMenuAssignment,
    apiCallRoleNavMenuAssignment,
  ] = usePutWithHandler();
  const [roleData, roleLoading, roleError, roleApi] = useFetchWithHandler();
  useRequestManager({ error: roleScopeError });
  useRequestManager({ error: roleError });
  useRequestManager({
    error: errorRoleNavMenuAssignment,
    data: listRoleNavMenuAssignment,
    loading: loadingRoleNavMenuAssignment,
  });
  const checked = [];
  const [form] = Ant.Form.useForm();

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    getAllMenus();
  }, [idRol]);

  useEffect(() => {
    buildCheckedKeys();
  }, [items]);

  useEffect(() => {
    setItems((data?.isSuccess && data?.data[0]?.children) || null);
  }, [data?.data]);

  //====================================================================
  //                        Events
  //====================================================================
  const buildCheckedKeys = () => {

    items?.forEach((item) => {
      if (item?.roleHasAccess) {
        checked.push(item.key);
      }
    });
    setCheckedKeys(checked);
    return checked;
  };

  useRequestManager({ error });
  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
    setDisableButton(false);
  };
  const onSelect = (selectedKeysValue) => {
    setSelectedKeys(selectedKeysValue);
  };

  //====================================================================
  //                        Functions
  //====================================================================
  const getAllMenus = async () => {
    const queryString = qs.stringify({
      roleId: idRol,
    });
    await apiCall(`${url.NAV_MENU_TREE}?${queryString}`);
  };
  const onFinish = async (value) => {
    const req = { roleId: value.role, entityIdList: checkedKeys };
    await apiCallRoleNavMenuAssignment(url.UPDATE_ROLE_NAV_MENU, req);
  };
  const onChangeRoleScope = async (val) => {
    const data = qs.stringify({
      RoleScopeId: parseInt(val),
    });
    await roleApi(`${url.ROLE}?${data}`);
    form.setFieldsValue({ role: undefined });
    setItems((data?.isSuccess && data?.data[0]?.children) || null);
    setDisable(false);
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Card Card title={"دسترسی منوها"} type="inner">
      <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
        <Ant.Row gutter={[8, 8]}>
          <Ant.Col lg={12} md={12} sm={24} xs={24}>
            <Ant.Card
              style={{ ...styles.CARD_DEFAULT_STYLES }}
            >
              <Ant.Row gutter={[8, 8]}>
                <Ant.Col md={12} lg={12} sm={24} xs={24}>
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
                      allowClear={true}
                      loading={roleLoading}
                      options={roleData?.data}
                      fieldNames={{ label: "name", value: "id" }}
                    />
                  </Ant.Form.Item>
                </Ant.Col>
              </Ant.Row>
              <Ant.Col
                className="text-center"
                span={24}
                md={24}
                lg={24}
                xs={24}
              >
                <Ant.Button
                  disabled={disableButton}
                  block
                  htmlType="submit"
                  type="primary"
                >
                  تایید
                </Ant.Button>
              </Ant.Col>
            </Ant.Card>
          </Ant.Col>
          <Ant.Col span={24} md={12} sm={24} xs={24}>
            <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}>
              <Ant.Skeleton loading={loading}>
                {roleError ? (
                  <Ant.Empty />
                ) : (
                  <Ant.Tree
                    disabled={disable}
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    selectedKeys={selectedKeys}
                    checkedKeys={checkedKeys}
                    onCheck={onCheck}
                    onSelect={onSelect}
                    treeData={items}
                  />
                )}
              </Ant.Skeleton>
            </Ant.Card>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </Ant.Card>
  );
};
export default Menus;
