import React from "react";
import { useEffect, useState } from "react";
import columns from "./columns";
import { useFetch, useFetchWithHandler } from "@/api";
import * as url from "@/api/url";
import * as Ant from "antd";
import useRequestManager from "@/hooks/useRequestManager";
// import RoleOperationDetai from "./RoleOperationDetai";
import ActionList from "./ActionList";
import qs from "qs";
import * as defaultValues from "@/defaultValues";
const RoleOperations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [form] = Ant.Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [roleScopeData, roleScopeLoading, roleScopeError] = useFetch(
    url.ROLE_SCOPE,
  );
  const [roleData, roleLoading, roleError, roleApi] = useFetchWithHandler();
  const [dataSource, setDataSource] = useState(null);
  useRequestManager({ error: error });
  useRequestManager({ error: roleScopeError });
  useRequestManager({ error: roleError });

  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    getAllApplicationController();
    // onChangeRoleScope();
  }, []);

  const getAllApplicationController = async () => {
    await ApiCall(url.APPLICATION_CONTROLLER);
  };

  const onFinish = async (values) => {
    console.log(values, "values");
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getId = (val) => {
    alert(val);
    setModalContent(<ActionList id={val} />);
    setIsModalOpen(true);
  };
  const onChangeRoleScope = async (val) => {
    const data = qs.stringify({
      Id: parseInt(val),
    });
    await roleApi(`${url.ROLE}?${data}`);
  };

  const expandedRowRender = (record, index, indent, expanded) => {
    // return <RoleOperationDetai key={record.id} id={record.id} />;
    // return   <ActionList visible={modalVisible} onClose={handleCloseModal} />
  };

  const Grid = () => {
    return (
      <>
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          dataSource={dataSource}
          columns={columns(getId)}
          expandable={{
            expandedRowRender,
          }}
        />
      </>
    );
  };
  return (
    <>
      <Ant.Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                <Ant.Form form={form} layout="vertical" onFinish={onFinish}>
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
                          disabled={roleLoading || false}
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
      {/* // <ActionList /> */}
    </>
  );
};

export default RoleOperations;
