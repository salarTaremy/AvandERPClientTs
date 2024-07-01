import React from "react";
import * as api from "@/api";
import * as url from "@/api/url";
import useRequestManager from "@/hooks/useRequestManager";
import AccountDocumentDetail from "../detail/AccountDocumentDetail";
// import AccountDocumentHeaderInfo from "../header/AccountDocumentHeaderInfo";
import AccountDocumentHeader from "./AccountDocumentHeader";
import AccountDocumentFooterInfo from "../header/AccountDocumentFooterInfo";
import * as Ant from "antd";
import * as styles from "@/styles";

//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentDescription = (props) => {
  const { id } = props;
  const [accountDocumentData, accountDocumentLoading, accountDocumentError] =
    api.useFetch(`${url.ACCOUNT_DOCUMENT}/${id}`);
  useRequestManager({ error: accountDocumentError });
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Skeleton active={true} loading={accountDocumentLoading}>
        {/* <AccountDocumentHeaderInfo
          id={id}
          accountDocumentData={accountDocumentData}
        /> */}
        <AccountDocumentHeader id={id}/>
        <AccountDocumentDetail accountDocumentHeaderId={id} />
        <AccountDocumentFooterInfo
          id={id}
          accountDocumentData={accountDocumentData}
        />
      </Ant.Skeleton>
    </>
  );
};

export default AccountDocumentDescription;
