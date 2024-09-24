import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrView } from 'react-icons/gr'
import { FiEdit } from 'react-icons/fi'
import * as defaultValues from "@/defaultValues";
export const columns = (onDelete, onEdit, onView) => {
  return [
    {
      title: 'کد',
      dataIndex: 'fullCode',
      key: 'fullCode',
      align: 'center',
      className: "text-xs sm:text-sm",
      width: 80,
      sorter: (a, b) => a.fullCode.localeCompare(b.fullCode),
    },
    {
      title: 'نام',
      dataIndex: 'name',
      key: 'name',
      width: 80,
      className: "text-xs sm:text-sm",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record, index) => (
        <Ant.Tooltip placement="top" title={record.secondName}>
          {text}
        </Ant.Tooltip>
      ),
    },
    {
      title: 'وضعیت',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      width: 80,
      className: "text-xs sm:text-sm",

      // width: 5,
      //render: (text, record, index) => <Ant.Checkbox checked={record.isActive} />,
      render: (text, record, index) => (
        <Ant.Tag color={(record.isActive && 'green') || 'red'} key={record.id} bordered={false}>
          {' '}
          {(record.isActive && 'فعال') || 'غیر فعال'}{' '}
        </Ant.Tag>
      ),
    },
    {
      ...defaultValues.TABLES_OPERATION_COLUMN,
      render: (text, record, index) => {


        return (
          <>
            <Ant.Space>
              <Ant.Button
                disabled={record.isSystematic == true}
                onClick={() => onEdit(record)}
                className="text-blue-600"
                icon={<FiEdit />}
                color="default"
                variant="filled"
              />
              <Ant.Button
                onClick={() => onView(record.id)}
                className="text-sky-600"
                icon={<GrView />}
                color="primary"
                variant="filled"
              />
              <Ant.Popconfirm
                onConfirm={() => onDelete(record.id)}
                title="حدف ایتم"
                description={`برای حذف حساب تفصیل ${record.name} مطمئن هستید ؟`}
              >
                <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />}
                  color="danger"
                  variant="filled"
                />
              </Ant.Popconfirm>
            </Ant.Space>
          </>
        )
      },
    },
  ]
}
