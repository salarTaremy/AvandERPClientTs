import React from 'react'
import * as Ant from 'antd'

export const columns = () => {
  return (
    [
      {
        title: 'شناسه حساب',
        dataIndex: 'accId',
        key: 'accId',
        // width : 400,
        render: (text, record, index) => { return(<>{record.accId}</>)},
        sorter: (a, b) => a.accId - b.accId,
      },
      {
        title: 'کد حساب',
        dataIndex: 'accCode',
        key: 'accCode',
        align : 'center',
        sorter: (a, b) => a.accCode.localeCompare(b.accCode),
        //sortOrder: 'asc'
      },
      {
        title: 'نام حساب',
        dataIndex: 'accName',
        key: 'accName',
        sorter: (a, b) => a.accName.localeCompare(b.accName),
      },
      {
        title: 'گردش بدهکار',
        dataIndex: 'sumDebtor',
        key: 'sumDebtor',
        sorter: (a, b) => a.sumDebtor - b.sumDebtor,
      },
      {
        title: 'گردش بستانکار',
        dataIndex: 'sumCreditor',
        key: 'sumCreditor',
        sorter: (a, b) => a.sumCreditor - b.sumCreditor,
      },
      {
        title: 'مانده بدهکار',
        dataIndex: 'balanceOfDebtor',
        key: 'balanceOfDebtor',
        sorter: (a, b) => a.balanceOfDebtor - b.balanceOfDebtor,
      },
      {
        title: 'مانده بستانکار',
        dataIndex: 'balanceOfCreditor',
        key: 'balanceOfCreditor',
        sorter: (a, b) => a.balanceOfCreditor - b.balanceOfCreditor,
      },
    ]
  )
}


