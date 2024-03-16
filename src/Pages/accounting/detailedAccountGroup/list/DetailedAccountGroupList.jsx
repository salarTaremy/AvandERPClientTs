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
import FrmEditDetailedAccountGroup from "../edit/FrmEditDetailedAccountGroup";
import FrmAddDetailedAccountGroup from "../add/FrmAddDetailedAccountGroup";
import DetailedAccountGroupDescription from "../description/DetailedAccountGroupDescription";

const DetailedAccountGroupList = () => {
  const [listData, listLoading, listError, listApiCall] = useFetchWithHandler();

  const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
  const [addSaving, addLoading, addArror, addApiCall] = usePostWithHandler();
  const [editSaving, editLoading, editArror, editApiCall] = usePutWithHandler();
  const [editingValue, setEditingValue] = useState({});
  const [dataSource, setDataSource] = useState(null);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isDescription, setDescription] = useState(false);
  const [modalContent, setModalContent] = useState();
  const formAccountGroup = useRef();
  useRequestManager({ error: listError });

  useRequestManager({ error: delError, loading: delLoading, data: delSaving });
  useRequestManager({ error: addArror, loading: addLoading, data: addSaving });
  useRequestManager({
    error: editArror,
    loading: editLoading,
    data: editSaving,
  });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllAccountGroup();
  }, []);

  useEffect(() => {
    if (!isModalOpenAdd) return;
    formAccountGroup.current.resetFields();
  }, [isModalOpenAdd]);

  useEffect(() => {
    if (addSaving && addSaving?.isSuccess) {
      setIsModalOpenAdd(false);
      getAllAccountGroup();
    }
  }, [addSaving]);

  useEffect(() => {
    if (editSaving && editSaving?.isSuccess) {
      setIsModalOpenEdit(false);
      getAllAccountGroup();
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
  const getAllAccountGroup = async () => {
    await listApiCall(url.DETAILED_ACCOUNT_GROUP);
  };
  const onDelSuccess = async (id) => {
    await delApiCall(`${url.DETAILED_ACCOUNT_GROUP}/${id}`);
  };
  const onSubmitAdd = async (val) => {
    const data = { ...val };
    await addApiCall(url.DETAILED_ACCOUNT_GROUP, data);
  };
  const onSubmitEdit = async (val) => {
    const data = { ...val, id: editingValue.id };
    await editApiCall(url.DETAILED_ACCOUNT_GROUP, data);
  };
  //====================================================================
  //                        Events
  //====================================================================
  const onEdit = (val) => {
    setEditingValue(val);
    setIsModalOpenEdit(true);
  };
  const onView = (id) => {
    setModalContent(<DetailedAccountGroupDescription id={id} key={id} />);
    setDescription(true);
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
          getAllAccountGroup();
        }}
      />
    );
  };
  const Grid = () => {
    return (
      <>
        <Ant.Table
          loading={delLoading}
          {...defaultValues.TABLE_PROPS}
          title={title}
          columns={columns(onDelSuccess, onEdit, onView)}
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
        <FrmEditDetailedAccountGroup
          obj={editingValue}
          onFinish={onSubmitEdit}
          loading={editLoading}
        />
      </Ant.Modal>

      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} title={"گروه های تفصیل"} type="inner">
        <Ant.Skeleton loading={listLoading}>
          <Grid />
        </Ant.Skeleton>
      </Ant.Card>

      <Ant.Modal
        width={800}
        open={isDescription}
        handleCancel={() => {
          setDescription(false);
        }}
        onCancel={() => {
          setDescription(false);
        }}
        footer={null}
        centered
      >
        {modalContent}
      </Ant.Modal>

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
        <FrmAddDetailedAccountGroup
          onFinish={onSubmitAdd}
          ref={formAccountGroup}
          loading={addLoading}
        />
      </Ant.Modal>
    </>
  );
};
export default DetailedAccountGroupList;
