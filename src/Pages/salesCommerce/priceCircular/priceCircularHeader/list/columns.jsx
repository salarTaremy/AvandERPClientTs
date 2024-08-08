import React from "react";
import * as Ant from "antd";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCopy } from "react-icons/fa";
import { GrDocumentLocked } from "react-icons/gr";
import { CgMoreVertical } from "react-icons/cg";


export const columns = (onDelete, onEdit, onView, onCopy, onChange) => {
    const getMenuItems = (record) => [
        {
            key: '1',
            label: (
                <Ant.Tooltip placement="right" title={'ویرایش'}>
                    <a onClick={() => onEdit(record.id)}><FiEdit className="text-blue-600" /></a>
                </Ant.Tooltip>
            ),
        },
        {
            key: '2',
            label: (
                <Ant.Popconfirm onConfirm={() => onChange(record.id)} title={`برای تغییر وضعیت "${record.title}" مطمئن هستید؟`}>
                    <Ant.Tooltip placement="right" title={"تغییر وضعیت"}>
                        <GrDocumentLocked className={
                            (record.isActive === true && "text-green-400") || "text-rose-600"
                        } />
                    </Ant.Tooltip>
                </Ant.Popconfirm>
            ),
        },
        {
            key: '3',
            label: (
                <Ant.Tooltip placement="right" title={'کپی و ایجاد بخشنامه '}>
                    <a onClick={() => onCopy(record.id)}><FaRegCopy className="text-green-600" /></a>
                </Ant.Tooltip>
            ),
        },
    ]


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
            title: "تاریخ اجرا",
            dataIndex: "implementationDate",
            key: "implementationDate",
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
            ...defaultValues.TABLES_OPERATION_COLUMN,
            render: (text, record, index) => {
                return (
                    <>
                        <Ant.Space>
                            <Ant.Dropdown
                                menu={{
                                    items: getMenuItems(record),
                                }}
                                placement="bottom"
                                arrow
                            >
                                <Ant.Button
                                    onClick={() => { }}
                                    className="text-blue-600"
                                    icon={<CgMoreVertical />}
                                    type="text"
                                />
                            </Ant.Dropdown>
                            <Ant.Button
                                onClick={() => onView(record)}
                                className="text-sky-600"
                                icon={<GrView />}
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