import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrView } from 'react-icons/gr'
import { FiEdit } from "react-icons/fi";

const columns = (onDelete, onView, onEdit) => {
    return (
        [
            {
                title: 'کد',
                dataIndex: 'code',
                key: 'code',
                width: 80,
            },
            {
                title: 'کد دوم',
                dataIndex: 'seccondCode',
                key: 'seccondCode',
                width: 80,
            },
            {
                title: 'نام کالا',
                dataIndex: 'name',
                key: 'name',
                width: 80,
            },
            {
                title: 'نام دوم کالا',
                dataIndex: 'seccondName',
                key: 'seccondName',
                width: 80,
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
                            className="text-sky-600"
                            icon={<GrView />}
                            type="text"
                        />
                        <Ant.Button
                            className="text-blue-600"
                            onClick={() => onEdit(val.id)}
                            icon={<FiEdit />}
                            type="text"
                        />
                        <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف کالا "${val.name}" مطمئن هستید؟`}>
                            <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />} type="text" />
                        </Ant.Popconfirm>
                    </>
            }
        ]
    )
}

export default columns
