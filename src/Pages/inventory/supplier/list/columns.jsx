import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { GrView } from 'react-icons/gr'
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit, onView) => {
  return (
    [

      // {
      //   title: 'شناسه',
      //   dataIndex: 'id',
      //   key: 'id',

      //   width: 80,
      //   fixed:true,
      //   align:'center',
      //   className:"text-xs sm:text-sm",
      // },
      {
        title: 'نام',
        dataIndex: 'name',
        key: 'name',
        width: 80,
        className: "text-xs sm:text-sm",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'کد',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: 80,
        className: "text-xs sm:text-sm",
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
                color="default"
                variant="filled"
              />


              <Ant.Button
                onClick={() => onView(val.id)}
                className="text-sky-600"
                icon={<GrView />}
                color="primary"
                variant="filled"
              />
              <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={` برای حذف تامین کننده  "${val.name}" مطمئن هستید؟`}>
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




