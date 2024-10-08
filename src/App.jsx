import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import { Avatar, BackTop, ConfigProvider, theme, Timeline } from "antd";
import faIR from "antd/locale/fa_IR";
import "./scss/style.scss";
import "./index.css";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
const toastProps = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "colored",
};

//==============================================================
const App = () => {
  const themeName = useSelector((state) => state.theme);
  const autUser = useSelector((store) => store.autUser);
  const getTheme = () => {
    if (themeName === "dark") return theme.darkAlgorithm;
    if (themeName === "light") return theme.defaultAlgorithm;
    if (themeName === "compact") return theme.compactAlgorithm;
    return theme.defaultAlgorithm;
  };
  //==============================================================
  const myCustomThemeAnt = {
    token: {
      fontFamily: "Myfont",
    },
    algorithm: getTheme(),
    components: {
      Timeline:{
        dotBg:"transparent",
      },
      Avatar:{
        // colorText:'red',
        // colorTextLightSolid:(themeName != "dark" && "White") || "black",

      },
      Input:{
        // hoverBg:'rgba(128, 128, 128, 0.1)',
      },
      Button: {
        // colorPrimary: `#c034eb`,
        // colorPrimaryHover: `#d776f5`,
        // colorPrimaryActive: `#ba0af0`,
        // lineWidth: 0,
      },
      Modal:{
        //  contentBg:'#transparent',
        // footerBg:'transparent',
        // headerBg:'#ffffff',
        //titleColor
        //titleFontSize
        //titleLineHeight
        mask: {
          backdropFilter: 'blur(4px)',
        },
      },
      Drawer: {
        motionDurationSlow: "0.5s",
        // colorBgMask:'#347654',
      },
        Collapse:{
           headerBg:(themeName != "dark" && "#FFFFFF") || "#000000",
        },
      Layout: {
        //bodyBg:'#EBEDEF',
        bodyBg: (themeName != "dark" && "#F1F1F1") || "#000000",
        headerBg: (themeName != "dark" && "#FFFFFF") || "#33333360",
        siderBg: (themeName != "dark" && "#FFFFFF") || "#33333360",
        headerHeight: 64,
        // triggerBg:'Background Color of sider trigger',
        // triggerColor:'Color of sider trigger',
        //headerPadding:0,
      },
    },
  };
  //==============================================================
  return (
    <>
      <ToastContainer {...toastProps} />
      <ConfigProvider
        direction="rtl"
        theme={myCustomThemeAnt}
        locale={faIR}
        componentSize="middle"
      >
        <Routes>
          {autUser ? (
            <>
              <Route path="*" name="خانه" element={<Layout />} />
            </>
          ) : (
            <>
              <Route
                exact
                path="/login"
                name="Login Page"
                element={<Login />}
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </ConfigProvider>
    </>
  );
};

export default App;
