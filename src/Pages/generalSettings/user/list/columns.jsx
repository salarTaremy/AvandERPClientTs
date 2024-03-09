import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";




const columns = (onDelete, onEdit, onReset) => {
    return (
        [
            // {
            //     title: 'شناسه',
            //     dataIndex: 'id',
            //     key: 'id',
            //     width: 80,
            //     align: 'center',
            //     className:"text-xs sm:text-sm",
            // },
            {
                title: 'تاریخ',
                dataIndex: 'createDate',
                key: 'createDate',
                width: 80,
                align: 'center',
                className:"text-xs sm:text-sm",
                render: (text, record, index) => (
                    <>
                        {record.createDate}

                    </>
                ),
            },
            {
                title: 'نام کاربری',
                dataIndex: 'userName',
                key: 'userName',
                width: 80,
                align: 'center',
                className:"text-xs sm:text-sm",
            },
            {
                title: 'وضعیت',
                dataIndex: 'isActive',
                key: 'isActive',
                width: 80,
                align: 'center',
                className:"text-xs sm:text-sm",
                render: (text, record, index) => (
                    <Ant.Tag color={(record.isActive && 'green') || 'red'} key={record.id}>
                        {' '}
                        {(record.isActive && 'فعال') || 'غیر فعال'}{' '}
                    </Ant.Tag>
                ),
            },
            {
                title: 'عملیات',
                dataIndex: 'operation',
                key: 'operation',
                width: 100,
                align: 'center',
                fixed: 'right',
                className:"text-xs sm:text-sm",
                render: (text, val) =>
                    <>
                        <Ant.Button
                            className="text-blue-600"
                            onClick={() => onEdit(val)}
                            icon={<FiEdit />}
                            type="text"
                        />
                        <Ant.Button
                            className="text-green-600"
                            onClick={() => onReset(val)}
                            icon={<GrPowerReset />}
                            type="text"
                        />
                        <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف کالا "${val.userName}" مطمئن هستید؟`}>
                            <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />} type="text" />
                        </Ant.Popconfirm>
                    </>
            }
        ]
    )
}

export default columns
