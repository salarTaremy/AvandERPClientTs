import React from "react";
import { useEffect, useState } from "react";
import * as Ant from "antd";
import * as defaultValues from "@/defaultValues";
import PropTypes, { string } from "prop-types";
import qs from "qs";
import * as url from "@/api/url";
import * as api from "@/api";
import CustomContent from "@/components/common/CustomContent";
import ButtonList from "@/components/common/ButtonList";
import { MdDescription } from "react-icons/md";
import { useFetchWithHandler, usePutWithHandler } from "@/api";
import ModalHeader from "@/components/common/ModalHeader";
import * as uuid from "uuid";
import useRequestManager from "@/hooks/useRequestManager";
import { ImFileExcel } from "react-icons/im";
import FrmAddItemDetail from "../add/FrmAddItemDetail";
import FrmEditItemDetail from "../add/FrmEditItemDetail";
import ErrorDetailListTable from "../add/ErrorDetailListTable";
import useAllLoading from "@/hooks/useAllLoading ";
import columns from "../add/columns";
import * as XLSX from "xlsx";

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
  const [modalSize, setModalSize] = useState({ ...defaultValues.MODAL_LARGE });
  const [modalState, setModalState] = useState(false);
  const [errorList, setErrorList] = useState({});
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
  const allLoading = useAllLoading([
    accountGroupLoading,
    dtAccLoading,
    loadingAccDocumentDetail,
    listLoadingHeader,
  ]);
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
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const items = [
    {
      label: (
        <Ant.Upload
          accept={".xlsx"}
          //  accept={".xlsx, .xls"}
          // itemRender = {() => {<></>}}
          showUploadList={false}
          maxCount={1}
          beforeUpload={(file) => {
            handleFileUpload(file);
            return false;
          }}
          disabled={isFileUploaded}
        >
          {"وارد کردن فایل اکسل"}
        </Ant.Upload>
      ),
      key: "1",
    },
    {
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => handleDownloadExampleXLSX()}
        >
          {"نمونه فایل اکسل"}
        </a>
      ),
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
      [
        "کد حساب",
        "شماره مرجع",
        "حساب تفصیلی سطح چهار",
        "حساب تفصیلی سطح پنج",
        "حساب تفصیلی سطح شش",
        "شرح ",
        "بدهکار",
        "بستانکار",
        "توضیحات",
      ],
    ];
    const sheet = XLSX.utils.aoa_to_sheet(sampleExcelData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, sheet, "Sheet1");

    const excelFileContent = XLSX.write(newWorkbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelFileContent], {
      type: "application/octet-stream",
    });
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
        accountingDocumentID: id,
        referenceNo: item.referenceNo ?? "",
        description: item.description ?? "",
        article: item.article,
      };
    });

    await submitApiCall(url.ACCOUNT_DOCUMENT_DETAIL_UPDATE_LIST, formattedData);
    setIsFileUploaded(false);
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
    setModalSize({ ...defaultValues.MODAL_LARGE });
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
    setModalSize({ ...defaultValues.MODAL_LARGE });
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
  const onError = (val) => {
    const key = val?.key;
    const updateList = { ...defaultValues.MODAL_LARGE, width: 520 };
    setModalSize(updateList);
    setModalContent(
      <ErrorDetailListTable errorsList={errorList} myKey={key} obj={val} />,
    );
    setModalState(true);
  };

  const handleFileUpload = (file) => {
    setIsFileUploaded(false);
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (!excelData) return;
      const newData = createDataObjectsExcel(excelData);
      const errors = validateNewData(newData);

      setErrorList(errors);

      setDataSource((prevData) =>
        prevData ? [...prevData, ...newData] : newData,
      );
    };

    reader.readAsArrayBuffer(file);
    setIsFileUploaded(true);
  };

  const createDataObjectsExcel = (excelData) => {
    return excelData.slice(1).map((item, index) => ({
      id: uuid.v4(),
      key: uuid.v4(),
      rowNumber: calculateRowNumber(dataSource, index),
      accountId: item[0],
      accountName: item[0],
      detailedAccountName4: item[2] ?? null,
      detailedAccountName5: item[3] ?? null,
      detailedAccountName6: item[4] ?? null,
      referenceNo: String(item[1]),
      detailedAccountId4: item[2],
      detailedAccountId5: item[3],
      detailedAccountId6: item[4],
      article: String(item[5] ?? ""),
      debtor: item[6] ?? 0,
      creditor: item[7] ?? 0,
      description: item[8],
    }));
  };

  const calculateRowNumber = (dataSource, index) => {
    return dataSource && dataSource.length > 0
      ? dataSource[dataSource.length - 1]?.rowNumber + index + 1
      : index + 1;
  };

  const validateNewData = (newData) => {
    const errors = {};

    newData.forEach((item) => {
      errors[item.key] = [];

      updateDetailedAccountNames(item);
      validateAccountDetai(item, errors);
    });

    return errors;
  };

  const updateDetailedAccountNames = (item) => {

    if (dtAccData?.isSuccess) {
      dtAccData.data.forEach((i) => {
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
    }

    if (accounGrouptData?.isSuccess) {
      accounGrouptData.data.forEach((accoun) => {
        if (accoun.id === item.accountId) {
          item.accountName = accoun.name;
        }
      });
    }
  };

  const validateAccountDetai = (item, errors) => {
    if (item.detailedAccountName4 === item.detailedAccountName5) {
      errors[item.key].push("حساب تفصیلی 4,5 نباید باهم یکی باشند");
    }
    if (item.detailedAccountName5 === item.detailedAccountName6) {
      errors[item.key].push("حساب تفصیلی 5,6 نباید باهم یکی باشند");
    }
    if (item.detailedAccountName4 === item.detailedAccountName6) {
      errors[item.key].push("حساب تفصیلی 4,6 نباید باهم یکی باشند");
    }

    if (item.debtor === 0 && item.creditor === 0) {
      errors[item.key].push(
        "بدهکار و بستانکار همزمان نمیتوتنند مقدار صفر داشنته باشند",
      );
    } else if (item.debtor > 0 && item.creditor > 0) {
      errors[item.key].push("یکی از مقادیربدهکار یا بستانکار باید صفر باشد");
    }

    validateAccountIds(item, errors);
  };

  const validateAccountIds = (item, errors) => {
    if (accounGrouptData?.isSuccess) {
      const isValidAccount = accounGrouptData.data.some(
        (accoun) => accoun.id === item.accountId,
      );
      if (!isValidAccount) {
        errors[item.key].push("حساب نامعتبر است");
      }
    }

    if (dtAccData?.isSuccess) {
      [
        "detailedAccountId4",
        "detailedAccountId5",
        "detailedAccountId6",
      ].forEach((detaile) => {
        const isValid = dtAccData.data.some(
          (accoun) => accoun.id === item[detaile],
        );
        if (!isValid) {
          errors[item.key].push(
            `حساب سطح ${detaile[detaile.length - 1]} نامعتبر است`,
          );
        }
      });
    }
  };

  //====================================================================
  //                        Child Components
  //=====================================================================

  const title = () => {
    return (
      <>
        <ButtonList onAdd={onAdd} onSave={btnSubmit}>
          <Ant.Tooltip title={"وارد کرد فایل اکسل"}>
            <Ant.Dropdown.Button
              menu={{
                items,
              }}
              size="large"
            >
              <ImFileExcel style={{ color: "green" }} />
            </Ant.Dropdown.Button>
          </Ant.Tooltip>
        </ButtonList>
      </>
    );
  };
  const Grid = () => {
    return (
      <>
        <Ant.Table
          loading={allLoading}
          key={id}
          {...defaultValues.TABLE_PROPS}
          columns={columns(onDelete, onEdit, onError)}
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
        {...defaultValues.MODAL_EXTRA_LARGE}
        {...modalSize}
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
          (allLoading && <Ant.Spin />) ||
          `اضافه کردن جزییات : شماره سند  (${listDataHeader?.isSuccess && listDataHeader?.data.id}) ,تاریخ (${listDataHeader?.isSuccess && listDataHeader?.data.persianDateTilte}) `
        }
        icon={<MdDescription />}
      />
      <CustomContent height="75vh" loading={allLoading}>
        <Grid />
        <Ant.Row>
          <Ant.Col>
            <CustomContent bordered>
              <Ant.Descriptions
                bordered={false}
                layout="horizontal"
                size="small"
                items={documentInfo}
              />
            </CustomContent>
          </Ant.Col>
        </Ant.Row>
      </CustomContent>
    </>
  );
};

export default AddItemDetailList;
AddItemDetailList.propTypes = {
  id: PropTypes.number,
};
