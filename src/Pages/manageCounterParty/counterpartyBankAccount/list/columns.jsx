import React from "react";
import * as Ant from "antd";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as defaultValues from "@/defaultValues";

export const columns = (onDelete, onEdit) => {
    return [
        {
            title: "بانک و شعبه",
            dataIndex: "bankName",
            key: "bankName",
            align: "right",
            className: "text-xs sm:text-sm",
            width: 80,
            render: (text, record, index) => (
                `${record.bankName} - ${record.bankBranchName}`
            )
        },
        {
            title: "صاحب حساب",
            dataIndex: "accountHolder",
            key: "accountHolder",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 80,
        },
        {
            title: "شماره حساب",
            dataIndex: "accountNumber",
            key: "accountNumber",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 100,
        },
        {
            title: "شماره کارت",
            dataIndex: "cardNumber",
            key: "cardNumber",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 100,
        },
        {
            title: "شماره شبا",
            dataIndex: "shebaNumber",
            key: "shebaNumber",
            align: "center",
            className: "text-xs sm:text-sm",
            width: 150,
            render: (text, record, index) => (
                record.shebaNumber && `IR${record.shebaNumber}`
            )
        },
        {
            ...defaultValues.TABLES_OPERATION_COLUMN,
            width: 70,
            render: (text, value, index) => (
                <>
                    <Ant.Space>
                        <Ant.Tooltip placement="top" title={"ویرایش"}>
                            <Ant.Button
                                className="text-blue-600"
                                onClick={() => onEdit(value.id)}
                                icon={<FiEdit />}
                                color="default"
                                variant="filled"
                            />
                        </Ant.Tooltip>
                        <Ant.Popconfirm
                            onConfirm={() => onDelete(value.id)}
                            title={`برای حذف  مطمئن هستید؟`}
                        >
                            <Ant.Button
                                className="text-red-600"
                                icon={<RiDeleteBin6Line />}
                                color="danger"
                                variant="filled"
                            />
                        </Ant.Popconfirm>
                    </Ant.Space>
                </>
            )
        },
    ];
}
