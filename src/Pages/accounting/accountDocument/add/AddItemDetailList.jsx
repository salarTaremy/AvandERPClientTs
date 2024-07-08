import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import * as defaultValues from "@/defaultValues";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import CoustomContent from "@/components/common/CoustomContent";
import ButtonList from "@/components/common/ButtonList";
import { MdDescription } from "react-icons/md";
import { usePostWithHandler } from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import * as uuid from "uuid";
import useRequestManager from "@/hooks/useRequestManager";
import FrmAddItemDetail from "../add/FrmAddItemDetail";
const AddItemDetailList = (props) => {
  const { onSuccess, id, key } = props;
  const [formData, setFormData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  const [submitListData, submitLoading, submitError, submitApiCall] =
    usePostWithHandler();
  useRequestManager({
    error: submitError,
    loading: submitLoading,
    data: submitListData,
  });
  const columns = [
    {
      title: " نام حساب",
      dataIndex: "accountName",
      key: "accountName",
      align: "center",
      width: 200,
      className: "text-xs sm:text-sm",
    },
    {
      title: "شماره مرجع",
      dataIndex: "referenceNo",
      key: "referenceNo",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح چهار",
      dataIndex: "detailedAccountIdName4",
      key: "detailedAccountIdName4",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح پنج",
      dataIndex: "detailedAccountIdName5",
      key: "detailedAccountIdName5",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح شش",
      dataIndex: "detailedAccountIdName6",
      key: "detailedAccountIdName6",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "شرح ",
      dataIndex: "article",
      key: "article",
      className: "text-xs sm:text-sm",
      width: 120,
    },
    {
      title: "بدهکار",
      dataIndex: "debtor",
      key: "debtor",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
    },
    {
      title: "بستانکار",
      dataIndex: "creditor",
      key: "creditor",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
  ];
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    generateDataSource(formData);
  }, [formData]);

  //====================================================================
  //                        Functions
  //====================================================================
  const generateDataSource = (formData) => {
    const newDataSource = [...dataSource, formData];
    setDataSource(newDataSource);
  };

  //====================================================================
  //                        Functions
  //====================================================================
  const closeModal = () => {
    setModalState(false);
  };
  const handleDataSubmit = (newData) => {
    setFormData(newData);
  };
  const btnSubmit = () => {
    console.log(dataSource);
  };

  const onAdd = () => {
    setModalContent(
      <FrmAddItemDetail
        key={id}
        onDataSubmit={handleDataSubmit}
        closeModal={closeModal}
      />,
    );

    setModalState(true);
  };

  //====================================================================
  //                        Child Components
  //=====================================================================

  const title = () => {
    return <ButtonList onAdd={onAdd} btnSubmit={btnSubmit} />;
  };
  const Grid = () => {
    return (
      <>
        <Ant.Table
          key={id}
          {...defaultValues.TABLE_PROPS}
          columns={columns}
          title={title}
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
        open={modalState}
        {...defaultValues.MODAL_PROPS}
        {...defaultValues.MODAL_LARGE}
        getContainer={null}
        footer={null}
        onCancel={() => {
          setModalState(false);
        }}
        onOk={() => {
          setModalState(false);
        }}
      >
        {modalContent}
      </Ant.Modal>

      <ModalHeader title={"اضافه کردن جزییات"} icon={<MdDescription />} />
      <CoustomContent Height="70vh">
        <Grid />
      </CoustomContent>
    </>
  );
};

export default AddItemDetailList;
AddItemDetailList.propTypes = {
  onSuccess: PropTypes.func,
  id: PropTypes.number.isRequired,
};
