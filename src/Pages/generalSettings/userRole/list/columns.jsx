import React from 'react'
import * as Ant from "antd";

const columns = () => {
    return [
        {
            title: "نام نقش",
            dataIndex: "persianTitle",
            key: "persianTitle",
            width: 100,
            className: "text-xs sm:text-sm",
        },
        {
            title: "حق دسترسی",
            dataIndex: "persianTitle",
            key: "persianTitle",
            width: 100,
            className: "text-xs sm:text-sm",
            render: () => (
            <Ant.Switch defaultChecked  />
            )
        }
    ]


}

export default columns
