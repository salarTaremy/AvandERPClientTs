import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import { FaFilter, FaFolderPlus } from 'react-icons/fa6'
import AccountDocumentArticle from './_AccountDocumentArticle'
const AccountDocumentDetail = (props) => {
  const { detailedAccounList, accountList } = props
  const cardDetail = {
    overflow: 'auto',
    maxHeight: '50vh',
    marginTop: '10px',
    border: '0',
  }
  const formListItems = (fields, { add, remove }) => {
    return (
      <>
        <Ant.Tooltip title={'ایجاد سطر جدید'}>
          <Ant.Button onClick={() => add()} icon={<FaFolderPlus />} className="btn-success">
            {'افزودن سطر'}
          </Ant.Button>
        </Ant.Tooltip>
        <Ant.Card style={cardDetail}>
          {fields.map((field) => {
            return (
              <AccountDocumentArticle
                key={field.key}
                detailedAccounList={[...detailedAccounList]}
                accountList={[...accountList]}
                field={field}
                remove={remove}
              />
            )
          })}
        </Ant.Card>
      </>
    )
  }

  return <Ant.Form.List name="details">{formListItems}</Ant.Form.List>
}
AccountDocumentDetail.propTypes = {
  detailedAccounList: PropTypes.any.isRequired,
  accountList: PropTypes.any.isRequired,
}
export default AccountDocumentDetail
