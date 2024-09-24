import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { GrView } from 'react-icons/gr'
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit, onView) => {
  return (
    [
      {
        title: 'شناسه',
        dataIndex: 'id',
        key: 'id',

        width: 80,
        fixed: true,
        align: 'center',
        className: "text-xs sm:text-sm",
      },
      {
        title: 'عنوان',
        dataIndex: 'title',
        key: 'title',
        width: 80,
        className: "text-xs sm:text-sm",
        sorter: (a, b) => a.title.localeCompare(b.title),
      },

      {
        ...defaultValues.TABLES_OPERATION_COLUMN,
        render: (text, val) =>
          <>
            <Ant.Space >
              <Ant.Button
                onClick={() => onEdit(val)}
                className="text-blue-600"
                icon={<FiEdit />}
                color="primary"
                variant="filled"
              />



              <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف طبقه بندی"${val.title}" مطمئن هستید؟`}>
                <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />}
                  color="danger"
                  variant="filled"
                />
              </Ant.Popconfirm>
            </Ant.Space>
          </>
      },


    ]


  )
}

export default columns




