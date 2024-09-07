import React from "react";
import * as Ant from "antd";
import * as defaultValues from "@/defaultValues";
import columns from "./columns";
import { useEffect, useState } from "react";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as uuid from "uuid";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import FormAddSaleClassification from "../add/FormAddSaleClassification";
import FormEditSaleClassification from "../edit/FormEditSaleClassification";

const SalesClassificationList = () => {
  const [dataSource, setDataSource] = useState(null);
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  useRequestManager({ error: error });
  useRequestManager({ error: delError, data: delSaving, loading: delLoading });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllSalesClassiFication();
  }, []);

  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    delSaving?.isSuccess && getAllSalesClassiFication();
  }, [delSaving]);
  //====================================================================
  //                        Functions
  //====================================================================

  const getAllSalesClassiFication = async () => {
    await ApiCall(url.SALE_CLASSIFICATION);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getAllSalesClassiFication();
  };
  const onSuccessEdit = () => {
    setModalState(false);
    getAllSalesClassiFication();
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FormEditSaleClassification
        key={uuid.v1()}
        id={val.id}
        onSuccess={onSuccessEdit}
      />,
    );
    setModalState(true);
  };

  const onAdd = () => {
    setModalContent(
      <FormAddSaleClassification key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };
  const onDelete = async (id) => {
    await delApiCall(`${url.SALE_CLASSIFICATION}/${id}`);
  };
  //====================================================================
  //                        Child Components
  //=====================================================================

  const title = () => {
    return (
      <ButtonList
        onAdd={onAdd}
        onRefresh={() => {
          getAllSalesClassiFication();
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
        {...defaultValues.MODAL_PROPS}
        centered
        getContainer={null}
        footer={null}
        onCancel={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"لیست طبقه بندی فروش"}
        type="inner"
      >
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          title={title}
          columns={columns(onDelete, onEdit)}
          dataSource={dataSource}
          loading={loadingData}
        />
      </Ant.Card>
    </>
  );
};

export default SalesClassificationList;
