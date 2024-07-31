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
import writeXlsxFile from 'write-excel-file'
const AddItemDetailList = (props) => {
  const { id } = props;
  const [
    listAccDocumentDetail,
    loadingAccDocumentDetail,
    errorAccDocumentDetail,
    ApiCallAccDocumentDetail,
  ] = useFetchWithHandler();
  const [formData, setFormData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [modalContent, setModalContent] = useState();
  const [modalState, setModalState] = useState(false);
  const [totalCreditor, setTotalCreditor] = useState(0);
  const [totalDebtor, setTotalDebtor] = useState(0);
  const [
    accounGrouptData,
    accountGroupLoading,
    accountGroupError,
    accoupGroupApicall,
  ] = api.useFetchWithHandler();
  const [dtAccData, dtAccLoading, dtAccError, dtAccApi] = useFetchWithHandler();
  const [submitListData, submitLoading, submitError, submitApiCall] =
    usePutWithHandler();
  const [listDataHeader, listLoadingHeader, errorHeader, listApiCallHeader] =
    api.useFetchWithHandler();
  useRequestManager({ error: errorHeader });
  useRequestManager({ error: errorAccDocumentDetail });
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
  const items = [
    {
      label: (
        <Ant.Upload
          beforeUpload={(file) => {
            handleFileUpload(file);
            return false;
          }}
        >
          {"وارد کردن فایل اکسل"}
        </Ant.Upload>
      ),
      key: "1",
    },
    {
      label: (<a rel="noopener noreferrer" onClick={() => handleDownloadExampleXLSX()}>
        {"نمونه فایل اکسل"}
      </a>),
      key: "2",
    },
  ];

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {
    onHeader();
  }, []);
  useEffect(() => {
    getAllAccountingDocumentDetail();
  }, []);
  useEffect(() => {
    accoupGroupApicall(url.ACCOUNT);
  }, []);
  useEffect(() => {
    dtAccApi(url.DETAILED_ACCOUNT);
  }, []);

  useEffect(() => {
    accounGrouptData?.isSuccess &&
      console.log(accounGrouptData?.data, "account");
  }, [accounGrouptData]);

  useEffect(() => {
    dtAccData?.isSuccess && console.log(dtAccData?.data, "dtAccData");
  }, [dtAccData]);

  useEffect(() => {
    setDataSource(
      (listAccDocumentDetail?.isSuccess && listAccDocumentDetail?.data) || null,
    );
  }, [listAccDocumentDetail]);

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

  useEffect(() => {
    submitListData?.isSuccess && getAllAccountingDocumentDetail();
  }, [submitListData?.isSuccess]);

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
    await ApiCallAccDocumentDetail(
      `${url.ACCOUNT_DOCUMENT_DETAIL}?${queryString}`,
    );
  };

  const closeModal = () => {
    setModalState(false);
  };

  const handleDownloadExampleXLSX = () => {
    const sampleExcelData = [
      ["کد حساب", "شماره مرجع", "حساب تفصیلی سطح چهار", "حساب تفصیلی سطح پنج", "حساب تفصیلی سطح شش", "شرح ", "بدهکار", "بستانکار", "توضیحات"],
    ];
    const sheet = XLSX.utils.aoa_to_sheet(sampleExcelData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, sheet, "Sheet1");

    const excelFileContent = XLSX.write(newWorkbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelFileContent], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sample.xlsx");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

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

  const onAdd = () => {
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

  const handleFileUpload = (file) => {
    //  accoupGroupApicall(url.ACCOUNT);
    //  dtAccApi(url.DETAILED_ACCOUNT);

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (excelData) {
        console.log(excelData, "excelData");
        const newData = excelData.slice(1).map((item, index) => ({
          id: uuid.v4(),
          key: uuid.v4(),
          rowNumber: 0,
          accountId: item[0],
          accountName: 0,
          detailedAccountName4: 0,
          detailedAccountName5: 0,
          detailedAccountName6: 0,
          referenceNo: String(item[1]),
          detailedAccountId4: item[2],
          detailedAccountId5: item[3],
          detailedAccountId6: item[4],
          article: String(item[5]),
          debtor: item[6] ?? 0,
          creditor: item[7] ?? 0,
          description: item[8],
        }));

        accounGrouptData?.isSuccess &&
          accounGrouptData?.data.forEach((accoun) => {
            newData.forEach((item) => {
              if (accoun.id === item.accountId) {
                item.accountName = accoun.name;
              }
            });
          });
        dtAccData?.isSuccess &&
          dtAccData?.data.forEach((i) => {
            newData.forEach((item) => {
              if (i.id === item.detailedAccountId4) {
                item.detailedAccountName4 = i.name;
              }
              if (i.id === item.detailedAccountId5) {
                item.detailedAccountName5 = i.name;
              }
              if (i.id === item.detailedAccountId6) {
                item.detailedAccountName6 = i.name;
              }
            });
          });

        setDataSource((prevData) =>
          prevData ? [...prevData, ...newData] : newData,
        );
      }
    };
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
            <Ant.Dropdown.Button
              menu={{
                items,
              }}
              className="green-700 border-green-700"
              size="large"
            >
              <ImFileExcel />
            </Ant.Dropdown.Button>
          </Ant.Tooltip>
        </ButtonList>
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
        title={
          (listLoadingHeader && <Ant.Spin />) ||
          `اضافه کردن جزییات : شماره سند  (${listDataHeader?.isSuccess && listDataHeader?.data.id}) ,تاریخ (${listDataHeader?.isSuccess && listDataHeader?.data.persianDateTilte}) `
        }
        icon={<MdDescription />}
      />
      <CoustomContent height="75vh" >
        <Ant.Table
          key={id}
          {...defaultValues.TABLE_PROPS}
          columns={columns(onDelete, onEdit)}
          title={title}
          dataSource={dataSource}
          loading={loadingAccDocumentDetail}
        />
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
