import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrView } from 'react-icons/gr'

const columns = (onDelete,onView) => {
    return (
        [
            {
                title: 'شناسه',
                dataIndex: 'id',
                key: 'id',
                width: 50,
                render: (text) => <a>{text}</a>
            },
            {
                title: 'کد',
                dataIndex: 'code',
                key: 'code',
                width: 50,
                render: (text) => <a>{text}</a>
            },
            {
                title: 'کد دوم',
                dataIndex: 'seccondCode',
                key: 'seccondCode',
                width: 50,
            },
            {
                title: 'شناسه نوع',
                dataIndex: 'typeId',
                key: 'typeId',
                width: 50,
            },
            {
                title: 'شناسه جزئیات ماهیت',
                dataIndex: 'natureDetailId',
                key: 'natureDetailId',
                width: 80,
            },
            {
                title: 'شناسه برند',
                dataIndex: 'brandId',
                key: 'brandId',
                width: 50,
            },
            {
                title: 'نام کالا',
                dataIndex: 'name',
                key: 'name',
                width: 120,
            },
            {
                title: 'نام دوم کالا',
                dataIndex: 'seccondName',
                key: 'seccondName',
                width: 120,
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
                        <Ant.Button
                            onClick={() => onView(val.id)}
                            className="text-info"
                            icon={<GrView />}
                            type="text"
                        />
                        <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف کالا "${val.name}" مطمئن هستید؟`}>
                            <Ant.Button className="text-danger" icon={<RiDeleteBin6Line />} type="text" />
                        </Ant.Popconfirm>
                    </>
            }
        ]
    )
}

export default columns
