import React from "react";
import { Typography } from "antd";

export const columns = (onDelete, onEdit, onView, onProductView, onPriceCircularView, onEffectiveFactorDetailView) => {
    return [
        {
            title: 'کد کالا',
            dataIndex: 'productCode',
            key: 'productCode',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80
        },
        {
            title: 'نام کالا',
            dataIndex: 'productName',
            key: 'productName',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 600,
            render: (text, record, index) => (
                <Typography.Link onClick={() => onProductView(record.productId)}>{record.productName}</Typography.Link>
            )
        },
        {
            title: 'سری ساخت',
            dataIndex: 'batchNumber',
            key: 'batchNumber',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 100
        },
        {
            title: 'تاریخ انقضا',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 100
        },
        {
            title: 'تعداد',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 60
        },
        {
            title: 'واحد',
            dataIndex: 'productUnitName',
            key: 'productUnitName',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 80
        },
        {
            title: 'مبلغ واحد',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 100,
            render: (text, record, index)  => (
                <Typography.Link onClick={() => onPriceCircularView(record.priceCircularDetailId)}>{record.unitPrice.toLocaleString()}</Typography.Link>
            )
        },
        {
            title: 'مبلغ کل',
            dataIndex: 'subTotal',
            key: 'subTotal',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 120,
            render: (text, record, index) => (
                record.subTotal.toLocaleString()
            )
        },
        {
            title: 'تخفیف',
            dataIndex: 'discount',
            key: 'discount',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 100,
            render: (text, record, index) => (
                record.discount == 0 ? record.discount 
                :   <Typography.Link onClick={() => onEffectiveFactorDetailView(record.id, -1)}>
                        {record.discount.toLocaleString()}
                    </Typography.Link>
            )
        },
        {
            title: 'مبلغ کل پس از تخفیف',
            dataIndex: 'totalPriceWithDiscount',
            key: 'totalPriceWithDiscount',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 200,
            render: (text, record, index) => (
                record.totalPriceWithDiscount.toLocaleString()
            )
        },
        {
            title: 'جمع مالیات و عوارض',
            dataIndex: 'taxTotal',
            key: 'taxTotal',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 200,
            render: (text, record, index) => (
                record.taxTotal == 0 ? record.taxTotal 
                :   <Typography.Link onClick={() => onEffectiveFactorDetailView(record.id, 1)}>
                        {record.taxTotal.toLocaleString()}
                    </Typography.Link>
            )
        },
        {
            title: 'مبلغ خالص به علاوه مالیات و عوارض',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 250,
            render: (text, record, index) => (
                record.totalPrice.toLocaleString()
            )
        },
        {
            title: 'قیمت مصرف کننده',
            dataIndex: 'consumerPrice',
            key: 'consumerPrice',
            align: 'center',
            className: 'text-xs sm:text-sm',
            width: 200,
            render: (text, record, index) => (
                record.consumerPrice.toLocaleString()
            )
        },
    ];
} 