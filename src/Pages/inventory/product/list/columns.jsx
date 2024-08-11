import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { GrView } from 'react-icons/gr'
import { FiEdit } from "react-icons/fi";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onView, onEdit) => {
    return (
        [
            {
                title: 'کد',
                dataIndex: 'code',
                key: 'code',
                align: 'center',
                width: 80,
                className: "text-xs sm:text-sm",
            },
            {
                title: 'کد دوم',
                dataIndex: 'secondCode',
                key: 'secondCode',
                align: 'center',
                width: 80,
                className: "text-xs sm:text-sm",
            },
            {
                title: 'نام کالا',
                dataIndex: 'name',
                key: 'name',
                width: 80,
                className: "text-xs sm:text-sm",
            },
            {
                title: 'نام دوم کالا',
                dataIndex: 'secondName',
                key: 'secondName',
                width: 80,
                className: "text-xs sm:text-sm",
            },
            {
                ...defaultValues.TABLES_OPERATION_COLUMN,
                render: (text, val) =>

                    <>
                        <Ant.Button
                            className="text-blue-600"
                            onClick={() => onEdit(val.id)}
                            icon={<FiEdit />}
                            type="text"
                        />
                        <Ant.Button
                            onClick={() => onView(val.id)}
                            className="text-sky-600"
                            icon={<GrView />}
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
