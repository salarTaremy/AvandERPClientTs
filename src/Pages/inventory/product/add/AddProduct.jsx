import React from 'react'
import { FrmAddProduct } from './FrmAddProduct'
import { Card } from 'antd'

const AddProduct = () => {
  return (
    <>
      <Card title="تعریف کالا/خدمت" type="inner">
        <FrmAddProduct />
      </Card>
    </>
  )
}
export default AddProduct
