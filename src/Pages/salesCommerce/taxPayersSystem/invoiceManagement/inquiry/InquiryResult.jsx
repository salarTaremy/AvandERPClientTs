import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as api from "@/api";
import qs from "qs";
import * as uuid from "uuid";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import CoustomContent from "@/components/common/CoustomContent";
import InquiryListItem from "./InquiryListItem";
//====================================================================
//                        Declaration
//====================================================================
const InquiryResult = (props) => {
  const { saleDocumentHeaderId, saleDocumentFiscalId } = props;
  const pageTitle = `استعلام وضعیت فاکتور شماره "${saleDocumentFiscalId}"`;
  const [inquiryResultData, setInquiryResultData] = useState([]);
  const queryString = qs.stringify({
    saleDocumentHeaderId: saleDocumentHeaderId,
  });
  const [inquiryData, inquiryLoading, inquiryError] = api.useFetch(
    `${url.TPS_INVOICE_INQUIRY}?${queryString}`,
  );
  useRequestManager({ error: inquiryError });

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    setInquiryResultData(inquiryData?.data);
  }, [inquiryData]);

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={pageTitle} />
      <CoustomContent height="60vh">
        <Ant.Skeleton loading={inquiryLoading}>
          <InquiryListItem inquiryData={inquiryResultData} key={uuid.v1()} />
        </Ant.Skeleton>
      </CoustomContent>
    </>
  );
};

export default InquiryResult;
