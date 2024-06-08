import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { usePutWithHandler, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import * as styles from "@/styles";
import ModalHeader from "@/components/common/ModalHeader";
const FormEditBanks = (props) => {
  const { onSuccess, id, bankTitle } = props;
  const [loading, setLoading] = useState(false);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [editData, editLoading, editError, editApiCall] = usePutWithHandler();
  useRequestManager({ error: editError, loading: editLoading, data: editData });
  const [form] = Ant.Form.useForm();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getBanksById();
  }, []);

  useEffect(() => {
    form.resetFields();
    listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) });
  }, [listData]);
  //=====================================================================
  //                        Functions
  //=====================================================================
  const getBanksById = async () => {
    await ApiCall(`${url.BANK}/${id}`);
  };

  const onFinish = async (values) => {
    setLoading(true);
    const req = { ...values, id: id };
    await editApiCall(url.BANK, req);
    setLoading(false);
    onSuccess();
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={`ویرایش بانک "${bankTitle}"`} />

      <Ant.Skeleton loading={loadingData}>
        <Ant.Form form={form} onFinish={onFinish} layout="vertical">
          <Ant.Form.Item
            name="title"
            label={"نام بانک"}
            rules={[{ required: true }]}
          >
            <Ant.Input allowClear showCount maxLength={200} />
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

export default FormEditBanks;
FormEditBanks.propTypes = {
  onFinish: PropTypes.func,
  onSuccess: PropTypes.func,
  obj: PropTypes.any,
  id: PropTypes.number,
  loading: PropTypes.bool,
};
