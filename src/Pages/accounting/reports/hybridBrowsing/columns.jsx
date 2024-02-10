import React from 'react'
import * as Ant from 'antd'

export const columns = () => {
  return (
    [
      {
        title: 'شناسه',
        dataIndex: 'id',
        key: 'id',
        align : 'center',
        render: (text, record, index) => { return(<>{record.id}</>)},
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
      },
    ]
  )
}


