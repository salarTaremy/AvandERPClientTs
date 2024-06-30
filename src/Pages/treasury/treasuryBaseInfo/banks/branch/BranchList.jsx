import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import FormAddNewBranch from "./add/FormAddNewBranch";
import * as styles from "@/styles";
import * as uuid from "uuid";
import qs from "qs";
import FilterPanel from "./FilterPanel";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import columns from "./columns";
import FormEditBankBranch from "./edit/FormEditBankBranch";
import ModalHeader from "@/components/common/ModalHeader";
import CoustomContent from "@/components/common/CoustomContent";
import { BsBank2 } from "react-icons/bs";

const BranchList = (props) => {
  const { bankId, bankTitle, onSuccess } = props;
  const [data, loading, error, ApiCall] = useFetchWithHandler();
  useRequestManager({ error: error });
  const [dataSource, setDataSource] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  const [pagination, setPagination] = useState({})

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getBranch();
  }, [filterObject]);

  useEffect(() => {
    setDataSource((data?.isSuccess && data?.data) || null);
  }, [data]);

  useEffect(() => {
    delSaving?.isSuccess &&
      setDataSource([
        ...dataSource?.filter((c) => c.id !== delSaving?.data?.id),
      ]);
  }, [delSaving]);

  //====================================================================
  //                        Functions
  //====================================================================
  const getBranch = async () => {
    const queryString = qs.stringify({
      bankId: bankId,
      code: filterObject?.code,
      name: filterObject?.name,
      provinceId: filterObject?.provinceId,
      cityId: filterObject?.cityId,
    });
    await ApiCall(`${url.BANKBRANCH}?${queryString}`);
  };

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  const onDelete = async (id) => {
    await delApiCall(`${url.BANKBRANCH}/${id}`);
  };

  const onAdd = () => {
    setModalContent(
      <FormAddNewBranch
        bankId={bankId}
        key={uuid.v1()}
        onSuccess={onSuccessAdd}
      />,
    );
    setModalState(true);
  };

  const onSuccessAdd = () => {
    setModalState(false);
    getBranch();
    onSuccess();
  };

  const onSuccessEdit = () => {
    setModalState(false);
    getBranch();
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setModalContent(
      <FormEditBankBranch
        onSuccess={onSuccessEdit}
        myKey={val.id}
        obj={val}
        id={val.id}
        bankTitle={bankTitle}
        name={val.name}
        bankId={val.bankId}
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
        filterCount={filterCount}
        onAdd={onAdd}
        onFilter={() => {
          setOpenFilter(true);
        }}
      />
    );
  };

  const Grid = () => {
    return (
      <>
        <Ant.Skeleton loading={loading}>
          <Ant.Table
            {...defaultValues.TABLE_PROPS}
            pagination={pagination}
            title={title}
            className="mt-5"
            columns={columns(onDelete, onEdit)}
            onChange={handleTableChange}
            dataSource={dataSource || null}
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
      >
        {modalContent}
      </Ant.Modal>
      <ModalHeader title={` شعب بانک "${bankTitle}"`} icon={<BsBank2 />} />
      <CoustomContent>
        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onRemoveFilter={onRemoveFilter}
        >
          <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
        </FilterDrawer>
        <FilterBedge filterCount={filterCount}>
          <Grid />
        </FilterBedge>
      </CoustomContent>
    </>
  );
};

export default BranchList;
