import React from "react";
import { FrmAddProduct } from "./FrmAddProduct";
import ModalHeader from "@/components/common/ModalHeader";
import { BsBoxFill } from "react-icons/bs";
const AddProduct = ({ onSuccessAdd }) => {
  return (
    <>
      <ModalHeader title={"تعریف کالا/خدمت"} icon={<BsBoxFill />} />
      <FrmAddProduct onSuccessAdd={onSuccessAdd} />
    </>
  );
};
export default AddProduct;
