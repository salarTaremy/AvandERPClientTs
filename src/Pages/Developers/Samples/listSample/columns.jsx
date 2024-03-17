import React from 'react'
import * as Ant from 'antd'

export const columns = () => {
  return (
    [
      // {
      //   title: 'شناسه',
      //   dataIndex: 'id',
      //   key: 'id',
      //   align : 'center',
      //   width : 80,
      //   className:"text-xs sm:text-sm",
      //   fixed:true,
      //   render: (text, record, index) => { return(<>{record.id}</>)},
      // },
      {
        title: 'نام',
        dataIndex: 'name',
        key: 'name',
        width : 150,
        className:"text-xs sm:text-sm",
      },
      {
        title: 'نام دوم',
        dataIndex: 'secondName',
        key: 'secondName',
        width:150,
        className:"text-xs sm:text-sm",
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
        width:200,
        className:"text-xs sm:text-sm",
      },
    ]
  )
}


