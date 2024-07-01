import React from "react";
import * as api from "@/api";
import * as url from "@/api/url";
import useRequestManager from "@/hooks/useRequestManager";
import AccountDocumentDetail from "../detail/AccountDocumentDetail";
import AccountDocumentHeaderInfo from "../header/AccountDocumentHeaderInfo";
import AccountDocumentFooterInfo from "../header/AccountDocumentFooterInfo";
import * as Ant from "antd";
import * as styles from "@/styles";

//====================================================================
//                        Declaration
//====================================================================
const AccountDocumentDescription = (props) => {
  const { id } = props;
  const [accountDocumentData, accountDocumentLoading, accountDocumentError] = api.useFetch(`${url.ACCOUNT_DOCUMENT}/${id}`);
  useRequestManager({ error: accountDocumentError });
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <AccountDocumentHeaderInfo id={id} accountDocumentData={accountDocumentData} loading={accountDocumentLoading} />
      <AccountDocumentDetail accountDocumentHeaderId={id} />
      <AccountDocumentFooterInfo id={id} accountDocumentData={accountDocumentData} loading={accountDocumentLoading}  />
    </>
  )
}

export default AccountDocumentDescription;




