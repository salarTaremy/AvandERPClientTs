import React from 'react'
import * as Ant from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const columns = (onChange) => {
    return [
        {
            title: "محدوده نقش",
            dataIndex: "roleScopePersianTitle",
            key: "roleScopePersianTitle",
            width: 100,
            className: "text-xs sm:text-sm",
        },
        {
            title: "نام نقش",
            dataIndex: "rolePersianTitle",
            key: "rolePersianTitle",
            width: 100,
            className: "text-xs sm:text-sm",
        },

    ]
}

export default columns
