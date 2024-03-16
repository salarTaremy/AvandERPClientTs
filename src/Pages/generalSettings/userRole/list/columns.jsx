import React from 'react'
import * as Ant from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const columns = (disable) => {
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
        {
            title: "دسترسی",
            dataIndex: "userHasRole",
            key: "userHasRole",
            width: 100,
            align: "center",
            className: "text-xs sm:text-sm",
            render: (record, userId) => (
                <Ant.Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    key={record.id}
                    value={userId.userHasRole == true}
                    disabled={userId.userHasRole == false}
                />
            )
        }
    ]
}

export default columns
