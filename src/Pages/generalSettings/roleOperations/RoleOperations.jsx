import React from "react";
import { useEffect, useState } from "react";
import columns from "./columns";
import { useFetch,useFetchWithHandler  } from '@/api'
import * as url from '@/api/url'
import * as Ant from "antd";
import useRequestManager from '@/hooks/useRequestManager'
import RoleOperationDetai from "./RoleOperationDetai";
import * as defaultValues from "@/defaultValues";
const RoleOperations = () => {
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [form] = Ant.Form.useForm();
  const [open, setOpen] = useState(false);
  const [roleScopeData, roleScopeLoading, roleScopeError] = useFetch(url.ROLE_SCOPE)
  const [roleData, roleLoading, roleError] = useFetch(url.ROLE)
  const [dataSource, setDataSource] = useState(null);
  useRequestManager({ error: error })
  useRequestManager({ error: roleScopeError })
  useRequestManager({ error: roleError })
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    getRole();
  }, []);

  const getRole = async () => {
    await ApiCall(url.APPLICATION_CONTROLLER);
  };


  const expandedRowRender = (record, index, indent, expanded) => {
    return <RoleOperationDetai key={record.id} id={record.id} />
  }

  const Grid = () => {
    return (
      <>
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          dataSource={dataSource}
          columns={columns()}
          expandable={{
            expandedRowRender,
          }}

        />
      </>
    );
  };
  return (
    <>
      <Ant.Card title={"ارتباط نقش و عملیات"} type="inner">
        <Ant.Button type="primary" onClick={showDrawer}>
          Open
        </Ant.Button>
        <Ant.Drawer
          className="h-full"
          title="Basic Drawer"
          placement="top"
          onClose={onClose}
          open={open}
          getContainer={false}
        >
          <Ant.Form form={form} layout="vertical">
            <Ant.Row gutter={[16, 8]}>
              <Ant.Col span={12} md={12} lg={12}>
                <Ant.Form.Item
                  name={"accountTypeId"}
                  label="محدود نقش"
                  rules={[{ required: true }]}
                >
                  <Ant.Select
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
            {/* <Ant.Col span={12} md={12} lg={12}>
            <Ant.Form.Item>
              <Ant.Button
                type="primary"
                onClick={() => {
                  form.submit();
                }}
                block
              >
                {"تایید"}
              </Ant.Button>
            </Ant.Form.Item>
          </Ant.Col> */}
          </Ant.Form>
        </Ant.Drawer>

        <Grid />
      </Ant.Card>
    </>
  );
};

export default RoleOperations;
