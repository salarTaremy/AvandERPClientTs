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
                title: 'سری ساخت',
                dataIndex: 'batchNumber',
                key: 'batchNumber',
                width: 80,
                className: "text-xs sm:text-sm",
            },
            {
                title: 'تاریخ تولید',
                dataIndex: 'productionDate',
                key: 'productionDate',
                align: 'center',
                width: 80,
                className: "text-xs sm:text-sm",
            },
            {
                title: 'تاریخ انقضا',
                dataIndex: 'expiryDate',
                key: 'expiryDate',
                align: 'center',
                width: 80,
                className: "text-xs sm:text-sm",
            },
            {
                title: 'عمر مفید',
                dataIndex: 'shelfLife',
                key: 'shelfLife',
                align: 'center',
                width: 80,
                className: "text-xs sm:text-sm",
                render: (text, record, index) => {
                    return (
                      <>
                        { `${record.shelfLife} ماه`} 
                      </>
                    )
                  }
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
                            <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={` برای حذف  سری ساخت  "${val.batchNumber}" مطمئن هستید؟`}>
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




