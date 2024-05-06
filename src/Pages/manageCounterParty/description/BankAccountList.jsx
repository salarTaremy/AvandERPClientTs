import React from 'react'
import { AiOutlinePhone } from "react-icons/ai";
const  BankAccountList = ({ data }) => {
    return (
      <>
        {data?.map((item) => {
          return (
            <>
            <br/>
              <AiOutlinePhone /> {item.accountNumber}
            </>
          );
        })}
      </>
    );
  };
export default BankAccountList