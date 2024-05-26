import React from "react";
import * as Ant from "antd";
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

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
            dataIndex: 'saleEffectiveOperativeType', //SaleEffectiveOperativeTypeId
            key: 'saleEffectiveOperativeType',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 100
        },
        {
            title: 'مقدار درصدی',
            dataIndex: 'percentage',
            key: 'percentage',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80
        },
        {
            title: 'مقدار ریالی',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80
        },
        {
            title: 'مجاز به ویرایش',
            dataIndex: 'allowEdit',
            key: 'allowEdit',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80,
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
            title: 'عملیات',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80,
            render: (text, value) => (
                <>
                    <Ant.Tooltip placement="top" title={'ویرایش '}>
                        <Ant.Button
                            onClick={() => onView(record.id)}
                            className="text-sky-600"
                            icon={<GrView/>}
                            type="text"
                        />
                        <Ant.Button
                            className="text-blue-600"
                            onClick={() => onEdit(value)}
                            icon={<FiEdit />}
                            type="text"
                        />
                    </Ant.Tooltip>
                    <Ant.Tooltip placement="top" title={' حذف'}>
                            <Ant.Popconfirm
                                onConfirm={() => onDelete(value.id)}
                                title={`برای حذف بانک "${value.title}" مطمئن هستید؟`}
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