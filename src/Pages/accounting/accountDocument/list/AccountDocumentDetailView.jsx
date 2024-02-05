import React from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import PropTypes from "prop-types";
import Loading from '@/components/common/Loading';
const AccountDocumentDetailView = (props) => {

const cl = [
  {
    title: 'کد',
    dataIndex: 'code',
    key: 'code',    
  },
  {
    title: 'نام',
    dataIndex: 'name',
    key: 'name',    
  },
  {
    title: 'ردیف',
    dataIndex: 'rowNumber',
    key: 'rowNumber',
    align: 'center',
  },
  {
    title: 'شرح آرتیکل',
    dataIndex: 'article',
    key: 'article',    
  },
  {
    title: 'بدهکار',
    dataIndex: 'debtor',
    key: 'debtor',    
  },
  {
    title: 'بستانکار',
    dataIndex: 'referenceNo',
    key: 'referenceNo',    
  },
  {
    title: 'توضیحات',
    dataIndex: 'description',
    key: 'description',    
  },
]


    const { id } = props
    const [data, loading, error] = api.useFetch(url.ACCOUNT_DOCUMENT_DETAIL + '?AccountingDocumentID=' + id.toString())
    return (
      <>
       {loading &&  <Loading    message= "لطفا کمی صبر کنید" description = {`درحال دانلود اطلاعات آرتیکل سند شناسه ${id}`} />
       ||
<>
      <Ant.Table   columns={cl} dataSource={data?.data || null}/>


       <Ant.Typography >
        <pre>{JSON.stringify(data?.data, null, 2)}</pre>
      </Ant.Typography>
      </>
}
       </>
    )
  }
  AccountDocumentDetailView.propTypes = {
    id: PropTypes.any,
  }

  export default AccountDocumentDetailView
