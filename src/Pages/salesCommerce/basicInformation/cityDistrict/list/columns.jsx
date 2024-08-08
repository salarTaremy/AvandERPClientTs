import React from 'react'
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit) => {
    return (
        [
            {
                title: "نام استان",
                dataIndex: "provinceName",
                key: "provinceName",
                width: 100,
                className: "text-xs sm:text-sm",
                render: (text, record, index) => (
                    `${record.provinceName}-${record.provinceCode}`
                )
            },
            {
                title: "نام شهر",
                dataIndex: "cityName",
                key: "cityName",
                width: 100,
                className: "text-xs sm:text-sm",
                render: (text, record, index) => (
                    `${record.cityName}-${record.cityCode}`
                )
            },
            {
                title: " منطقه",
                dataIndex: "title",
                key: "title",
                width: 100,
                className: "text-xs sm:text-sm",
            },
            {
                title: "توضیحات",
                dataIndex: "description",
                key: "description",
                width: 400,
                className: "text-xs sm:text-sm",
            },
            {
                ...defaultValues.TABLES_OPERATION_COLUMN,
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
                            title={`برای حذف  "${val.title}" مطمئن هستید؟`}
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
