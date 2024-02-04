import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { useFetch, useFetchWithHandler, usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import { useEffect } from 'react'
import useAllLoading from '@/hooks/useAllLoading '
import * as url from '@/api/url'
import * as IconBs from 'react-icons/bs'
import * as Ant from 'antd'

// const levelData = [
//   { id: 4, name: 'سطح چهار' },
//   { id: 5, name: 'سطح پنج' },
//   { id: 6, name: 'سطح شش' },
// ]

const FrmLinkAccountDetailAccount = (props) => {
  const { account } = props
  const [dataSource, setDataSource] = useState()
  const [detailedAccLevel, setDetailedAccLevel] = useState(null)
  const [data, loading, error, apiCall] = useFetchWithHandler()
  const [levelData, levelLoading, levelError, levelApiCall] = useFetchWithHandler()
  useRequestManager({ error: error })
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    apiCall(url.LINK_ACCOUNT_DETAILED_ACCOUNTGROUP + '?AccountId=' + account.id)
    levelApiCall(url.DETAILED_ACCOUNT_LEVEL)
  }, [account.id, apiCall, levelApiCall])

  useEffect(() => {
    data && data.data && setDataSource(data.data)
  }, [data])
  useEffect(() => {
    levelData && levelData.data && setDetailedAccLevel(levelData.data)
  }, [levelData])
  //====================================================================
  //                        Functions
  //====================================================================

  const test = () => {
    const NewDataSource = [...dataSource]
    NewDataSource.push({id:30,name:'test',detailedAccountLevelId:10,isRequired:true});
    setDataSource([...NewDataSource])
  }

  const changeIsRequired = (id, val) => {
    const i = dataSource.findIndex((c) => c.id === id)
    dataSource[i].isRequired = val
    setDataSource([...dataSource])
  }

  const changeLevel = (id, val) => {
    const i = dataSource.findIndex((c) => c.id === id)
    dataSource[i].detailedAccountLevelId = val
    if (!val) {
      dataSource[i].isRequired = false
    }
    setDataSource([...dataSource])
  }

  const columns = [
    {
      title: 'گروه تفصیل',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'سطح تفصیل',
      dataIndex: 'detailedAccountLevelId',
      key: 'detailedAccountLevelId',
      render: (text, record, index) => (
        <Ant.Select
          value={record.detailedAccountLevelId}
          onChange={(val) => {
            changeLevel(record.id, val)
          }}
          showSearch
          loading={levelLoading}
          style={{ width: 120 }}
          placeholder="بدون ارتباط"
          options={detailedAccLevel}
          fieldNames={{ label: 'name', value: 'id' }}
          optionFilterProp="children"
          allowClear
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        ></Ant.Select>
      ),
    },
    {
      title: 'وضعیت',
      dataIndex: 'isRequired',
      key: 'isRequired',
      render: (text, record, index) => (
        <Ant.Switch
          checkedChildren="الزامی"
          unCheckedChildren="اختیاری"
          disabled={!record.detailedAccountLevelId}
          value={record.isRequired}
          onChange={(val) => {
            changeIsRequired(record.id, val)
          }}
        />
      ),
    },
  ]
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Row>
        <Ant.Col span={24}>{/* <Ant.Divider /> */}</Ant.Col>

        <Ant.Col span={24}>
          <Ant.Table
            title={() => `تفصیل های مرتبط(${account.title})`}
            loading={loading}
            // showHeader={false}
            pagination={{
              pageSize: 50,
            }}
            scroll={{
              y: 440,
            }}
            size="small"
            bordered={false}
            dataSource={dataSource}
            columns={columns}
          />
        </Ant.Col>
        <Ant.Col span={24}>
          <Ant.Button
            type="primary"
            onClick={test}
            // disabled={allLoading}
            // onClick={() => {
            //   form.submit()
            // }}
            // loading={accEditLoading}
            block
          >
            {'تایید'}
          </Ant.Button>
        </Ant.Col>
      </Ant.Row>

      <Ant.Typography style={{ maxHeight: 200 }}>
        <pre>{JSON.stringify(dataSource, null, 2)}</pre>
      </Ant.Typography>
    </>
  )
}

FrmLinkAccountDetailAccount.propTypes = {
  account: PropTypes.any.isRequired,
}
export default FrmLinkAccountDetailAccount
