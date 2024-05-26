const column = () => {
    return [
        {
            title: 'شماره ردیف',
            dataIndex: 'rowNumber',
            key: 'rowNumber',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 100,
        },
        {
            title: 'کد حساب ',
            dataIndex: 'accountCode',
            key: 'accountCode',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 120,
            render: (text, record, index) => (
                `${record.accountGroupCode}${record.accountHeaderCode}${record.accountCode}`
            )
        },
        {
            title: 'شرح حساب',
            dataIndex: 'accountHeaderName',
            key: 'accountHeaderName',
            className: 'text-xs sm:text-sm',
            width: 300,
            render: (text, record, index) => (
                `${record.accountGroupName} > ${record.accountHeaderName} > ${record.accountName}`
            )
        },
        {
            title: 'حساب تفصیلی سطح چهار',
            dataIndex: 'detailedAccountName4',
            key: 'detailedAccountName4',
            className: 'text-xs sm:text-sm',
            width: 300,
            render: (text, record, index) => (
                `${record.detailedAccountCode4} - ${record.detailedAccountName4}`
            )
        },
        {
            title: 'حساب تفصیلی سطح پنج',
            dataIndex: 'detailedAccountName5',
            key: 'detailedAccountName5',
            className: 'text-xs sm:text-sm',
            width: 300,
            render: (text, record, index) => (
                `${record.detailedAccountCode6} - ${record.detailedAccountName6}`
            )
        },
        {
            title: 'حساب تفصیلی سطح شش',
            dataIndex: 'detailedAccountName6',
            key: 'detailedAccountName6',
            className: 'text-xs sm:text-sm',
            width: 300,
            render: (text, record, index) => (
                `${record.detailedAccountCode6} - ${record.detailedAccountName6}`
            )
        },
        {
            title: 'شرح ',
            dataIndex: 'article',
            key: 'article',
            className: 'text-xs sm:text-sm',
            width: 200,
        },
        {
            title: ' بدهکار',
            dataIndex: 'debtor',
            key: 'debtor',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 120,
            render: (text, record, index) => (
                record.debtor.toLocaleString()
            )
        },
        {
            title: ' بستانکار',
            dataIndex: 'creditor',
            key: 'creditor',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 120,
            render: (text, record, index) => (
                record.creditor.toLocaleString()
            )
        },
    ]
}

export default column
