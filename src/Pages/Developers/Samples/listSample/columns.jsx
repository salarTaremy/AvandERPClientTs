import React from 'react'
import * as Ant from 'antd'
import { Test } from './Test'

export const columns = () => {
  return (
    [
      {
        title: 'شناسه',
        dataIndex: 'id',
        key: 'id',
        align : 'center',
        width : 80,
        // fixed:true,
        render: (text, record, index) => { return(<p>{record.id}</p>)},
      },
      {
        title: 'نام',
        dataIndex: 'name',
        key: 'name',
        width : 400,
      },
      {
        title: 'نام دوم',
        dataIndex: 'secondName',
        key: 'secondName',
        width:1000,
        render: (text, record, index) => (
          <Ant.Tooltip placement="top" title={text}>
            {text}
          </Ant.Tooltip>
        ),
      },
      {
        title: 'توضیحات',
        dataIndex: 'description',
        key: 'description',
        width:1000,
      },
    ]
  )
}


