import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { VscKey } from "react-icons/vsc";
import { VscGithubAction } from "react-icons/vsc";
import { AiOutlineEllipsis } from "react-icons/ai";
import { CgMoreVertical, CgMore } from "react-icons/cg";
import { BsMotherboard } from "react-icons/bs";
import * as defaultValues from "@/defaultValues";

const columns = (onDelete, onEdit, onReset, onInfo, onSwitch, onOtherAccesses, onDescription) => {
    const getMenuItems = (val) => [
        {
            key: '1',
            label: (
                <Ant.Tooltip placement="right" title={'ویرایش'}>
                    <a onClick={() => onEdit(val)}><FiEdit className="text-blue-600" /></a>
                </Ant.Tooltip>
            ),
        },
        {
            key: '2',
            label: (
                <Ant.Tooltip placement="right" title={'تغییر رمز عبور'}>
                    <a onClick={() => onReset(val)}><VscKey className="text-rose-600" /></a>
                </Ant.Tooltip>
            ),
        },
        {
            key: '3',
            label: (
                <Ant.Tooltip placement="right" title={'لیست نقش ها'}>
                    <a onClick={() => onInfo(val)}><VscGithubAction className="text-fuchsia-600" /></a>
                </Ant.Tooltip>
            ),
        },
        {
            key: '4',
            label: (
                <Ant.Tooltip placement="right" title={'ویرایش نقش ها'}>
                    <a onClick={() => onSwitch(val)}><VscGithubAction className="text-violet-600" /></a>
                </Ant.Tooltip>
            ),
        },
        {
            key: '5',
            label: (
                <Ant.Tooltip placement="right" title={' سایر دسترسی ها '}>
                    <a onClick={() => onOtherAccesses(val)}><BsMotherboard className="text-cyan-600" /></a>
                </Ant.Tooltip>
            ),
        },
    ];


    return (
        [
            {
                title: 'شناسه کاربری',
                dataIndex: 'id',
                key: 'id',
                width: 80,
                align: 'center',
                className: "text-xs sm:text-sm",
            },
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
                    <Ant.Tag color={(record.isActive && 'green') || 'red'} key={record.id} bordered={false}>
                        {' '}
                        {(record.isActive && 'فعال') || 'غیر فعال'}{' '}
                    </Ant.Tag>
                ),
            },
            {
                ...defaultValues.TABLES_OPERATION_COLUMN,
                render: (text, val) => (
                    <>

                        <Ant.Dropdown
                            menu={{
                                items: getMenuItems(val),
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
                            onClick={() => onDescription(val)}
                            className="text-sky-600"
                            icon={<GrView />}
                            type="text"
                        />
                        <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف کاربر "${val.userName}" مطمئن هستید؟`}>
                            <Ant.Button className="text-rose-600" icon={<RiDeleteBin6Line />} type="text" />
                        </Ant.Popconfirm>
                    </>
                )
            }
        ]
    )
}

export default columns
