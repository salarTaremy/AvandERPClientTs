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
import FormAddTypeWareHouseSheetsList from "../add/FormAddTypeWareHouseSheetsList";
import FormEditTypeWareHouseSheetsList from "../edit/FormEditTypeWareHouseSheetsList";
import * as uuid from "uuid";

const TypeWareHouseSheetsList = () => {
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  useRequestManager({ error: error });
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {

    getAllTypeWareHouseSheets();
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
  const getAllTypeWareHouseSheets = async () => {
    await ApiCall(url.INVENTORY_DOCUMENT_TYPE);
  };
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.INVENTORY_DOCUMENT_TYPE}/${id}`);
  };
  const onAdd = () => {
    setModalContent(
     <FormAddTypeWareHouseSheetsList key={uuid.v1()} onSuccess={onSuccessAdd} />,
    );
    setModalState(true);
  };
  const onEdit = (val) => {

    setModalContent(
      <FormEditTypeWareHouseSheetsList  id={val?.id} key={val?.id}  onSuccess={onSuccessEdit}   />,
    );
    setModalState(true);
  };


  //====================================================================
  //                        Events
  //====================================================================
  const onSuccessAdd = () => {
    setModalState(false);
    getAllTypeWareHouseSheets();
  };
  const onSuccessEdit = () => {
    setModalState(false);
    getAllTypeWareHouseSheets();
  };
  const onTableChange = (pagination, filter, sorter) => {
    setPagination(pagination);
  }
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
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"انواع برگه های انبار"} type="inner" >
        <Ant.Table
          size="small"
          {...defaultValues.TABLE_PROPS}
          title={title}
          columns={columns(onDelSuccess, onEdit)}
          pagination={pagination}
          onChange={onTableChange}
          dataSource={dataSource}
          loading={loading}
        />
      </Ant.Card>
    </>
  );
};

export default TypeWareHouseSheetsList;
