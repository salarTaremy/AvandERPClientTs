import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import { PiArrowLineDownLeftLight } from 'react-icons/pi'
import { useFetch, useFetchWithHandler, usePostWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import useAllLoading from '@/hooks/useAllLoading '
import { PlusOutlined } from '@ant-design/icons'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { CloseOutlined } from '@ant-design/icons'

const AccountDocumentArticle = (props) => {
  const [selectedAccount, setSelectedAccount] = useState(null)
  const onChangeAccount = (val) => {
    const selected = accountList.find((account) => account.id === val)
    setSelectedAccount(selected)
  }

  const commonOptions = {
    placeholder: 'انتخاب کنید...',
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  }

  const { field, remove, detailedAccounList, accountList } = props

  return (
    <>
      <Ant.Flex gap="middle" vertical>
        <Ant.Flex justify="space-between" align="center">
          <Ant.Form.Item label="کد حساب">
            <Ant.Input
              min={0}
              style={{ width: '100%' }}
              value={selectedAccount ? selectedAccount.code : ''}
            />
          </Ant.Form.Item>

          <Ant.Form.Item rules={[{ required: true }]} name={[field.name, 'accountId']} label="حساب">
            <Ant.Select
              {...commonOptions}
              allowClear={true}
              placeholder={'انتخاب کنید...'}
              options={[...accountList]}
              fieldNames={{ label: 'name', value: 'id' }}
              onChange={onChangeAccount}
            />
          </Ant.Form.Item>

          <Ant.Form.Item rules={[{ required: true }]} name={[field.name, 'detailedAccountId']} label="حساب تفصیلی">
            <Ant.Select
              {...commonOptions}
              allowClear={true}
              placeholder={'انتخاب کنید...'}
              // disabled={branchLoading || false}
              // loading={branchLoading}
              // options={branchData?.data}
              options={[...detailedAccounList]}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Ant.Form.Item>

          <Ant.Form.Item rules={[{ required: true }]} label="شرح" name={[field.name, 'article']}>
            <Ant.Input />
          </Ant.Form.Item>

          <Ant.Form.Item rules={[{ required: true }]} label="بدهکار" name={[field.name, 'debtor']}>
            <Ant.InputNumber
              min={0}
              formatter={(value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              allowClear
              style={{ width: '100%' }}
            />
          </Ant.Form.Item>

          <Ant.Form.Item rules={[{ required: true }]} label="بستانکار" name={[field.name, 'creditor']}>
            <Ant.InputNumber
              min={0}
              formatter={(value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              allowClear
              style={{ width: '100%' }}
            />
          </Ant.Form.Item>
          <Ant.Button
            className="text-danger"
            onClick={() => {
              remove(field.name)
            }}
            icon={<RiDeleteBin6Line />}
            type="text"
          />
        </Ant.Flex>
      </Ant.Flex>
      <Ant.Divider />
    </>
  )
}

AccountDocumentArticle.propTypes = {
  detailedAccounList: PropTypes.any.isRequired,
  accountList: PropTypes.any.isRequired,
  field: PropTypes.any.isRequired,
  remove: PropTypes.func.isRequired,
}

export default AccountDocumentArticle
