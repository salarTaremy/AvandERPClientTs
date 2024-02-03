import React from 'react'
import PropTypes from 'prop-types'
import { Space, Spin, Alert } from 'antd'

const Loading = (props) => {
  const { message, description, tip } = props
  const defaultMessage = 'لطفا کمی صبر کنید'
  const defaultDescription = 'سیستم در حال دریافت اطلاعات  می باشد'
  const defaultTip = 'در حال بارگذاری...'
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Spin tip={tip != null ? tip : defaultTip}>
        <Alert
          message={message != null ? message : defaultMessage}
          description={description != null ? description : defaultDescription}
          type="info"
        />
      </Spin>
    </Space>
  )
}
Loading.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
  tip: PropTypes.string,
}

export default Loading
