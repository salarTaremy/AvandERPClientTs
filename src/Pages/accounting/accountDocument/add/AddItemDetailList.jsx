import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import * as defaultValues from "@/defaultValues";

import CoustomContent from "@/components/common/CoustomContent";
import ButtonList from "@/components/common/ButtonList";
import { MdDescription } from "react-icons/md";
import ModalHeader from "@/components/common/ModalHeader";
import FrmAddItemDetail from "../add/FrmAddItemDetail"
const AddItemDetailList = () => {
  const [dataSource, setDataSource] = useState({});
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);

  //====================================================================
  //                        useEffects
  //====================================================================
  const columns = [
    // {
    //   title: "شماره ردیف",
    //   dataIndex: "rowNumber",
    //   key: "rowNumber",
    //   align: "center",
    //   className: "text-xs sm:text-sm",
    //   width: 100,
    // },
    {
      title: "حساب کد",
      dataIndex: "accountId",
      key: "accountId",
      align: "center",
      width: 120,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح چهار",
      dataIndex: "detailedAccountId4",
      key: "detailedAccountId4",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح پنج",
      dataIndex: "detailedAccountId5",
      key: "detailedAccountId5",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "حساب تفصیلی سطح شش",
      dataIndex: "detailedAccountId6",
      key: "detailedAccountId6",
      align: "center",
      width: 300,
      className: "text-xs sm:text-sm",
    },
    {
      title: "شرح ",
      dataIndex: "article",
      key: "article",
      className: "text-xs sm:text-sm",
      width: 300,
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
  //                        Functions
  //====================================================================

  const onAdd = () => {
    setModalContent(
      <FrmAddItemDetail />,
    );

    setModalState(true);
  };

  //====================================================================
  //                        Child Components
  //=====================================================================

  const title = () => {
    return <ButtonList onAdd={onAdd} />;
  };
  const Grid = () => {
    return (
      <>
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          columns={columns}
          title={title}
          //   dataSource={dataSource}
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
