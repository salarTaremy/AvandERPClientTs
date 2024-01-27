import React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout
const FooterComponent = () => {

  return (
    <>
      <Footer className='footer'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>کلیه حقوق این نرم افزار متعلق به شرکت ایران آوندفر میباشد</div>

          <div>واحد فناوری اطلاعات</div>
        </div>
      </Footer>
    </>
  )
}
export default FooterComponent
