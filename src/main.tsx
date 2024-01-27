import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './components/Layout'
import './scss/style.scss'
import { ConfigProvider, theme } from 'antd'
import faIR from 'antd/locale/fa_IR'

const getTheme = () => {
  // if (themeName === 'dark') return theme.darkAlgorithm
  // if (themeName === 'light') return theme.defaultAlgorithm
  // if (themeName === 'compact') return theme.compactAlgorithm
  return theme.defaultAlgorithm
}
const myCustomThemeAnt = {
  token: {
    fontFamily: 'Myfont',
  },
  algorithm: getTheme(),
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider direction="rtl" theme={myCustomThemeAnt} locale={faIR} componentSize="middle">

    <Layout />
  </ConfigProvider>

)
