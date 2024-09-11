import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import PropTypes from "prop-types";
import { useFetchWithHandler } from "@/api";
import * as url from "@/api/url";
import qs from "qs";
import { NumberOutlined, BankOutlined, RightOutlined } from "@ant-design/icons";

const BankAccountList = ({ counterpartyId }) => {
  const [
    bankAccountListData,
    bankAccountListLoading,
    bankAccountListError,
    bankAccountListApiCall,
  ] = useFetchWithHandler();

  const [collapseItems, setCollapseItems] = useState(null);
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    getBankAccountList();
  }, []);

  useEffect(() => {
    bankAccountListData?.isSuccess &&
      createBankAccountItems(bankAccountListData?.data);
  }, [bankAccountListData]);

  //=====================================================================
  //                        Functions
  //=====================================================================
  const getBankAccountList = async () => {
    const queryString = qs.stringify({
      CounterpartyId: counterpartyId,
    });
    await bankAccountListApiCall(
      `${url.COUNTERPARTY_BANK_ACCOUNT}?${queryString}`,
    );
  };

  const createBankAccountItems = () => {
    let itemList = [];
    bankAccountListData?.data?.map((bankAccountItem) => {
      //====================================================
      //    create list items for account-numbers
      //====================================================
      const renderAccountNumberList = (item) => {
        return (
          <Ant.List.Item key={item.key} style={{ borderBlockEnd: "none" }}>
            <Ant.Avatar
              style={{ backgroundColor: "transparent" }}
              icon={<NumberOutlined />}
            />
            <Ant.Typography.Text>{`${item.title}: `}</Ant.Typography.Text>
            <Ant.Typography.Text>{item.content}</Ant.Typography.Text>
          </Ant.List.Item>
        );
      };

      //====================================================
      //    create list react-node for account-numbers
      //====================================================
      const accountNumberData = [
        {
          key: 1,
          title: "شماره حساب",
          content: `${bankAccountItem.accountNumber ?? "-"}`,
        },
        {
          key: 2,
          title: "شماره کارت",
          content: `${bankAccountItem.cardNumber ?? "-"}`,
        },
        {
          key: 3,
          title: "شماره شبا",
          content: bankAccountItem.shebaNumber
            ? "IR" + bankAccountItem.shebaNumber
            : "-",
        },
      ];

      const accountNumberList = (
        <Ant.List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          dataSource={accountNumberData}
          renderItem={renderAccountNumberList}
        />
      );

      itemList.push({
        key: bankAccountItem.id,
        label: (
          <>
            <Ant.Space wrap>
              <BankOutlined className="text-lg text-indigo-600" />
              <Ant.Typography.Text strong>
                {`بانک ${bankAccountItem.bankName} - شعبه ${bankAccountItem.bankBranchName}`}
              </Ant.Typography.Text>
              <Ant.Typography.Text>
                {`نام صاحب حساب: ${bankAccountItem.accountHolder}`}
              </Ant.Typography.Text>
            </Ant.Space>
          </>
        ),
        children: <>{accountNumberList}</>,
      });
    });

    setCollapseItems(itemList);
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active loading={bankAccountListLoading}>
        <Ant.Collapse
          items={collapseItems}
          expandIconPosition="end"
          expandIcon={({ isActive }) => {
            return <RightOutlined rotate={isActive ? -90 : 0} />;
          }}
        />
      </Ant.Skeleton>
    </>
  );
};
export default BankAccountList;

BankAccountList.propTypes = {
  counterpartyId: PropTypes.number.isRequired,
};
