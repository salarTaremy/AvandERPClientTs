import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as defaultValues from "@/defaultValues";
import PropTypes, { string } from "prop-types";
import qs from "qs";
import * as url from "@/api/url";
import * as api from "@/api";
import CoustomContent from "@/components/common/CoustomContent";
import ButtonList from "@/components/common/ButtonList";
import { MdDescription } from "react-icons/md";
import { useFetchWithHandler, usePutWithHandler } from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import * as uuid from "uuid";
import useRequestManager from "@/hooks/useRequestManager";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { ImFileExcel } from "react-icons/im";
import FrmAddItemDetail from "../add/FrmAddItemDetail";
import FrmEditItemDetail from "../add/FrmEditItemDetail";
import columns from "../add/columns";
import * as XLSX from "xlsx";
const AddItemDetailList = (props) => {
  const { id } = props;
  const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
  const [formData, setFormData] = useState({});
  const [dataSource, setDataSource] = useState([]);

  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  const [totalCreditor, setTotalCreditor] = useState(0);
  const [totalDebtor, setTotalDebtor] = useState(0);
  const [data, setData] = useState(null);
  const [
    listDataHeader,
    listLoadingHeader,
    listErrorHeader,
    listApiCallHeader,
  ] = api.useFetchWithHandler();
  const [submitListData, submitLoading, submitError, submitApiCall] =
    usePutWithHandler();
  useRequestManager({ error: listErrorHeader });
  useRequestManager({ error: error });
  useRequestManager({
    error: submitError,
    loading: submitLoading,
    data: submitListData,
  });
  const documentInfo = [
    {
      key: "1",
      label: "جمع بستانکار",
      children: totalCreditor.toLocaleString(),
    },
    {
      key: "2",
      label: "جمع بدهکار",
      children: totalDebtor.toLocaleString(),
    },
    {
      key: "3",
      label: "تفاضل",
      children: (totalCreditor - totalDebtor).toLocaleString(),
    },
  ];

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getAllAccountingDocumentDetail();
  }, []);
  useEffect(() => {
    submitListData?.isSuccess && getAllAccountingDocumentDetail();
  }, [submitListData?.isSuccess]);

  useEffect(() => {
    onHeader();
  }, []);
  useEffect(() => {
    setDataSource((listData?.isSuccess && listData?.data) || null);
  }, [listData]);

  useEffect(() => {
    if (dataSource) {
      const creditorSum = dataSource.reduce(
        (acc, item) => acc + item.creditor,
        0,
      );
      setTotalCreditor(creditorSum);

      const debtorSum = dataSource.reduce((acc, item) => acc + item.debtor, 0);
      setTotalDebtor(debtorSum);
    }
  }, [dataSource]);

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

  const onHeader = async () => {
    await listApiCallHeader(`${url.ACCOUNT_DOCUMENT}/${id}`);
  };
  const getAllAccountingDocumentDetail = async () => {
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
  const handleDataSubmitEdit = (newData) => {
    setDataSource((pre) => {
      return pre.map((item) => {
        if (item.id === newData.id) {
          return newData;
        } else {
          return item;
        }
      });
    });
  };
  const closeModalEdit = () => {
    setModalState(false);
  };
  const btnSubmit = async () => {
    const formattedData = dataSource.map((item) => {
      return {
        id: typeof item.id === "string" ? null : item.id,
        accountId: item.accountId,
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
    console.log(formattedData, "formattedData");
    await submitApiCall(url.ACCOUNT_DOCUMENT_DETAIL_UPDATE_LIST, formattedData);
  };

  const onDelete = (val) => {
    {
      val.key !== undefined
        ? setDataSource((prevDataSource) => {
            return prevDataSource.filter((item) => item.key !== val.key);
          })
        : setDataSource((prevDataSource) => {
            return prevDataSource.filter((item) => item.id !== val.id);
          });
    }
  };

  const onAdd = (id) => {
    setModalContent(
      <FrmAddItemDetail
        key={uuid.v4()}
        onDataSubmit={handleDataSubmit}
        closeModal={closeModal}
      />,
    );
    setModalState(true);
  };

  const onEdit = (val) => {
    setModalContent(
      <FrmEditItemDetail
        key={uuid.v4()}
        id={val?.id ?? val?.key}
        obj={val}
        onDataSubmitEdit={handleDataSubmitEdit}
        closeModal={closeModalEdit}
      />,
    );
    setModalState(true);
  };

  const btnUpload = (file) => {
    console.log(file, "gagag");
  };
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      debugger;
      setData(excelData);
      // if (excelData) {
      //   setDataSource((prevData) => [...prevData, ...excelData]);
      //   setData(null);
      // }
      if (excelData) {
        console.log(excelData, "excelData");
        const newData = excelData.slice(1).map((item, index) => ({
          key: index,
          rowNumber: 0,
          accountName: item[0],
          referenceNo: item[1],
          detailedAccountName4: item[2],
          detailedAccountName5: item[3],
          detailedAccountName6: item[4],
          article: item[5],
          debtor: item[6],
          creditor: item[7],
          description: item[8],
        }));

        console.log(newData, "newData");
        setDataSource((prevData) => [...prevData, ...newData]);
        setData(null);
      }
    };
    // reader.readAsArrayBuffer(file);
    reader.readAsBinaryString(file);
  };
  //====================================================================
  //                        Child Components
  //=====================================================================

  const title = () => {
    return (
      <>
        <ButtonList onAdd={onAdd} onSave={btnSubmit}>
          <Ant.Tooltip title={" وارد کرد فایل اکسل"}>
            <Ant.Upload
              beforeUpload={(file) => {
                handleFileUpload(file);
                return false;
              }}
            >
              <Ant.Button
                className="text-green-700 border-green-700"
                size="large"
              >
                <ImFileExcel />
              </Ant.Button>
            </Ant.Upload>
          </Ant.Tooltip>
        </ButtonList>
      </>
    );
  };
  const Grid = () => {
    return (
      <>
        {data && (
          <div>
            <h2>Imported Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}

        <Ant.Table
          key={id}
          {...defaultValues.TABLE_PROPS}
          columns={columns(onDelete, onEdit)}
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

      <ModalHeader
        title={`اضافه کردن جزییات : شماره سند  (${listDataHeader?.isSuccess && listDataHeader?.data.id}) ,تاریخ (${listDataHeader?.isSuccess && listDataHeader?.data.persianDateTilte}) `}
        icon={<MdDescription />}
      />
      <CoustomContent height="75vh" loading={loadingData}>
        <Grid />
        <Ant.Row>
          <Ant.Col>
            <Ant.Descriptions
              bordered={false}
              layout="horizontal"
              size="small"
              items={documentInfo}
            />
          </Ant.Col>
        </Ant.Row>
      </CoustomContent>
    </>
  );
};

export default AddItemDetailList;
AddItemDetailList.propTypes = {
  id: PropTypes.number,
};
