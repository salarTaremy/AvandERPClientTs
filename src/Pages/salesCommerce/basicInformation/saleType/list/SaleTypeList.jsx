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
import FormAddSaleType from "../add/FormAddSaleType";
import FormEditSaleType from "../edit/FormEditSaleType";
import * as uuid from "uuid";

const SaleTypeList = () => {
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
    getAllSaleType();
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
  const getAllSaleType = async () => {
    await ApiCall(url.SALETYPE);
  };
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.SALETYPE}/${id}`);
  };
  const onAdd = () => {
    setModalContent(
      <FormAddSaleType key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getAllSaleType();
  };
  const onSuccessEdit = () => {
    setModalState(false);
    getAllSaleType();
  };
  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FormEditSaleType
        onSuccess={onSuccessEdit}
        myKey={val.id}
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
          getAllSaleType();
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
            title={title}
            columns={columns(onDelSuccess, onEdit)}
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
      >
        {modalContent}
      </Ant.Modal>
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"نوع فروش"} type="inner" loading={loading}>
        <Grid />
      </Ant.Card>
    </>
  );
};

export default SaleTypeList;


