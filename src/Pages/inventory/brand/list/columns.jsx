import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { GrView } from 'react-icons/gr'

const columns = (onDelete, onEdit,onView) => {
  return (
    [

      {
        title: 'شناسه',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        // fixed:true,
        render: (text, record, index) => <a>{record.id}</a>,
      },
      {
        title: 'کد',
        dataIndex: 'code',
        key: 'code',
        width: 80,


      },
      {
        title: 'نام برند',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'کد تأمین کننده',
        dataIndex: 'supplierId',
        key: 'supplierId',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.supplierId),
      },
      {
        title: 'نام تأمین کننده',
        dataIndex: 'supplierName',
        key: 'supplierName',
        width: 100,
        sorter: (a, b) => a.name.localeCompare(b.supplierName),
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
                className="text-blue-600"
                icon={<FiEdit />}
                type="text"
              />
            </Ant.Space>
            <Ant.Button
              onClick={() =>onView(val.id)}
              className="text-info"
              icon={<GrView />}
              type="text"
            />
            <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف برند"${val.name}" مطمئن هستید؟`}>
              <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />} type="text" />
            </Ant.Popconfirm>
          </>
      },


    ]


  )
}

export default columns




