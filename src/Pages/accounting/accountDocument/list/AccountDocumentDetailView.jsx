import React from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import PropTypes from "prop-types";
import Loading from '@/components/common/Loading';
const AccountDocumentDetailView = (props) => {
    const { id } = props
    const [data, loading, error] = api.useFetch(url.ACCOUNT_DOCUMENT_DETAIL + '?AccountingDocumentID=' + id.toString())
    return (
      <>
       {loading &&  <Loading    message= "" description = {`درحال دانلود اطلاعات آرتیکل سند شناسه ${id}`} />}
       <Ant.Typography >
        <pre>{JSON.stringify(data?.data, null, 2)}</pre>
      </Ant.Typography>

       </>
    )
  }
  AccountDocumentDetailView.propTypes = {
    id: PropTypes.any,
  }

  export default AccountDocumentDetailView
