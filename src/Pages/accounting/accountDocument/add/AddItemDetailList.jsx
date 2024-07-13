import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as defaultValues from "@/defaultValues";
import PropTypes from "prop-types";
import qs from "qs";
import * as url from "@/api/url";
import CoustomContent from "@/components/common/CoustomContent";
import ButtonList from "@/components/common/ButtonList";
import { MdDescription } from "react-icons/md";

import { useFetchWithHandler, usePutWithHandler } from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import * as uuid from "uuid";
import useRequestManager from "@/hooks/useRequestManager";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import FrmAddItemDetail from "../add/FrmAddItemDetail";
const AddItemDetailList = (props) => {
  const { id } = props;
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [formData, setFormData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  const [submitListData, submitLoading, submitError, submitApiCall] =
  usePutWithHandler();
  useRequestManager({ error: error });
  useRequestManager({
    error: submitError,
    loading: submitLoading,
    data: submitListData,
  });

  const columns = [
    {
      title: "شماره ردیف",
      dataIndex: "rowNumber",
      key: "rowNumber",
      align: "center",
      className: "text-xs sm:text-sm",
      width: 100,
    },
    {
      title: " نام حساب",
      dataIndex: "accountName",
      key: "0",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "شماره مرجع",
      dataIndex: "referenceNo",
      key: "1",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح چهار",
      dataIndex: "detailedAccountName4",
      key: "2",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح پنج",
      dataIndex: "detailedAccountName5",
      key: "3",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح شش",
      dataIndex: "detailedAccountName6",
      key: "4",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "شرح ",
      dataIndex: "article",
      key: "5",
      width: 120,
      className: "text-xs sm:text-sm",
    },
    {
      title: "بدهکار",
      dataIndex: "debtor",
      key: "6",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
    },
    {
      title: "بستانکار",
      dataIndex: "creditor",
      key: "7",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
    },
    {
      title: "توضیحات",
      dataIndex: "description",
      key: "8",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 1,
      align: "center",
      width: 100,

      render: (text, val) => (
        <>
          <Ant.Space direction="horizontal" size={20}>
            <Ant.Button
              className="text-blue-600"
              onClick={() => onEdit(val)}
              icon={<FiEdit />}
              type="text"
            />
          </Ant.Space>
          <Ant.Popconfirm
            onConfirm={() => onDelete(val)}
            title={`برای حذف سطر مطمئن هستید؟`}
          >
            <Ant.Button
              className="text-red-600"
              icon={<RiDeleteBin6Line />}
              type="text"
            />
          </Ant.Popconfirm>
        </>
      ),
    },
  ];
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllAccountingDocumentDetail();
  }, []);
  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);


  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      setDataSource((prevDataSource) => {
        if (Array.isArray(prevDataSource)) {
          return [...prevDataSource, formData];
        } else {
          return [formData];
        }
      });
    }
  }, [formData]);
  //====================================================================
  //                        Functions
  //====================================================================
  const getAllAccountingDocumentDetail = async () => {
    debugger;
    const data = {
      AccountingDocumentID: id,
    };
    const queryString = qs.stringify(data);
    await ApiCall(`${url.ACCOUNT_DOCUMENT_DETAIL}?${queryString}`);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const handleDataSubmit = (newData) => {
    setFormData(newData);

  };

  const btnSubmit = async () => {
    console.log(dataSource, "dataSourcedataSource");
    // if (listData?.isSuccess) {
    debugger
    const formattedData = dataSource.map((item) => {
      return {
        id:item.id,
        accountId:item.accountId,
        detailedAccountId4: item.detailedAccountId4,
        detailedAccountId5: item.detailedAccountId5,
        detailedAccountId6: item.detailedAccountId6,
        creditor: item.creditor,
        debtor: item.debtor,
        accountId: item.accountId,
        accountingDocumentID: id,
        referenceNo: item.referenceNo ?? "",
        description: item.description ?? "",
        article: item.article,
      };
    });
    // }

    console.log(formattedData, "formattedData11");
    await submitApiCall(url.ACCOUNT_DOCUMENT_DETAIL_UPDATE_LIST, formattedData);

  };

  const onDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key.key);
    setDataSource(newData);
  };

  const onAdd = (id) => {
    console.log(id,"kkkkk")
    setModalContent(
      <FrmAddItemDetail
        key={uuid.v4()}
        id={id}
        onDataSubmit={handleDataSubmit}
        closeModal={closeModal}
      />,
    );
    setModalState(true);
  };

  const onEdit = (id) => {
    // alert(id)
    // setModalContent(
    //   <FrmAddItemDetail
    //     key={uuid.v4()}
    //     id={id}
    //     onDataSubmit={handleDataSubmit}
    //     closeModal={closeModal}
    //   />
    // );
    // setModalState(true);
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
      <CoustomContent Height="70vh" loading={loadingData}>
        <Grid />
      </CoustomContent>
    </>
  );
};

export default AddItemDetailList;
AddItemDetailList.propTypes = {
  id: PropTypes.number,
};
