import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import useRequestManager from '@/hooks/useRequestManager'
import * as url from '@/api/url'
import { useFetch } from '@/api'

// const [dataSource, setDataSource] = useState([])
// import { useFetch, useFetchWithHandler, usePostWithHandler } from '@/api'

import PropTypes, { func } from 'prop-types'



export const ACC = (props) => {
    const [selectedAccount, setSelectedAccount] = useState(null)
    const { record, setDataSource } = props
    const [accountData, accountLoading, accountError] = useFetch(url.ACCOUNT)

    const onChangeAccount = (value, key) => {
        console.log(value, 'value')
        console.log(key, 'key')
        console.log(key, 'key')
        console.log(record, 'record')

        const selected = accountData?.data.find((account) => account.id === value)

        console.log(selected.code, 'selected')
        setSelectedAccount(selected?.code || null)
        // setSelectedAccount(selected.code)
        // alert(selected.code)

        console.log(selectedAccount, 'selectedAccount')


        setDataSource((prevDataSource) =>
            // code: accountData?.data.find(acc => acc.id === value)?.code || null
            prevDataSource.map((record) => {

                if (record.key === key) {
                    return { ...record, accountId: value, code: selected?.code || null }
                }
                return record
            }),
        )
    }

    return (
        <Ant.Select
            value={record?.accountId}
            // value={record}
            onChange={(value) => onChangeAccount(value, record?.key)}
            allowClear={true}
            placeholder={'انتخاب کنید...'}
            disabled={accountLoading || false}
            loading={accountLoading}
            options={accountData?.data}
            fieldNames={{ label: 'name', value: 'id' }}
            rules={[{ required: true }]}
        />
    )
}

ACC.propTypes = {
    record: PropTypes.node,
    setDataSource: PropTypes.func,
    onChangeAccount: func,
}
export const DtAcc = (props) => {
    const { record, setDataSource } = props
    const [dtAccData, dtAccLoading, dtAccError] = useFetch(url.DETAILED_ACCOUNT)
    const [accountData, accountLoading, accountError] = useFetch(url.ACCOUNT)

    useRequestManager({ error: dtAccError })
    useRequestManager({ error: accountError })
    const handleChangeDetailedAccount = (value, key) => {
        setDataSource((prevDataSource) =>
            prevDataSource.map((record) => {
                if (record.key === key) {
                    return { ...record, detailedAccountId: value }
                }
                return record
            }),
        )
    }


    return (
        <Ant.Select
            // value={record}
            value={record?.detailedAccountId}
            onChange={(value) => handleChangeDetailedAccount(value, record?.key)}
            allowClear={true}
            placeholder={'انتخاب کنید...'}
            disabled={dtAccLoading || false}
            loading={dtAccLoading}
            options={dtAccData?.data}
            rules={[{ required: true }]}
            fieldNames={{ label: 'name', value: 'id' }}
        />
    )
}

DtAcc.propTypes = {
    record: PropTypes.node,
    setDataSource: PropTypes.func,
}


