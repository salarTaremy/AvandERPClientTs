import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import * as defaultValues from "@/defaultValues";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import * as uuid from "uuid";
import qs from "qs";
import { columns } from "./columns";
import FormCounterpartyAddressAdd from "../add/FormCounterpartyAddressAdd";
import FormCounterpartyAddressEdit from "../edit/FormCounterpartyAddressEdit";
import PhoneNumberList from "../phone/PhoneNumberList";

//====================================================================
//                        Declaration
//====================================================================
const CounterpartyAddressList = (props) => {
  const { counterpartyId } = props;
  const [listData, loading, error, ApiCall] = useFetchWithHandler();
  const [deleteData, deleteLoading, deleteError, deleteApiCall] =
    useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  useRequestManager({ error: error });
  useRequestManager({
    error: deleteError,
    loading: deleteLoading,
    data: deleteData,
  });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getCounterpartyAddressList();
  }, [pagination.current, pagination.pageSize]);

  useEffect(() => {
    setDataSource(listData?.data);
    setPagination({
      ...pagination,
      total: listData?.data[0]?.totalCount,
    });
  }, [listData]);

  useEffect(() => {
    deleteData?.isSuccess &&
      setDataSource([
        ...dataSource?.filter((c) => c.id !== deleteData?.data?.id),
      ]);
  }, [deleteData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const getCounterpartyAddressList = async () => {
    const queryString = qs.stringify({ counterpartyId: counterpartyId });
    await ApiCall(`${url.COUNTERPARTY_ADDRESS}?${queryString}`);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const onDelete = async (id) => {
    await deleteApiCall(`${url.COUNTERPARTY_ADDRESS}/${id}`);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getCounterpartyAddressList();
  };
  const onAdd = () => {
    setModalContent(
      <FormCounterpartyAddressAdd
        onSuccess={onSuccessAdd}
        counterpartyId={counterpartyId}
        key={uuid.v1()}
      />,
    );
    setModalState(true);
  };
  const onPhoneNumberAdd = (value) => {
    setModalContent(<PhoneNumberList addressId={value.id} key={value.id} />);
    setModalState(true);
  };

  const onEdit = (id) => {
    setModalContent(<FormCounterpartyAddressEdit
      onSuccess={onSuccessEdit}
      id={id}
      key={id}
    />);
    setModalState(true);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    setModalContent();
    getCounterpartyAddressList();
  };

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        onAdd={onAdd}
        onRefresh={() => {
          getCounterpartyAddressList();
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
        {...defaultValues.MODAL_PROPS}
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
        style={{ boxShadow: "0 0 0 0", maxHeight: "60vh", minHeight: "60vh" }}
        bordered={false}
      >
        <Ant.Table
          pagination={pagination}
          size="small"
          {...defaultValues.TABLE_PROPS}
          title={title}
          onChange={handleTableChange}
          columns={columns(onDelete, onEdit, onPhoneNumberAdd)}
          dataSource={dataSource}
          loading={loading}
        />
      </Ant.Card>
    </>
  );
};

export default CounterpartyAddressList;
