import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const FormEditRole = (props) => {
  const { onSuccess, obj, id, myKey } = props;
  const [loading, setLoading] = useState(false);
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ ...obj });
  }, [obj]);
  useEffect(() => {
    editData?.isSuccess && onSuccess();
  }, [editData]);
  //====================================================================
  //                        Functions
  //======================================================================
  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.ROLE, req);
    setLoading(false);
  };

  //====================================================================
  //                        Child Components
  //====================================================================

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form form={form} key={myKey} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col span={24}>
            {"ایجاد نقش"}
            <Ant.Divider />
          </Ant.Col>
          <Ant.Col span={12} md={12} lg={12}>
            <Ant.Form.Item
              name="name"
              label={"نام نقش"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={200} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={12} md={12} lg={12}>
            <Ant.Form.Item
              name="persianTitle"
              label={"عنوان نقش"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={200} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={12} md={12} lg={12}>
            <Ant.Form.Item
              name="roleScopeId"
              label={"شماره نقش"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={20} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col span={12} md={12} lg={12}>
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
    </>
  );
};
export default FormEditRole;
FormEditRole.propTypes = {
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  myKey: PropTypes.number,
};
