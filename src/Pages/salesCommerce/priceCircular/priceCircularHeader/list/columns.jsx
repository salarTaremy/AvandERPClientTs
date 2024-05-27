import React from "react";
import * as Ant from "antd";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const columns = (onDelete, onEdit, onView) => {
    return [
        {
            title: "عنوان",
            dataIndex: "title",
            key: "title",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120
        },
        {
            title: "تاریخ شروع",
            dataIndex: "startDate",
            key: "startDate",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "تاریخ پایان",
            dataIndex: "endDate",
            key: "endDate",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80
        },
        {
            title: "وضعیت",
            dataIndex: "isActive",
            key: "isActive",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 70,
            render: (text, record, index) => {
                return (
                    <>
                        {record.isActive && <Ant.Tag color="green">فعال</Ant.Tag>}
                        {!record.isActive && <Ant.Tag color="red">غیرفعال</Ant.Tag>}
                    </>
                )
            }
        },
        {
            title: "توضیحات",
            dataIndex: "description",
            key: "description",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 200
        },
        {
            title: "عملیات",
            key: "id",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 120,
            fixed: "right",
            render: (text, record, index) => {
                return (
                    <>
                        <Ant.Space>
                            <Ant.Button
                                onClick={() => onView(record.id)}
                                className="text-sky-600"
                                icon={<GrView/>}
                                type="text"
                            />
                            <Ant.Button
                                onClick={() => onEdit(record.id)}
                                className="text-blue-600"
                                icon={<FiEdit/>}
                                type="text"
                            />
                            <Ant.Popconfirm
                                onConfirm={() => onDelete(record.id)}
                                title="حذف آیتم"
                                description={`آیا از حذف بخشنامه "${record.title}" مطمئن هستید؟`}
                            >
                                <Ant.Button
                                    className="text-red-600"
                                    icon={<RiDeleteBin6Line />}
                                    type="text"
                                />
                            </Ant.Popconfirm>
                        </Ant.Space>
                    </>
                )
            }
        },
    ];
}