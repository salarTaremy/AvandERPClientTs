import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import * as styles from "@/styles";
import ModalHeader from "@/components/common/ModalHeader";
import { AiOutlineDeploymentUnit } from "react-icons/ai";

const FormEditRole = (props) => {
  const { onSuccess, id, name, key } = props;
  const [loading, setLoading] = useState(false);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  const [roleScopeData, roleScopeLoading, roleScopeError] = useFetch(
    url.ROLE_SCOPE,
  );
  useRequestManager({ error });
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  useRequestManager({ error: roleScopeError });

  const [form] = Ant.Form.useForm();
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getRoleById()
  }, []);

  useEffect(() => {
    form.resetFields()
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
  }, [listData])
  //====================================================================
  //                        Functions
  //======================================================================
  const getRoleById = async () => {
    await ApiCall(`${url.ROLE}/${id}`);
  }

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.ROLE, req);
    setLoading(false);
    onSuccess()
  };

  //====================================================================
  //                        Child Components
  //====================================================================

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={`ویرایش نقش"${name}"`} icon={<AiOutlineDeploymentUnit />} />
      <Ant.Skeleton active loading={loadingData}>
        <Ant.Form form={form} key={key} onFinish={onFinish} layout="vertical">
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col md={24} lg={24} sm={24} xs={24}>
              <Ant.Form.Item
                name="name"
                label={"نام نقش"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={24} lg={24} sm={24} xs={24}>
              <Ant.Form.Item
                name="persianTitle"
                label={"عنوان نقش"}
                rules={[{ required: true }]}
              >
                <Ant.Input allowClear showCount maxLength={200} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={24} lg={24} sm={24} xs={24}>
              <Ant.Form.Item
                name="roleScopeId"
                label={"محدوده نقش"}
                rules={[{ required: true }]}
              >
                <Ant.Select
                  placeholder={"انتخاب کنید..."}
                  disabled={roleScopeLoading}
                  loading={roleScopeLoading}
                  options={roleScopeData?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col md={24} lg={24} sm={24} xs={24}>
              <Ant.Form.Item
                name="isDenied"
                label={"عدم دسترسی"}
                rules={[{ required: true }]}
              >
                <Ant.Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
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
        </Ant.Form>
      </Ant.Skeleton>
    </>
  );
};
export default FormEditRole;
FormEditRole.propTypes = {
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  key: PropTypes.number,
};
