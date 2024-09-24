import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import columns from "./columns";
import * as defaultValues from "@/defaultValues";
import * as styles from "@/styles";
import * as url from "@/api/url";
import qs from 'qs'
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import FormAddDeliveryType from "../add/FormAddDeliveryType";
import FormEditDeliveryType from "../edit/FormEditDeliveryType";
import * as uuid from "uuid";

const DeliveryType = () => {
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
    getAllDeliveryType();
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
  const getAllDeliveryType = async () => {
    await ApiCall(url.DELIVERY_TYPE)
  };


  const onDelSuccess = async (id) => {
    await delApiCall(`${url.DELIVERY_TYPE}/${id}`);
  };
  const onAdd = () => {
    setModalContent(
      <FormAddDeliveryType key={uuid.v1()} onSuccess={onSuccessAdd} />,

    );
    setModalState(true);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getAllDeliveryType();
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getAllDeliveryType();
  };
  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FormEditDeliveryType onSuccess={onSuccessEdit}  obj={val} id={val.id} key={val.id} />,

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
          getAllDeliveryType();
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
        title={"لیست انواع تحویل"}
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

export default DeliveryType;
