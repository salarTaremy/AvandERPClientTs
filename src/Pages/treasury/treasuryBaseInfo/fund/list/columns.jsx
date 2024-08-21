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
        title: 'کد',
        dataIndex: 'code',
        key: 'code',
        align: 'center',
        width: 80,
        className:"text-xs sm:text-sm",
      },
      {
        title: 'نام',
        dataIndex: 'name',
        key: 'name',
        width: 80,
        className:"text-xs sm:text-sm",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'نام انگلیسی',
        dataIndex: 'latinName',
        key: 'latinName',
        width: 80,
        className:"text-xs sm:text-sm",
        sorter: (a, b) => a.name.localeCompare(b.latinName),
      },
      {
        title: 'نام حساب',
        dataIndex: 'accountName',
        key: 'accountName',
        width: 80,
        className:"text-xs sm:text-sm",
        sorter: (a, b) => a.name.localeCompare(b.accountName),
      },
      {
        title: 'نام حساب تفصیلی',
        dataIndex: 'detailedAccountName',
        key: 'detailedAccountName',
        width: 80,
        className:"text-xs sm:text-sm",
        sorter: (a, b) => a.name.localeCompare(b.detailedAccountName),
      },

      {
        ...defaultValues.TABLES_OPERATION_COLUMN,
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
              onClick={() => onView(val.id)}
              className="text-sky-600"
              icon={<GrView />}
              type="text"
            />
            <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={` برای حذف  صندوق  "${val.name}" مطمئن هستید؟`}>
              <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />} type="text" />
            </Ant.Popconfirm>
          </>
      },


    ]


  )
}

export default columns




