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
import FormEditBanks from "../edit/FormEditBanks";
import * as uuid from "uuid";
import FormAddNewBanks from "../add/FormAddNewBanks";
import BranchList from "../branch/BranchList";

const banksList = () => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  useRequestManager({ error: error });
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
  const [pagination, setPagination] = useState({});

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllBanks();
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
  const getAllBanks = async () => {
    await ApiCall(url.BANK);
  };

  const onDelete = async (id) => {
    await delApiCall(`${url.BANK}/${id}`);
  };

  const onSuccessEdit = () => {

    setModalState(false);
    getAllBanks();
  };

  const onAdd = () => {
    const updateList = { ...defaultValues.MODAL_EXTRA_LARGE, width: 520 };
    setModalSize(updateList);
    setModalContent(
      <FormAddNewBanks key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getAllBanks();
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    const updateList = { ...defaultValues.MODAL_EXTRA_LARGE, width: 520 };
    setModalSize(updateList);
    setModalContent(
      <FormEditBanks
        onSuccess={onSuccessEdit}
        key={val.id}
        id={val.id}
        bankTitle={val.title}
      />,
    );
    setModalState(true);
  };

  const onBranch = (val) => {
    setModalSize({ ...defaultValues.MODAL_LARGE });
    setModalContent(
      <BranchList
        onSuccess={onSuccessEdit}
        key={val.id}
        bankId={val.id}
        bankTitle={val.title}
      />,
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
          getAllBanks();
        }}
      />
    );
  };

  const Grid = () => {
    return (
      <>
        <Ant.Skeleton loading={loading}>
          <Ant.Table
            size="small"
            {...defaultValues.TABLE_PROPS}
            pagination={pagination}
            title={title}
            columns={columns(onDelete, onEdit, onBranch)}
            onChange={handleTableChange}
            dataSource={dataSource}
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
        open={modalState}
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        centered
        {...defaultValues.MODAL_PROPS}
        {...modalSize}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"بانک ها"}
        type="inner"
        loading={loading}
      >
        <Grid />
      </Ant.Card>
    </>
  );
};

export default banksList;
