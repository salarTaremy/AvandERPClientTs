import React from 'react'
import { Layout,theme } from 'antd'
const { Content } = Layout
const ContentComponent = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken()
  return (
    <>
      <Content className="content">
        <div
          style={{
            padding: 24,
            textAlign: 'center',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <p>long content</p>
          {
            // indicates very long content
            Array.from({ length: 100 }, (_, index) => (
              <React.Fragment key={index}>
                {index % 20 === 0 && index ? 'more' : '...'}
                <br />
              </React.Fragment>
            ))
          }
          <p>End content</p>
        </div>
      </Content>
    </>
  )
}
export default ContentComponent
