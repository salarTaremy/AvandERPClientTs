import React from 'react'
import * as Ant from 'antd'




export const columns = () => {
  return (
    [
      // {
      //   title: 'شناسه حساب',
      //   dataIndex: 'accId',
      //   key: 'accId',
      //   width : 100,
      //   render: (text, record, index) => { return(<>{record.accId}</>)},
      //   sorter: (a, b) => a.accId - b.accId,
      // },
      {
        title: 'کد حساب',
        dataIndex: 'accCode',
        key: 'accCode',
        align: 'center',
        className: "text-xs sm:text-sm",
        width: 50,
        sorter: (a, b) => a.accCode?.localeCompare(b.accCode),
        defaultSortOrder: 'ascend', //or descend
        //sortOrder: 'ascend' //or descend
      },
      {
        resizable: true,
        title: 'نام حساب',
        dataIndex: 'accName',
        key: 'accName',
        className: "text-xs sm:text-sm",
        width: 80,
        sorter: (a, b) => a.accName?.localeCompare(b.accName),
      },
      {
        title: 'گردش بدهکار',
        dataIndex: 'sumDebtor',
        key: 'sumDebtor',
        className:"text-xs sm:text-sm",
        width: 100,
        sorter: (a, b) => a.sumDebtor - b.sumDebtor,
        render: (text, record, index) => <>{record.sumDebtor.toLocaleString()}</>,
      },
      {
        title: 'گردش بستانکار',
        dataIndex: 'sumCreditor',
        key: 'sumCreditor',
        className:"text-xs sm:text-sm",
        width: 100,
        sorter: (a, b) => a.sumCreditor - b.sumCreditor,
        render: (text, record, index) => <>{record.sumCreditor.toLocaleString()}</>,
      },
      {
        title: 'مانده بدهکار',
        dataIndex: 'balanceOfDebtor',
        key: 'balanceOfDebtor',
        className:"text-xs sm:text-sm",
        width: 100,
        sorter: (a, b) => a.balanceOfDebtor - b.balanceOfDebtor,
        render: (text, record, index) => <>{record.balanceOfDebtor.toLocaleString()}</>,

      },
      {
        title: 'مانده بستانکار',
        dataIndex: 'balanceOfCreditor',
        key: 'balanceOfCreditor',
        className:"text-xs sm:text-sm",
        width: 100,
        sorter: (a, b) => a.balanceOfCreditor - b.balanceOfCreditor,
        render: (text, record, index) => <>{record.balanceOfCreditor.toLocaleString()}</>,

      },
    ]
  )
}


