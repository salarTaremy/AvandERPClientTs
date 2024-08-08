import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const columns = (onDelete, onEdit) => {
    return [
        {
            title: "کد",
            dataIndex: "id",
            key: "code",
            width: 80,
            align: 'center',
            className: "text-xs sm:text-sm",
        },
        {
            title: "عنوان فروش",
            dataIndex: "title",
            key: "title",
            width: 100,
            className: "text-xs sm:text-sm",
        },
        {
            title: "شناسه ارز پیش فرض",
            dataIndex: "defaultCurrencyId",
            key: "defaultCurrencyId",
            width: 100,
            className: "text-xs sm:text-sm",
        },
        {
            title: "عملیات",
            dataIndex: "operation",
            key: "operation",
            width: 150,
            align: "center",
            fixed: "right",
            className: "text-xs sm:text-sm",
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
                        title={`برای حذف عنوان فروش "${val.title}" مطمئن هستید؟`}
                    >
                        <Ant.Button
                            className="text-red-600"
                            icon={<RiDeleteBin6Line />}
                            type="text"
                        />
                    </Ant.Popconfirm>
                </>
            ),
        },
    ];
};

export default columns;
