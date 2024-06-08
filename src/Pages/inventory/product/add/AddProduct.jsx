import React from "react";
import { FrmAddProduct } from "./FrmAddProduct";
import ModalHeader from "@/components/common/ModalHeader";
const AddProduct = ({ onSuccessAdd }) => {
  return (
    <>
      <ModalHeader title={"تعریف کالا/خدمت"} />
      <FrmAddProduct onSuccessAdd={onSuccessAdd} />
    </>
  );
};
export default AddProduct;