const columns = (onDelete, setDataSource) => {

    const [form] = Ant.Form.useForm()
    const handleDebtorInput = (e, key) => {
        const value = e.target
        setDataSource((prevDataSource) =>
            prevDataSource.map((record) => {
                if (record.key === key) {
                    return { ...record, debtor: value }
                }
                return record
            }),
        )
    }
    const handleCreditorInput = (e, key) => {
        const value = e.target
        setDataSource((prevDataSource) =>
            prevDataSource.map((record) => {
                if (record.key === key) {
                    return { ...record, creditor: value }
                }
                return record
            }),
        )
    }
    const handleArticleInput = (e, key) => {
        const value = e.target
        setDataSource((prevDataSource) =>
            prevDataSource.map((record) => {
                if (record.key === key) {
                    return { ...record, article: value }
                }
                return record
            }),
        )
    }

    const formatNumber = (value) => {
        if (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        return value
    }


    return [
        {
            title: 'حساب کد',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            width: 80,
            render: (_, record) => (
                <Ant.Space>
                    <strong>{record?.code}</strong>
                </Ant.Space>
            ),
        },
        {
            title: 'حساب',
            dataIndex: 'accountId',
            key: 'accountId',
            width: 200,

            render: (_, record) => (
                <Ant.Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'فیلد حساب اجباری است',
                        },
                    ]}
                    name={[record.key, 'accountId']}
                >

                    {/* <ACC record={record} setDataSource={setDataSource} /> */}
                </Ant.Form.Item>
            ),
        },
        {
            title: 'حساب تفصیلی',
            dataIndex: 'detailedAccountId',
            key: 'detailedAccountId',
            width: 200,
            render: (_, record) => (
                <Ant.Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'فیلد حساب تفصیلی اجباری است',
                        },
                    ]}
                    name={[record.key, 'detailedAccountId']}
                >
                    <DtAcc setDataSource={setDataSource} />

                </Ant.Form.Item>
            ),
        },
        {
            title: 'حساب تفصیلی',
            dataIndex: 'detailedAccountId',
            key: 'detailedAccountId',
            width: 200,
            render: (_, record) => (
                <Ant.Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'فیلد حساب تفصیلی اجباری است',
                        },
                    ]}
                    name={[record.key, 'detailedAccountId2']}
                >

                    <DtAcc setDataSource={setDataSource} />
                </Ant.Form.Item>
            ),
        },
        {
            title: 'حساب تفصیلی',
            dataIndex: 'detailedAccountId',
            key: 'detailedAccountId',
            width: 200,
            render: (_, record) => (
                <Ant.Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'فیلد حساب تفصیلی اجباری است',
                        },
                    ]}
                    name={[record.key, 'detailedAccountId3']}
                >
                    <DtAcc setDataSource={setDataSource} />
                </Ant.Form.Item>
            ),
        },
        {
            title: 'شرح',
            dataIndex: 'article',
            width: 200,
            key: 'article',
            render: (_, record) => (
                <Ant.Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'فیلد شرح اجباری است',
                        },
                    ]}
                    name={[record.key, 'article']}
                >
                    <Ant.Input
                        onChange={(e) => handleArticleInput(e, record.key)}
                        value={record.article}
                        allowClear
                    />
                </Ant.Form.Item>
            ),
        },
        {
            title: 'بدهکار',
            dataIndex: 'debtor',
            width: 100,
            key: 'debtor',
            render: (_, record) => (
                <Ant.Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'فیلد بدهکار اجباری است',
                        },
                    ]}
                    name={[record.key, 'debtor']}
                >
                    <Ant.InputNumber
                        value={record.debtor}
                        rules={[{ required: true }]}
                        onChange={(e) => handleDebtorInput(e, record.key)}
                        min={0}
                        formatter={formatNumber}
                        allowClear
                        style={{ width: '100%' }}
                    />
                </Ant.Form.Item>
            ),
        },
        {
            title: 'بستانکار',
            dataIndex: 'creditor',
            key: 'creditor',
            width: 100,
            render: (_, record) => (
                <Ant.Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'فیلد بستانکار اجباری است',
                        },
                    ]}
                    name={[record.key, 'creditor']}
                >
                    <Ant.InputNumber
                        onChange={(e) => handleCreditorInput(e, record.key)}
                        min={0}
                        rules={[{ required: true }]}
                        formatter={formatNumber}
                        allowClear
                        style={{ width: '100%' }}
                    />
                </Ant.Form.Item>
            ),
        },
        {
            title: 'عملیات',
            dataIndex: 'operation',
            key: 'operation',
            width: 50,
            align: 'center',

            render: (text, val) => (
                <>
                    <Ant.Popconfirm onConfirm={() => onDelete(val.key)} title={`برای حذف سطر مطمئن هستید؟`}>
                        <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />} type="text" />
                    </Ant.Popconfirm>
                </>
            ),
        },
    ]
}


export default columns
