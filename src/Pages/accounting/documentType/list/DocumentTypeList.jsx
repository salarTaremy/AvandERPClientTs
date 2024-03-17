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
import FormDocumentType from "../form/FormDocumentType";

const DocumentTypeList = () => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [addSaving, addLoading, addArror, addApiCall] = usePostWithHandler();
  const [editSaving, editLoading, editArror, editApiCall] = usePutWithHandler();
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  useRequestManager({ error: addArror, loading: addLoading, data: addSaving });
  useRequestManager({
    error: editArror,
    loading: editLoading,
    data: editSaving,
  });
  const [editingValue, setEditingValue] = useState({});
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const formDocumentType = useRef();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllDocumentType();
  }, []);
  useEffect(() => {
    if (!isModalOpenAdd) return;
    formDocumentType.current.resetFields();
  }, [isModalOpenAdd]);

  useEffect(() => {
    if (addSaving && addSaving?.isSuccess) {
      setIsModalOpenAdd(false);
      getAllDocumentType();
    }
  }, [addSaving]);

  useEffect(() => {
    if (editSaving && editSaving?.isSuccess) {
      setIsModalOpenEdit(false);
      getAllDocumentType();
    }
  }, [editSaving]);

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
  const onSubmitAdd = async (val) => {
    const data = { ...val, isSystematic: true };
    await addApiCall(url.ACCOUNTING_DOCUMENT_TYPE, data);
  };
  const onSubmitEdit = async (val) => {
    const data = { ...val, isSystematic: true, id: editingValue.id };
    await editApiCall(url.ACCOUNTING_DOCUMENT_TYPE, data);
  };

  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setEditingValue(val);
    setIsModalOpenEdit(true);
  };
  //====================================================================
  //                        Child Components
  //====================================================================

  const title = () => {
    return (
      <ButtonList
        onAdd={() => {
          setIsModalOpenAdd(true);
        }}
        onRefresh={() => {
          getAllDocumentType();
        }}
      />
    );
  };
  const Grid = () => {
    return (
      <>
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          title={title}
          columns={columns(onDelSuccess, onEdit)}
          dataSource={dataSource}
        />
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Modal
        open={isModalOpenEdit}
        handleCancel={() => setIsModalOpenEdit(false)}
        onCancel={() => {
          setIsModalOpenEdit(false);
        }}
        footer={null}
        centered
      >
        <FormDocumentType
          obj={editingValue}
          onFinish={onSubmitEdit}
          loading={editLoading}
        />
      </Ant.Modal>
      <Ant.Card
        loading={false}
        style={{ ...styles.CARD_DEFAULT_STYLES }}
        title={"انواع سند حسابداری"}
        type="inner"
      >
        <Ant.Skeleton loading={loading}>
          <Grid />
        </Ant.Skeleton>
      </Ant.Card>

      <Ant.Modal
        open={isModalOpenAdd}
        handleCancel={() => {
          setIsModalOpenAdd(false);
        }}
        onCancel={() => {
          setIsModalOpenAdd(false);
        }}
        footer={null}
        centered
      >
        <FormDocumentType
          onFinish={onSubmitAdd}
          ref={formDocumentType}
          loading={addLoading}
        />
      </Ant.Modal>
    </>
  );
};
export default DocumentTypeList;
