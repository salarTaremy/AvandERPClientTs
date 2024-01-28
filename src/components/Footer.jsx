import { Layout } from 'antd'
const { Footer } = Layout
const FooterComponent = () => {
  return (
    <>
      <Footer className='footer'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {' شرکت ایران آوندفر'}
          
          <div>{'واحد IT'}</div>
        </div>
      </Footer>
    </>
  )
}
export default FooterComponent
