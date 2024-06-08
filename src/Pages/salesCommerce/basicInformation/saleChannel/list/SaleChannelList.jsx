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
import FormAddSaleChannel from "../add/FormAddSaleChannel";
import FormEditSaleChannel from "../edit/FormEditSaleChannel";
import * as uuid from "uuid";

const SaleChannelList = () => {
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

    getAllSaleChannel();
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
  const getAllSaleChannel = async () => {
    await ApiCall(url.SALE_CHANNEL);
  };
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.SALE_CHANNEL}/${id}`);
  };
  const onAdd = () => {
    setModalContent(
      <FormAddSaleChannel key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getAllSaleChannel();
  };
  const onSuccessEdit = () => {
    setModalState(false);
    getAllSaleChannel();
  };
  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FormEditSaleChannel
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
            getAllSaleChannel();
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
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"لیست کانال فروش"} type="inner" loading={loading}>
        <Grid />
      </Ant.Card>
    </>
  );
};

export default SaleChannelList;
