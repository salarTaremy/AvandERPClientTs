import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { GrView } from 'react-icons/gr'
const columns = (onDelete, onEdit, onView) => {
  return (
    [
      // {
      //   title: 'شناسه',
      //   dataIndex: 'id',
      //   key: 'id',
      //   width: 80,
      //   render: (text, record, index) => <a>{record.id}</a>,
      // },
      {
        title: 'کد ',
        dataIndex: 'code',
        key: 'code',
        width: 80,
      },
      {
        title: 'نام ',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'توضیحات',
        dataIndex: 'description',
        key: 'description',
        width: 300,

      },
      {
        title: 'عملیات',
        dataIndex: 'operation',
        key: 'operation',
        width: 100,
        align: 'center',
        fixed: 'right',

        render: (text, val) =>
          <>
            <Ant.Space direction="horizontal" size={20}>
              <Ant.Button
                onClick={() => onEdit(val)}
                className="text-primary"
                icon={<FiEdit />}
                type="text"
              />
            </Ant.Space>
            <Ant.Button
              onClick={() => onView(val.id)}
              className="text-info"
              icon={<GrView />}
              type="text"
            />
            <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف گروه تفصیلی "${val.name}" مطمئن هستید؟`}>
              <Ant.Button className="text-danger" icon={<RiDeleteBin6Line />} type="text" />
            </Ant.Popconfirm>
          </>
      },


    ]


  )
}

export default columns



