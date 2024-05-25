import React from "react";
import * as api from "@/api";
import * as url from "@/api/url";
import SaleDocumentHeaderInfo from "../header/SaleDocumentHeaderInfo";
import SaleDocumentFooterInfo from "../header/SaleDocumentFooterInfo";
import SaleDocumentDetail from "../detail/SaleDocumentDetail";
import useRequestManager from "@/hooks/useRequestManager";

//====================================================================
//                        Declaration
//====================================================================
const SaleDocumentDescription = (props) => {
  const { id } = props;
  const [saleDocumentData, saleDocumentLoading, saleDocumentError] =
    api.useFetch(`${url.SALE_DOCUMENT_HEADER}/${id}`);
  const saleDocumentFetchedData = saleDocumentData?.data;
  useRequestManager({ error: saleDocumentError });
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <SaleDocumentHeaderInfo
        id={id}
        saleDocumentData={saleDocumentFetchedData}
        loading={saleDocumentLoading}
        className="pb-5"
      />
      <SaleDocumentDetail saleDocumentHeaderId={id} />
      <SaleDocumentFooterInfo
        id={id}
        saleDocumentData={saleDocumentFetchedData}
        loading={saleDocumentLoading}
        className="pt-5"
      />
    </>
  );
};

export default SaleDocumentDescription;
