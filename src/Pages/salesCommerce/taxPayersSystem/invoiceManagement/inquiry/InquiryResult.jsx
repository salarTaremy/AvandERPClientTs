import React, { useEffect } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import qs from "qs";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";

//====================================================================
//                        Declaration
//====================================================================
const InquiryResult = (props) => {
  const { saleDocumentHeaderId, saleDocumentFiscalId } = props;
  const pageTitle = `استعلام وضعیت فاکتور شماره ${saleDocumentFiscalId}`;

  const queryString = qs.stringify({
    saleDocumentHeaderId: saleDocumentHeaderId,
  });
  const [inquiryData, inquiryLoading, inquiryError] =
    api.useFetch(`${url.TPS_INVOICE_INQUIRY}?${queryString}`);
  useRequestManager({ error: inquiryError });
  //====================================================================
  //                        Functions
  //====================================================================
  const getInquiryResult = async () => {
    const queryString = qs.stringify({
      saleDocumentHeaderId: saleDocumentHeaderId,
    });
    await inquiryApiCall(`${url.TPS_INVOICE_INQUIRY}?${queryString}`);
  };

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    
  }, [inquiryData]);
  

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={pageTitle} />
      <Ant.Timeline 
        items={[]}
      />
    </>
  );
};

export default InquiryResult;
