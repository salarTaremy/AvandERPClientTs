import React from 'react'
import * as Ant from 'antd'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit, FiCalendar } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";



const columns = (onDelete, onEdit, onReset) => {
    return (
        [
            {
                title: 'شناسه',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
            },
            {
                title: 'تاریخ',
                dataIndex: 'createDate',
                key: 'createDate',
                align: 'center',
                render: (text, record, index) => (
                    <>
                        {/* {`${record.persianDateTilte}`} <FiCalendar  /> {`${record.createTime.substring(0, 5)}`} <FiClock  />{' '} */}
                        {`${record.createDate}`} <FiCalendar />

                    </>
                ),
            },
            {
                title: 'نام کاربری',
                dataIndex: 'userName',
                key: 'userName',
                align: 'center',
            },
            {
                title: 'وضعیت',
                dataIndex: 'isActive',
                key: 'isActive',
                align: 'center',
                // width: 5,
                //render: (text, record, index) => <Ant.Checkbox checked={record.isActive} />,
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
                align: 'center',
                fixed: 'right',

                render: (text, val) =>
                    <>
                        <Ant.Space direction="horizontal" >
                            <Ant.Button
                                className="text-blue-600"
                                onClick={() => onEdit(val)}
                                icon={<FiEdit />}
                                type="text"
                            />
                            <Ant.Button
                                className="text-green-600"
                                onClick={() => onReset(val)}
                                icon={<GrPowerReset />}
                                type="text"
                            />
                            <Ant.Popconfirm onConfirm={() => onDelete(val.id)} title={`برای حذف کالا "${val.name}" مطمئن هستید؟`}>
                                <Ant.Button className="text-red-600" icon={<RiDeleteBin6Line />} type="text" />
                            </Ant.Popconfirm>
                        </Ant.Space>
                    </>
            }
        ]
    )
}

export default columns