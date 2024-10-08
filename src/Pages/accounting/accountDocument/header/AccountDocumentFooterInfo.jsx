import React from "react";
import { PropTypes } from "prop-types";
import * as Ant from "antd";

//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentFooterInfo = (props) => {
  const { id, className, accountDocumentData } = props;

  const borderedItems = [
    {
      key: "1",
      label: "بدهکار",
      children: accountDocumentData?.data?.debtor?.toLocaleString(),
    },
    {
      key: "6",
      label: "بستانکار",
      children: accountDocumentData?.data?.creditor?.toLocaleString(),
    },
  ];

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Descriptions
      bordered={false}
      layout="horizontal"
      size="small"
      items={borderedItems}
      className={className}
    />
  );
};
export default AccountDocumentFooterInfo;
AccountDocumentFooterInfo.propTypes = {
  id: PropTypes.number,
};
