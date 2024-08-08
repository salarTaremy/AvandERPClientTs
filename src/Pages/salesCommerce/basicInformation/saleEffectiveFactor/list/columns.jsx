import React from "react";
import * as Ant from "antd";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";
import * as defaultValues from "@/defaultValues";

export const columns = (onDelete, onEdit, onView) => {
    return [
        {
            title: 'عنوان',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 100
        },
        {
            title: 'نوع',
            dataIndex: 'saleEffectiveOperativeType',
            key: 'saleEffectiveOperativeType',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 100,
            render: (text, record, index) => {
                return (
                    <>
                        <Ant.Space>
                            {(record.saleEffectiveOperativeTypeNature == 1) && <PlusCircleTwoTone twoToneColor="#52c41a" />}
                            {(record.saleEffectiveOperativeTypeNature == -1) && <MinusCircleTwoTone twoToneColor="#eb2f96" />}
                            <span>{record.saleEffectiveOperativeType}</span>
                        </Ant.Space>
                    </>
                )
            }
        },
        {
            title: 'مقدار درصدی',
            dataIndex: 'percentage',
            key: 'percentage',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80,
            render: (text, record, index) => (
                `${record.percentage}%`
            )
        },
        {
            title: 'مقدار ریالی',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80,
            render: (text, record, index) => (
                record.amount.toLocaleString()
            )
        },
        {
            title: 'مجاز به ویرایش',
            dataIndex: 'allowEdit',
            key: 'allowEdit',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 50,
            render: (text, record, index) => {
                return (
                    <>
                        {record.allowEdit && <Ant.Tag color={"green"}>{"بله"}</Ant.Tag>}
                        {!record.allowEdit && <Ant.Tag color={"red"}>{"خیر"}</Ant.Tag>}
                    </>
                )
            }
        },
        {
            title: 'توضیحات',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80,
            hidden: 'true'
        },
        {
            ...defaultValues.TABLES_OPERATION_COLUMN,
            render: (text, value) => (
                <>
                    <Ant.Tooltip placement="top" title={'ویرایش'}>
                        <Ant.Button
                            className="text-blue-600"
                            onClick={() => onEdit(value)}
                            icon={<FiEdit />}
                            type="text"
                        />
                    </Ant.Tooltip>
                    <Ant.Tooltip placement="top" title={'مشاهده جزییات'}>
                        <Ant.Button
                            onClick={() => onView(value.id)}
                            className="text-sky-600"
                            icon={<GrView />}
                            type="text"
                        />
                    </Ant.Tooltip>
                    <Ant.Tooltip placement="top" title={' حذف'}>
                        <Ant.Popconfirm
                            onConfirm={() => onDelete(value.id)}
                            title={`آیا از حذف "${value.name}" مطمئن هستید؟`}
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
    ];
}