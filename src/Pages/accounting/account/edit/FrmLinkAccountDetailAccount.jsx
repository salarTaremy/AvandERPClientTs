import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useFetch, useFetchWithHandler, usePutWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { useEffect } from "react";
import useAllLoading from "@/hooks/useAllLoading ";
import * as url from "@/api/url";
import * as IconBs from "react-icons/bs";
import * as Ant from "antd";
import qs from "qs";
import ModalHeader from "@/components/common/ModalHeader";

const FrmLinkAccountDetailAccount = (props) => {
  const { account, onSuccess } = props;
  const [dataSource, setDataSource] = useState();
  const [detailedAccLevel, setDetailedAccLevel] = useState(null);
  const [data, loading, error, apiCall] = useFetchWithHandler();
  const [levelData, levelLoading, levelError, levelApiCall] =
    useFetchWithHandler();
  const [saveData, saveLoading, saveError, saveApiCall] = usePutWithHandler();
  useRequestManager({ error: error });
  useRequestManager({ error: levelError });
  useRequestManager({ error: saveError, data: saveData, loading: saveLoading });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    const queryString = qs.stringify({
      accountId: account.accountId,
    });
    apiCall(`${url.LINK_ACCOUNT_DETAILED_ACCOUNTGROUP}?${queryString}`);
    levelApiCall(url.DETAILED_ACCOUNT_LEVEL);
  }, [account.id, apiCall, levelApiCall]);

  useEffect(() => {
    data && data.data && setDataSource(data.data);
  }, [data]);

  useEffect(() => {
    levelData && levelData.data && setDetailedAccLevel(levelData.data);
  }, [levelData]);

  useEffect(() => {
    saveData?.isSuccess && onSuccess && onSuccess();
  }, [saveData]);
  //====================================================================
  //                        Functions
  //====================================================================

  const changeIsRequired = (id, val) => {
    const i = dataSource.findIndex((c) => c.id === id);
    dataSource[i].isRequired = val;
    setDataSource([...dataSource]);
  };

  const changeLevel = (id, val) => {
    const i = dataSource.findIndex((c) => c.id === id);
    dataSource[i].detailedAccountLevelId = val;
    if (!val) {
      dataSource[i].isRequired = false;
    }
    setDataSource([...dataSource]);
  };

  const columns = [
    {
      title: "گروه تفصیل",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <>
       
        <Ant.Typography.Text  strong> {`${record.detailedAccountGroupCode}- `}</Ant.Typography.Text>
        <Ant.Typography.Text > {`${record.name} `}</Ant.Typography.Text>
        <Ant.Typography.Text type="secondary">{`(${record.detailedAccountCount})`}</Ant.Typography.Text>
        
        </>
      ),
    },
    {
      title: "سطح تفصیل",
      dataIndex: "detailedAccountLevelId",
      key: "detailedAccountLevelId",
      render: (text, record, index) => (
        <Ant.Select
          value={record.detailedAccountLevelId}
          onChange={(val) => {
            changeLevel(record.id, val);
          }}
          showSearch
          loading={levelLoading}
          style={{ width: 120 }}
          placeholder="بدون ارتباط"
          options={detailedAccLevel}
          fieldNames={{ label: "name", value: "id" }}
          optionFilterProp="children"
          allowClear
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        ></Ant.Select>
      ),
    },
    {
      title: "وضعیت",
      dataIndex: "isRequired",
      key: "isRequired",
      render: (text, record, index) => (
        <Ant.Switch
          checkedChildren="الزامی"
          unCheckedChildren="اختیاری"
          disabled={!record.detailedAccountLevelId}
          value={record.isRequired}
          onChange={(val) => {
            changeIsRequired(record.id, val);
          }}
        />
      ),
    },
  ];
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={`تفصیل های مرتبط(${account.title})`} />
      <Ant.Row>
        <Ant.Col span={24}>
          <Ant.Table
            loading={loading}
            // showHeader={false}
            size="small"
            bordered={false}
            dataSource={dataSource}
            columns={columns}
          />
        </Ant.Col>
        <Ant.Col span={24}>
          <Ant.Button
            loading={saveLoading}
            disabled={loading}
            type="primary"
            onClick={(val) => {
              saveApiCall(
                url.LINK_ACCOUNT_DETAILED_ACCOUNTGROUP_UPDATE_LIST,
                dataSource,
              );
            }}
            block
          >
            {"تایید"}
          </Ant.Button>
        </Ant.Col>
      </Ant.Row>
      {/* <pre>{JSON.stringify({ dataSource, account }, null, 2)}</pre> */}
    </>
  );
};

FrmLinkAccountDetailAccount.propTypes = {
  account: PropTypes.any.isRequired,
};
export default FrmLinkAccountDetailAccount;
