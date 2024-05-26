import React from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'


//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentHeaderInfo = (props) => {
    const { id, className, accountDocumentData, accountDocumentLoading } = props

    const borderedItems = [
        {
            key: '1',
            label: 'شناسه',
            children: accountDocumentData?.data?.id,
        },
        {
            key: '2',
            label: 'شماره عطف',
            children: accountDocumentData?.data?.inflectionNumber,
        },
        {
            key: '3',
            label: 'شماره فرعی',

            children: accountDocumentData?.data?.subNumber,
        },
        {
            key: '4',
            label: 'شماره روزانه',

            children: accountDocumentData?.data?.dailyNumber,
        },
        {
            key: '6',
            label: 'نام شعبه',
            children: accountDocumentData?.data?.branchName,
        },
        {
            key: '7',
            label: 'نام وضعیت ',
            children: accountDocumentData?.data?.stateName,
        },
        {
            key: '8',
            label: 'نوع سند',
            children: accountDocumentData?.data?.typeName,
        },
        {
            key: '9',
            label: 'تاریخ',
            children: accountDocumentData?.data?.persianDateTilte,
        },
    ]

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Skeleton active={true} loading={accountDocumentLoading}>
                <Ant.Descriptions
                    bordered={false}
                    title='مشاهده سند حسابداری'
                    layout="horizontal"
                    size="small"
                    items={borderedItems}
                    className={className}
                />
            </Ant.Skeleton>
        </>
    )
}
export default AccountDocumentHeaderInfo
AccountDocumentHeaderInfo.propTypes = {
    id: PropTypes.number,
}