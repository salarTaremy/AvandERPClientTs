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
      <br />
      <AccountDocumentHeaderInfo id={id} accountDocumentData={accountDocumentData} loading={accountDocumentLoading} className="pb-5" />
      <AccountDocumentDetail accountDocumentHeaderId={id} />
      <AccountDocumentFooterInfo id={id} accountDocumentData={accountDocumentData} loading={accountDocumentLoading} className="pt-5" />
    </>
  )
}

export default AccountDocumentDescription;




