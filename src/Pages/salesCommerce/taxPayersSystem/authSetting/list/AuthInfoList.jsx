import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "./columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import * as uuid from "uuid";
import FormEditAuthInfo from "../edit/FormEditAuthInfo";
import FormAddAuthInfo from "../add/FormAddAuthInfo";

const AuthInfoList = () => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  useRequestManager({ error: error });
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllAuthInformation();
  }, []);

  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    delSaving?.isSuccess &&
      setDataSource([
        ...dataSource?.filter((c) => c.id !== delSaving?.data?.id),
      ]);
  }, [delSaving]);

  //====================================================================
  //                        Functions
  //====================================================================
  const getAllAuthInformation = async () => {
    await ApiCall(url.TAX_PAYERS_SYSTEM_AUTH_INFORMATION);
  };

  const onDelete = async (id) => {
    await delApiCall(`${url.TAX_PAYERS_SYSTEM_AUTH_INFORMATION}/${id}`);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getAllAuthInformation();
  };

  const onAdd = () => {
    setModalContent(
      <FormAddAuthInfo key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getAllAuthInformation();
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FormEditAuthInfo onSuccess={onSuccessEdit} key={val.id} id={val.id} />,
    );
    setModalState(true);
  };
  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        onAdd={() => {
          onAdd();
        }}
        onRefresh={() => {
          getAllAuthInformation();
        }}
      />
    );
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        open={modalState}
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        centered
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"اطلاعات احراز هویت"}
        type="inner"
      >
        <Ant.Table
          size="small"
          {...defaultValues.TABLE_PROPS}
          title={title}
          columns={columns(onDelete, onEdit)}
          dataSource={dataSource}
          loading={loading}
        />
      </Ant.Card>
    </>
  );
};

export default AuthInfoList;
