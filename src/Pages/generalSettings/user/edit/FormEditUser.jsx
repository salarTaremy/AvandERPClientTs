import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { FaUserPen } from "react-icons/fa6";

const FormEditUser = (props) => {
  const { onSuccess, id, userName } = props;
  const [loading, setLoading] = useState(false);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getUserById()
  }, [])

  useEffect(() => {
    form.resetFields()
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
  }, [listData])
  //=====================================================================
  //                        Functions
  //=====================================================================
  const getUserById = async () => {
    await ApiCall(`${url.USER}/${id}`);
  }

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.USER, req);
    setLoading(false);
    onSuccess();
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={`ویرایش کاربر "${userName}"`} icon={<FaUserPen />} />
      <Ant.Skeleton loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Form.Item
            name="userName"
            label={"نام کاربری"}
            rules={[{ required: true }]}
          >
            <Ant.Input allowClear showCount maxLength={50} />
          </Ant.Form.Item>
          <Ant.Form.Item name="isActive" label="فعال">
            <Ant.Switch defaultChecked={false} />
          </Ant.Form.Item>
          <Ant.Form.Item>
            <Ant.Button
              block
              type="primary"
              loading={loading}
              onClick={() => {
                form.submit();
              }}
            >
              {"تایید"}
            </Ant.Button>
          </Ant.Form.Item>
        </Ant.Form>
      </Ant.Skeleton>
    </>
  );
};

export default FormEditUser;
FormEditUser.propTypes = {
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  loading: PropTypes.bool,
};
