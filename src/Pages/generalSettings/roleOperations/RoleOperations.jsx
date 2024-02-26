import React from "react";
import { useEffect, useState } from "react";
import columns from "./columns";
import { useFetch, useFetchWithHandler, usePutWithHandler } from "@/api";
import * as url from "@/api/url";
import * as Ant from "antd";
import useRequestManager from "@/hooks/useRequestManager";
import ActionList from "./ActionList";
import qs from "qs";
import * as defaultValues from "@/defaultValues";
const RoleOperations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [idRol, setIdRol] = useState(0);
  const [idAction, setIdAction] = useState([]);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [
    listRoleAction,
    loadingRoleActionr,
    errorRoleAction,
    apiCallRoleAction,
  ] = usePutWithHandler();
  const [form] = Ant.Form.useForm();
  const [disable, setDisable] = useState(true);
  const [roleScopeData, roleScopeLoading, roleScopeError] = useFetch(
    url.ROLE_SCOPE,
  );
  const [roleData, roleLoading, roleError, roleApi] = useFetchWithHandler();
  const [dataSource, setDataSource] = useState(null);
  useRequestManager({ error: error });
  useRequestManager({ error: roleScopeError });
  useRequestManager({ error: roleError });
  useRequestManager({
    error: errorRoleAction,
    data: listRoleAction,
    loading: loadingRoleActionr,
  });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    getAllApplicationController();
  }, []);
  //====================================================================
  //                        Events
  //====================================================================
  const updateActionId = (listId) => {
    setIdAction(listId);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getId = (id) => {
    setModalContent(
      <ActionList updateActionId={updateActionId} key={id} id={id} roleId={idRol} />,
    );
    setIsModalOpen(true);
  };

  //====================================================================
  //                        Functions
  //====================================================================

  const getAllApplicationController = async () => {
    await ApiCall(url.APPLICATION_CONTROLLER);
  };

  const submitRoleAction = async () => {
    const data = {
      roleId: idRol,
      entityIdList: idAction,
    };
    console.log(data, "dataaaa")
    await apiCallRoleAction(url.UPDATE_ROLE_ACTION_ASSIGNMENT, data);
    setIsModalOpen(false);
  };
  const onChangeRoleScope = async (val) => {
    const data = qs.stringify({
      Id: parseInt(val),
    });
    await roleApi(`${url.ROLE}?${data}`);
    setDisable(false);
  };

  //====================================================================
  //                        Child Components
  //=====================================================================
  const Grid = () => {
    return (
      <>
        <Ant.Skeleton loading={roleScopeLoading}>
          <Ant.Table
            {...defaultValues.TABLE_PROPS}
            dataSource={dataSource}
            columns={columns(getId)}
          />
        </Ant.Skeleton>
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>

      <Ant.Modal
        footer={[
          <Ant.Button
            key="submit"
            type="primary"
            loading={loadingRoleActionr}
            onClick={submitRoleAction}
          >
            تایید
          </Ant.Button>,
        ]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Collapse
        style={{ backgroundColor: "white" }}
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: "ارتباط نقش و عملیات",
            children: (
              <>
                <Ant.Form form={form} layout="vertical" onFinish={null}>
                  <Ant.Row gutter={[16, 8]}>
                    <Ant.Col span={12} md={12} lg={12}>
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
                    <Ant.Col span={12} md={12} lg={12}>
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
                </Ant.Form>
              </>
            ),
          },
        ]}
      />
      <Ant.Card className="w-full mt-4" type="inner">
        <Grid />
      </Ant.Card>

    </>
  );
};

export default RoleOperations;
