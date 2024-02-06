import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import qs from "qs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFetch } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";
import * as uuid from "uuid";
export const Table = (props) => {
  const {
    onSubmit,
    footer,
    updateDebtor,
    updateCreditor,
    updateDebtorEdit,
    updateCreditorEdit,
    dataEdit,
  } = props;
  const [form] = Ant.Form.useForm();
  const [accountData, accountLoading, accountError] = useFetch(url.ACCOUNT);
  const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT);
  const [
    listDataDetail,
    listLoadingDetail,
    listErrorDetail,
    listApiCallDetail,
  ] = api.useFetchWithHandler();
  useRequestManager({ error: listErrorDetail });
  useRequestManager({ error: accountError });
  useRequestManager({ error: dtAccError });
  const [dataSource, setDataSource] = useState([]);
  const [dataNewSource, setNewDataSource] = useState([]);
  const params = useParams();
  const commonOptions = {
    placeholder: "انتخاب کنید...",
    showSearch: true,
    filterOption: (input, option) =>
      option.name.indexOf(input) >= 0 || option.fullCode.indexOf(input) >= 0,
  };
  const borderStyle = {
    border: "1px solid #80808047",
    padding: "2px 2rem ",
    borderRadius: "5px",
  };
  //====================================================================
  //                            useEffects
  //====================================================================

  useEffect(() => {
    onEditDetail();
  }, []);

  useEffect(() => {
    if (listDataDetail) {
      const result = listDataDetail?.data.map((item) => (
   console.log(item,"itemmmmm")
        // ...item,
        // id: item.id,
        // key: uuid.v1(),

      ));
      setNewDataSource(result);
    }
  }, [listDataDetail]);

  useEffect(() => {
    if (params.id == undefined && params.id == null) {
      let totalDebit = 0;
      dataSource.map((item) => {
        totalDebit += (item.valueDebtor && parseInt(item.valueDebtor)) || 0;
        updateDebtor(totalDebit);
      });
    }
  }, [dataSource]);

  useEffect(() => {
    if (params.id == undefined && params.id == null) {
      let totalCredit = 0;
      dataSource.map((item) => {
        totalCredit +=
          (item.valueCreditor && parseInt(item.valueCreditor)) || 0;
        updateCreditor(totalCredit);
      });
    }
  }, [dataSource]);

  useEffect(() => {
    if (params.id !== undefined && params.id !== null) {
      let totalDebit = 0;
      listDataDetail?.data.map((item) => {
        totalDebit += (item.debtor && parseInt(item.debtor)) || 0;
        updateCreditorEdit(totalDebit);
      });
      dataNewSource.map((item) => {
        totalDebit += (item.valueDebtor && parseInt(item.valueDebtor)) || 0;
        updateDebtorEdit(totalDebit);
      });
    }
  }, [dataNewSource]);

  useEffect(() => {
    if (params.id !== undefined && params.id !== null) {
      let totalCredit = 0;
      listDataDetail?.data.map((item) => {
        totalCredit += (item.creditor && parseInt(item.creditor)) || 0;
        updateCreditorEdit(totalCredit);
      });

      dataNewSource.map((item) => {
        totalCredit +=
          (item.valueCreditor && parseInt(item.valueCreditor)) || 0;
        updateCreditorEdit(totalCredit);
      });
    }
  }, [dataNewSource]);

  useEffect(() => {
    if (params.id !== undefined && params.id !== null) {
      dataEdit(listDataDetail);
    }
  }, [listDataDetail]);
  //====================================================================
  //                        Functions
  //====================================================================
  const onFinish = (values) => {
    onSubmit({
      ...values,
    });
  };

  const onEditDetail = async () => {
    if (params.id !== undefined && params.id !== null) {
      const queryString = qs.stringify({
        AccountingDocumentID: parseInt(params.id),
      });
      await listApiCallDetail(`${url.ACCOUNT_DOCUMENT_DETAIL}?${queryString}`);
    }
  };

  const onDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    if (params.id !== undefined && params.id !== null) {
      const newData = dataNewSource.filter((item) => item.key !== key);
      setNewDataSource(newData);
    }
  };
  const onChangeAccount = (value, key) => {
    const selected = accountData?.data.find((account) => account.id === value);

    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record.key === key.key) {
          return {
            ...record,
            accountId: value,
            fullCode: selected?.fullCode || null,
          };
        }
        return record;
      }),
    );
    if (params.id !== undefined || params.id !== null) {
      setNewDataSource((prevDataSource) =>
        prevDataSource.map((record) => {
          if (record.key === key.key) {
            return {
              ...record,
              accountId: value,
              fullCode: selected?.fullCode || null,
            };
          }
          return record;
        }),
      );
    }
  };
  const handleChangeDetailedAccount = (value, key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record.key === key) {
          return { ...record, detailedAccountId: value };
        }
        return record;
      }),
    );
  };
  const handleArticleInput = (e, key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record.key === key) {
          return { ...record, article: e?.target || "" };
        }
        return record;
      }),
    );
  };

  const handleDebtorInput = (e, key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record === key) {
          return { ...record, debtor: e?.target || 0, valueDebtor: e };
        }
        return record;
      }),
    );
    if (params.id !== undefined || params.id !== null) {
      setNewDataSource((prevDataSource) =>
        prevDataSource.map((record) => {
          if (record.id === key.id) {
            return { ...record, debtor: e?.target || 0, valueDebtor: e };
          }
          return record;
        }),
      );
    }
  };

  const handleCreditorInput = (e, key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.map((record) => {
        if (record.key === key) {
          return { ...record, creditor: e?.target || 0, valueCreditor: e };
        }
        return record;
      }),
    );
    if (params.id !== undefined || params.id !== null) {
      setNewDataSource((prevDataSource) =>
        prevDataSource.map((record) => {
          if (record.key === key) {
            return { ...record, creditor: e?.target || 0, valueCreditor: e };
          }
          return record;
        }),
      );
    }
  };
  const validateMessage = <small>فیلد حساب اجباری است</small>;
  //====================================================================
  //                        Child Components
  //====================================================================
  const handleAdd = () => {
    if (params.id !== undefined && params.id !== null) {
      const newData = {
        key: uuid.v1(),
      };
      setNewDataSource([...dataNewSource, newData]);
    }
    const data = {
      key: uuid.v1(),
    };
    setDataSource([...dataSource, data]);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 50,
      // hidden: true,
      render: (_, record) => {

        return (
          <Ant.Form.Item
            className="m-0"
            name={[record.key, "id"]}
            initialValue={record.id}
          >
            <Ant.Space>
              <strong style={borderStyle}>{record.id}</strong>
            </Ant.Space>
          </Ant.Form.Item>
        );
      },
    },
    {
      title: "حساب کد",
      dataIndex: "accountId",
      key: "accountId",
      align: "center",
      width: 50,
      render: (_, record) => (
        <Ant.Space>
          <strong style={borderStyle}>
            {record?.fullCode}
            {record.accountId}
          </strong>
        </Ant.Space>
      ),
    },

    {
      title: "حساب",
      dataIndex: "accountId",
      key: "accountId",
      width: 120,

      render: (_, record) => (
        <Ant.Form.Item
          className="m-0"
          rules={[
            {
              required: true,
              message: validateMessage,
            },
          ]}
          name={[record.key, "accountId"]}
          initialValue={record.accountId}
        >
          <Ant.Select
            {...commonOptions}
            value={record.accountId}
            onChange={(value) => onChangeAccount(value, record)}
            defaultValue={record.accountId}
            placeholder={"انتخاب کنید..."}
            disabled={accountLoading || false}
            loading={accountLoading}
            options={accountData?.data}
            fieldNames={{ label: "name", value: "id" }}
            rules={[{ required: true }]}
          />
        </Ant.Form.Item>
      ),
    },
    {
      title: "حساب تفصیلی",
      dataIndex: "detailedAccountId4",
      key: "detailedAccountId4",
      width: 120,
      render: (_, record) => (
        <Ant.Form.Item
          className="m-0"
          rules={[
            {
              required: false,
              message: "فیلد حساب تفصیلی اجباری است",
            },
          ]}
          name={[record.key, "detailedAccountId4"]}
          initialValue={record.detailedAccountId4}
        >
          <Ant.Select
            {...commonOptions}
            value={record.detailedAccountId}
            onChange={(value) => handleChangeDetailedAccount(value, record.key)}
            defaultValue={record.detailedAccountId4}
            placeholder={"انتخاب کنید..."}
            disabled={dtAccLoading || false}
            loading={dtAccLoading}
            options={dtAccData?.data}
            rules={[{ required: true }]}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>
      ),
    },
    {
      title: "حساب تفصیلی",
      dataIndex: "detailedAccountId5",
      key: "detailedAccountId5",
      width: 120,
      render: (_, record) => (
        <Ant.Form.Item
          className="m-0"
          rules={[
            {
              required: false,
              message: "فیلد حساب تفصیلی اجباری است",
            },
          ]}
          name={[record.key, "detailedAccountId5"]}
          initialValue={record.detailedAccountId5}
        >
          <Ant.Select
            {...commonOptions}
            value={record.detailedAccountId}
            onChange={(value) => handleChangeDetailedAccount(value, record.key)}
            defaultValue={record.detailedAccountId5}
            placeholder={"انتخاب کنید..."}
            disabled={dtAccLoading || false}
            loading={dtAccLoading}
            options={dtAccData?.data}
            rules={[{ required: true }]}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>
      ),
    },
    {
      title: "حساب تفصیلی",
      dataIndex: "detailedAccountId6",
      key: "detailedAccountId6",
      width: 120,
      render: (_, record) => (
        <Ant.Form.Item
          className="m-0"
          rules={[
            {
              required: false,
              message: "فیلد حساب تفصیلی اجباری است",
            },
          ]}
          name={[record.key, "detailedAccountId6"]}
          initialValue={record.detailedAccountId6}
        >
          <Ant.Select
            {...commonOptions}
            value={record.detailedAccountId}
            onChange={(value) => handleChangeDetailedAccount(value, record.key)}
            defaultValue={record.detailedAccountId6}
            placeholder={"انتخاب کنید..."}
            disabled={dtAccLoading || false}
            loading={dtAccLoading}
            options={dtAccData?.data}
            rules={[{ required: true }]}
            fieldNames={{ label: "name", value: "id" }}
          />
        </Ant.Form.Item>
      ),
    },
    {
      title: "شرح",
      dataIndex: "article",
      width: 80,
      key: "article",
      render: (_, record) => (
        <Ant.Form.Item
          className="m-0"
          rules={[
            {
              required: true,
              message: "فیلد شرح اجباری است",
            },
          ]}
          name={[record.key, "article"]}
          initialValue={record.article}
        >
          <Ant.Input
            onChange={(e) => handleArticleInput(e, record.key)}
            value={record.article}
            defaultValue={record.article}
          />
        </Ant.Form.Item>
      ),
    },
    {
      title: "بدهکار",
      dataIndex: "debtor",
      width: 80,
      key: "debtor",
      render: (_, record) => (
        <Ant.Form.Item
          className="m-0"
          rules={[
            {
              required: true,
              message: "فیلد بدهکار اجباری است",
            },
          ]}
          name={[record.key, "debtor"]}
          initialValue={record.debtor}
        >
          <Ant.InputNumber
            value={record.debtor}
            rules={[{ required: true }]}
            defaultValue={record.debtor}
            onChange={(e) => handleDebtorInput(e, record)}
            min={0}
            formatter={(value) =>
              value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>
      ),
    },
    {
      title: "بستانکار",
      dataIndex: "creditor",
      key: "creditor",
      width: 80,
      render: (_, record) => (
        <Ant.Form.Item
          className="m-0"
          rules={[
            {
              required: true,
              message: "فیلد بستانکار اجباری است",
            },
          ]}
          name={[record.key, "creditor"]}
          initialValue={record.creditor}
        >
          <Ant.InputNumber
            onChange={(e) => handleCreditorInput(e, record.key)}
            min={0}
            defaultValue={record.creditor}
            rules={[{ required: true }]}
            formatter={(value) =>
              value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            style={{ width: "100%" }}
          />
        </Ant.Form.Item>
      ),
    },
    {
      title: "عملیات",
      dataIndex: "operation",
      key: "operation",
      width: 50,
      align: "center",

      render: (text, val) => (
        <>
          <Ant.Popconfirm
            onConfirm={() => onDelete(val.key)}
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
  ].filter((item) => !item.hidden);

  //====================================================================
  //                      Functions
  //====================================================================
  const addRow = () => {
    return <ButtonList onAdd={handleAdd} />;
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={null}
      >
        <Ant.Card
          style={{
            width: "100%",
            marginTop: "15px",
          }}
        >
          <Ant.Row gutter={[16, 16]}>
            <Ant.Col span={24} md={24} lg={24}>
              <Ant.Table
                bordered={false}
                pagination={false}
                scroll={{
                  x: 2000,
                  y: "45vh",
                }}
                title={addRow}
                footer={footer}
                columns={columns}
                dataSource={
                  params.id !== undefined && params.id !== null
                    ? dataNewSource
                    : dataSource
                }
              ></Ant.Table>
              <pre>
                                {JSON.stringify(dataNewSource, null, 2)}
                            </pre>
            </Ant.Col>
          </Ant.Row>
        </Ant.Card>
      </Ant.Form>
    </>
  );
};
export default Table;
Table.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  footer: PropTypes.func,
  updateDebtor: PropTypes.func,
  updateCreditor: PropTypes.func,
  updateDebtorEdit: PropTypes.any,
  updateCreditorEdit: PropTypes.func,
  details: PropTypes.any,
  dataEdit: PropTypes.func,
};
