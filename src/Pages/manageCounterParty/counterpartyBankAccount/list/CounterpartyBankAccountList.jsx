import React from "react";
import * as Ant from "antd";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import * as defaultValues from "@/defaultValues";
import * as url from "@/api/url";
import PropTypes from "prop-types";
import ButtonList from "@/components/common/ButtonList";
import useRequestManager from "@/hooks/useRequestManager";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import FormCounterpartyBankAccountAdd from "../add/FormCounterpartyBankAccountAdd";
import * as uuid from "uuid";
import FormEditCounterpartyBankAccount from "../edit/FormEditCounterpartyBankAccount";

//====================================================================
//                        Declaration
//====================================================================
const CounterpartyBankAccountList = (props) => {
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
  useRequestManager({
    error: deleteError,
    loading: deleteLoading,
    data: deleteData,
  });
  useRequestManager({error: error});
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getCounterpartyBankAccountList();
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
  const getCounterpartyBankAccountList = async () => {
    await ApiCall(
      `${url.COUNTERPARTY_BANK_ACCOUNT}?counterpartyId=${counterpartyId}`,
    );
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const onDelete = async (id) => {
    await deleteApiCall(`${url.COUNTERPARTY_BANK_ACCOUNT}/${id}`);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getCounterpartyBankAccountList();
  };
  const onAdd = () => {
    setModalContent(
      <FormCounterpartyBankAccountAdd
        onSuccess={onSuccessAdd}
        key={uuid.v1()}
        counterpartyId={counterpartyId}
      />,
    );
    setModalState(true);
  };

  const onEdit = async (id) => {
    setModalContent(<FormEditCounterpartyBankAccount
      onSuccess={onSuccessEdit}
      id={id}
      key={id}
    />);
    setModalState(true);
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getCounterpartyBankAccountList();
  };

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        onAdd={onAdd}
        onRefresh={() => {
          getCounterpartyBankAccountList();
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
          columns={columns(onDelete, onEdit)}
          dataSource={dataSource}
          loading={loading}
        />
      </Ant.Card>
    </>
  );
};

export default CounterpartyBankAccountList;
CounterpartyBankAccountList.propTypes = {
  counterpartyId: PropTypes.number.isRequired,
};