import React from 'react'
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const columns = (onDelete, onEdit) => {
    return (
        [
            {
                title: "شناسه مالیاتی یکتا",
                dataIndex: "uniqueFiscalId",
                key: "uniqueFiscalId",
                width: 100,
                align: "center",
                className: "text-xs sm:text-sm",
            },
            {
                title: "شناسه پیش فرض",
                dataIndex: "isDefault",
                key: "isDefault",
                width: 100,
                align: 'center',
                className: "text-xs sm:text-sm",
                render: (text, record, index) => (
                    <Ant.Tag color={(record.isDefault && 'green') || 'red'} key={record.id}>
                        {' '}
                        {(record.isDefault && 'بله') || 'خیر'}{' '}
                    </Ant.Tag>
                ),
            },
            {
                title: 'وضعیت',
                dataIndex: 'isActive',
                key: 'isActive',
                width: 100,
                align: 'center',
                className: "text-xs sm:text-sm",
                render: (text, record, index) => (
                    <Ant.Tag color={(record.isActive && 'green') || 'red'} key={record.id}>
                        {' '}
                        {(record.isActive && 'فعال') || 'غیر فعال'}{' '}
                    </Ant.Tag>
                ),
            },
            {
                title: "عملیات",
                dataIndex: "operation",
                key: "operation",
                width: 150,
                align: "center",
                fixed: "right",
                className: "text-xs sm:text-sm",
                render: (text, val) => (
                    <>
                        <Ant.Space direction="horizontal" size={20}>
                            <Ant.Button
                                className="text-blue-600"
                                onClick={() => onEdit(val)}
                                icon={<FiEdit />}
                                type="text"
                            />
                        </Ant.Space>
                        <Ant.Popconfirm
                            onConfirm={() => onDelete(val.id)}
                            title={`برای حذف شناسه مالیاتی "${val.uniqueFiscalId}" مطمئن هستید؟`}
                        >
                            <Ant.Button
                                className="text-red-600"
                                icon={<RiDeleteBin6Line />}
                                type="text"
                            />
                        </Ant.Popconfirm>
                    </>
                )
            }
        ]
    )
}

export default columns;
