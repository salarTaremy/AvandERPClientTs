import React from "react";
import * as Ant from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

const columns = (onDelete, onEdit) => {
    return [
        {
            title: "کد شعبه",
            dataIndex: "code",
            key: "code",
            width: 100,
            align: 'center',
            className: "text-xs sm:text-sm",
        },
        {
            title: "نام شعبه",
            dataIndex: "name",
            key: "name",
            width: 100,
            className: "text-xs sm:text-sm",
        },
        {
            title: "نام استان",
            dataIndex: "provinceTitle",
            key: "provinceTitle",
            width: 100,
            className: "text-xs sm:text-sm",
        },
        {
            title: "نام شهر",
            dataIndex: "cityTitle",
            key: "cityTitle",
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
                        title={`برای حذف شعبه "${val.name}" مطمئن هستید؟`}
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
    ]
}
export default columns;