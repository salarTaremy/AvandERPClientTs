import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from "react-icons/fi";
import { VscKey } from "react-icons/vsc";
import { VscGithubAction } from "react-icons/vsc";
import { AiOutlineEllipsis } from "react-icons/ai";

const columns = (onDelete, onEdit, onReset, onInfo, onSwitch, onOtherAccesses) => {
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
                className: "text-xs sm:text-sm",
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
                width: 120,
                className: "text-xs sm:text-sm",
            },
            {
                title: 'وضعیت',
                dataIndex: 'isActive',
                key: 'isActive',
                width: 80,
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
                title: 'عملیات',
                dataIndex: 'operation',
                key: 'operation',
                width: 120,
                align: 'center',
                fixed: 'right',
                className: "text-xs sm:text-sm",
                render: (text, val) => (
                    <>
                        <Ant.Tooltip placement="top" title={' سایر دسترسی ها '}>
                            <Ant.Button
                                className="text-red-600"
                                onClick={() => onOtherAccesses(val)}
                                icon={<AiOutlineEllipsis />}
                                type="text"
                            />
                        </Ant.Tooltip>
                        <Ant.Tooltip placement="top" title={'ویرایش نقش ها'}>
                            <Ant.Button
                                className="text-violet-600"
                                onClick={() => onSwitch(val)}
                                icon={<VscGithubAction />}
                                type="text"
                            />
                        </Ant.Tooltip>
                        <Ant.Tooltip placement="top" title={'لیست نقش ها'}>
                            <Ant.Button
                                className="text-green-600"
                                onClick={() => onInfo(val)}
                                icon={<VscGithubAction />}
                                type="text"
                            />
                        </Ant.Tooltip>
                        <Ant.Tooltip placement="top" title={'ویرایش'}>
                            <Ant.Button
                                className="text-blue-600"
                                onClick={() => onEdit(val)}
                                icon={<FiEdit />}
                                type="text"
                            />
                        </Ant.Tooltip>
                        <Ant.Tooltip placement="top" title={'تغییر رمز عبور'}>
                            <Ant.Button
                                className="text-orange-600"
                                onClick={() => onReset(val)}
                                icon={<VscKey />}
                                type="text"
                            />
                        </Ant.Tooltip>
                        <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف کاربر "${val.userName}" مطمئن هستید؟`}>
                            <Ant.Tooltip placement="top" title={'حذف'}>
                                <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />} type="text" />
                            </Ant.Tooltip>
                        </Ant.Popconfirm>
                    </>
                )
            }
        ]
    )
}

export default columns
