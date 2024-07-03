import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import * as api from "@/api";
import PropTypes from "prop-types";
import ModalHeader from "@/components/common/ModalHeader";
import { usePostWithHandler, useFetchWithHandler, useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
const FormAddBrand = (props) => {
  const { onSuccess } = props;
  const [loading, setLoading] = useState(false);
  const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
  const [roleScopeData, roleScopeLoading, roleScopeError] = useFetch(
    url.ROLE_SCOPE,
  );
  useRequestManager({ error: roleScopeError });
  const [selectData, selectLoading, selectError] = api.useFetch(url.BRAND);
  useRequestManager({ error: selectError });
  useRequestManager({ error: addError, loading: addLoading, data: addData });
  const [form] = Ant.Form.useForm();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    addData?.isSuccess && onSuccess();
  }, [addData]);

  //====================================================================
  //                        Functions
  //======================================================================
  const onFinish = async (values) => {
    console.log(values, "values");
    setLoading(true);
    const req = { ...values };
    await addApiCall(url.ROLE, req);
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
      <ModalHeader title={"ایجاد نقش "} icon={<AiOutlineDeploymentUnit />}/>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col md={24} lg={24} sm={24} xs={24}>
            <Ant.Form.Item
              name="name"
              label={"نام نقش"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={100} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={24} lg={24} xs={24}>
            <Ant.Form.Item
              name="persianTitle"
              label={"عنوان نقش"}
              rules={[{ required: true }]}
            >
              <Ant.Input allowClear showCount maxLength={200} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col md={12} lg={12} sm={24} xs={24}>
            <Ant.Form.Item
              name="roleScopeId"
              label={"محدوده نقش"}
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
          <Ant.Col md={12} lg={12} sm={24} xs={24}>
            <Ant.Form.Item
              name="isDenied"
              defaultChecked={false}
              label={"مجاز/غیرمجاز"}
            >
              <Ant.Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item>
          <Ant.Button
            loading={loading}
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
export default FormAddBrand;
FormAddBrand.propTypes = {
  onSuccess: PropTypes.func,
};
