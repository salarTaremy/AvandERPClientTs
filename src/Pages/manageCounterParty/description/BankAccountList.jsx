import React from "react";
import * as Ant from "antd";
import { AiTwotoneBank } from "react-icons/ai";
import CardContent from "@/components/common/CardContent";
const BankAccountList = ({ data }) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <>
            <Ant.List itemLayout="horizontal">
              <CardContent bordered >
                <Ant.List.Item>
                  <AiTwotoneBank className="mx-2" />
                  {"بانک :"} {item.bankName}
                  {" , "}
                  {" شعبه :"} {item.bankBranchName}
                  {" , "}
                  {" صاحب حساب :"} {item.accountHolder}
                  {" , "}
                  {"شماره  حساب :"} {item.accountNumber}
                  {" , "}
                  {"شماره کارت :"} {item.cardNumber}
                  {" , "}
                  {"شماره شبا :"} {item.shebaNumber}{" "}
                </Ant.List.Item>
              </CardContent>
            </Ant.List>
          </>
        );
      })}
    </>
  );
};
export default BankAccountList;
