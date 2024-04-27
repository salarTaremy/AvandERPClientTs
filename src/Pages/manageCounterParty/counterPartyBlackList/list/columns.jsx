
const columns = [
    {
        title: "نام طرف حساب ",
        dataIndex: "counterpartyName",
        key: "counterpartyName",
        width: 100,
        className: "text-xs sm:text-sm",
    },
    {
        title: "تاریخ",
        dataIndex: "dateString",
        key: "dateString",
        width: 100,
        align: 'center',
        className: "text-xs sm:text-sm",
    },
    {
        title: "وضعیت",
        dataIndex: "blackListStateTitle",
        key: "blackListStateTitle",
        width: 100,
        className: "text-xs sm:text-sm",
    },
    {
        title: "توضیحات",
        dataIndex: "description",
        key: "description",
        width: 400,
        className: "text-xs sm:text-sm",
    },
];


export default columns;
