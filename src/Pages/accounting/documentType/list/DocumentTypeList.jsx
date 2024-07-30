import React from "react";
import { useEffect, useState, useRef } from "react";
import * as styles from "@/styles";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import columns from "./columns";
import useRequestManager from "@/hooks/useRequestManager";
import {
  useFetchWithHandler,
  useDelWithHandler,
  usePostWithHandler,
  usePutWithHandler,
} from "@/api";
import ButtonList from "@/components/common/ButtonList";
import FormAddDocumentType from "../add/FormAddDocumentType";
import FormEditDocumentType from "../edit/FormEditDocumentType";
import * as uuid from "uuid";

const DocumentTypeList = () => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [addSaving, addLoading, addArror, addApiCall] = usePostWithHandler();
  const [editSaving, editLoading, editArror, editApiCall] = usePutWithHandler();
  useRequestManager({ error });
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  useRequestManager({ error: addArror, loading: addLoading, data: addSaving });
  useRequestManager({
    error: editArror,
    loading: editLoading,
    data: editSaving,
  });
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [dataSource, setDataSource] = useState(null);

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllDocumentType();
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
  const getAllDocumentType = async () => {
    await ApiCall(url.ACCOUNTING_DOCUMENT_TYPE);
  };
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.ACCOUNTING_DOCUMENT_TYPE}/${id}`);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getAllDocumentType();
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getAllDocumentType();
  };

  //====================================================================
  //                        Events
  //====================================================================

  const onAdd = () => {
    setModalContent(
      <FormAddDocumentType key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };
  const onEdit = (val) => {
    setModalContent(
      <FormEditDocumentType
        onSuccess={onSuccessEdit}
        key={val.id}
        obj={val}
        id={val.id}
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
        onAdd={onAdd}
        onRefresh={() => {
          getAllDocumentType();
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
        title={"لیست سند حسابداری"}
        type="inner"
      >
        <Ant.Table
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
export default DocumentTypeList;
