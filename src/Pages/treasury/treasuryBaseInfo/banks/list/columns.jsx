import React from 'react'
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaCodeBranch } from "react-icons/fa";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit, onBranch) => {
    return (
        [
            {
                title: "نام بانک",
                dataIndex: "title",
                key: "title",
                width: 100,
                className: "text-xs sm:text-sm",
            },
            {
                ...defaultValues.TABLES_OPERATION_COLUMN,
                render: (text, val) => (
                    <>
                        <Ant.Tooltip placement="top" title={'شعب'}>
                            <Ant.Button
                                className="text-green-600"
                                onClick={() => onBranch(val)}
                                icon={<FaCodeBranch />}
                                type="text"
                            />
                        </Ant.Tooltip>
                        <Ant.Tooltip placement="top" title={'ویرایش '}>
                            <Ant.Button
                                className="text-blue-600"
                                onClick={() => onEdit(val)}
                                icon={<FiEdit />}
                                type="text"
                            />
                        </Ant.Tooltip>
                        <Ant.Tooltip placement="top" title={' حذف'}>
                            <Ant.Popconfirm
                                onConfirm={() => onDelete(val.id)}
                                title={`برای حذف بانک "${val.title}" مطمئن هستید؟`}
                            >
                                <Ant.Button
                                    className="text-red-600"
                                    icon={<RiDeleteBin6Line />}
                                    type="text"
                                />
                            </Ant.Popconfirm>
                        </Ant.Tooltip>
                    </>
                )
            }
        ]
    )
}

export default columns;
