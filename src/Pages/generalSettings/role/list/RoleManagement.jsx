import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import * as url from "@/api/url";
import * as uuid from "uuid";
// import FilterDrawer from '@/components/common/FilterDrawer'
import FilterBedge from "@/components/common/FilterBedge";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import columns from "./columns";
import ButtonList from "@/components/common/ButtonList";
import FormAddRole from "../add/FormAddRole";
import FormEditRole from "../edit/FormEditRole";
import * as defaultValues from "@/defaultValues";
function RoleManagement() {
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [dataSource, setDataSource] = useState(null);
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  useRequestManager({ error: error });
  useRequestManager({ error: delError, data: delSaving, loading: delLoading });

  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    getRole();
  }, []);
  useEffect(() => {
    delSaving?.isSuccess &&
      setDataSource([
        ...dataSource?.filter((c) => c.id !== delSaving?.data?.id),
      ]);
  }, [delSaving]);

  const getRole = async () => {
    await ApiCall(url.ROLE);
  };
  const onDelete = async (id) => {
    await delApiCall(`${url.ROLE}/${id}`);
  };
  const onSuccessEdit = () => {
    setModalState(false);
    getRole();
  };
  const onEdit = (val) => {
    setModalContent(
      <FormEditRole
        onSuccess={onSuccessEdit}
        myKey={val.id}
        obj={val}
        id={val.id}
      />,
    );
    setModalState(true);
  };
  const onView = (id) => {
    console.log(id, "ooo");
    setModalState(true);
  };
  const onSuccessAdd = () => {
    setModalState(false);
    getRole();
  };
  const onAdd = () => {
    setModalContent(<FormAddRole key={uuid.v1()} onSuccess={onSuccessAdd} />);
    setModalState(true);
  };
  const title = () => {
    return (
      <ButtonList
        onAdd={onAdd}
        // onFilter={() => {
        //   setOpenFilter(true);
        // }}
        onRefresh={() => {
          getRole();
        }}
      />
    );
  };

  const Grid = () => {
    return (
      <>
        <Ant.Skeleton loading={loadingData}>
          <Ant.Table
            {...defaultValues.TABLE_PROPS}
            columns={columns(onDelete, onEdit, onView)}
            dataSource={dataSource}
            title={title}
          />
        </Ant.Skeleton>
      </>
    );
  };
  return (
    <>
      <Ant.Card title={"لیست نقش ها"} type="inner">
        <Ant.Modal
          open={modalState}
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
          {" "}
          {modalContent}
        </Ant.Modal>
        <Ant.Card >
          {/* <FilterDrawer
        > */}
          {/* <FilterPanel  /> */}
          {/* </FilterDrawer> */}
          <FilterBedge>
            <Grid />
          </FilterBedge>
        </Ant.Card>
      </Ant.Card>
    </>
  );
}

export default RoleManagement;
