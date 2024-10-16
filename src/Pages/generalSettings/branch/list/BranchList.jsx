import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "../list/columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import FormAddNewBranch from "../add/FormAddNewBranch";
import FormEditBranch from "../edit/FormEditBranch";
import * as uuid from "uuid";

const BranchList = () => {
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
    getAllBranchList();
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
  const getAllBranchList = async () => {
    await ApiCall(url.BRANCH);
  };
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.BRANCH}/${id}`);
  };
  const onAdd = () => {
    setModalContent(
      <FormAddNewBranch key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getAllBranchList();
  };
  const onSuccessEdit = () => {
    setModalState(false);
    getAllBranchList();
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FormEditBranch onSuccess={onSuccessEdit} key={val.id} id={val.id} />,
    );
    setModalState(true);
  };
  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        onAdd={onAdd}
        onRefresh={() => {
          getAllBranchList();
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
        {...defaultValues.MODAL_PROPS}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"لیست شعب"}
        type="inner"
      >
        <Ant.Table
          size="small"
          {...defaultValues.TABLE_PROPS}
          title={title}
          columns={columns(onDelSuccess, onEdit)}
          dataSource={dataSource}
          loading={loading}
        />
      </Ant.Card>
    </>
  );
};

export default BranchList;
