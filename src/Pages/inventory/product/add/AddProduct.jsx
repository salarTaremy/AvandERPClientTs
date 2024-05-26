import React from 'react'
import { FrmAddProduct } from './FrmAddProduct'
import { Card } from 'antd'

const AddProduct = ({ onSuccessAdd }) => {
  return (
    <>
      <br />
      <Card title="تعریف کالا/خدمت" type="inner">
        <FrmAddProduct onSuccessAdd={onSuccessAdd} />
      </Card>
    </>
  )
}
export default AddProduct
