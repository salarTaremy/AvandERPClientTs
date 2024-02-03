import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import { ConfigProvider, theme } from "antd";
import faIR from "antd/locale/fa_IR";
import "./scss/style.scss";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

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
import Login from "@/pages/login/Login";

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
      Drawer: {
        // motionDurationSlow: "0.4s",
        // colorBgMask:'#347654',
        // bodyBg:'transparent',
      },
      Layout: {
        // bodyBg:'#transparent',
        // headerHeight:64,
        //headerPadding:0,
        headerBg: (themeName === "dark" && "#33333360") || "#ffffff",
      },
      Table: {
        //cellPaddingInlineSM:1
        // cellPaddingBlockSM:1,
        // cellFontSizeSM:10,
        // headerBorderRadius:30,
        // headerBg:'#347654',
        //fontSize:12,
        fontSizeIcon: 14,
      },
    },
  };
  //==============================================================
  return (
    <div>
      <ConfigProvider
        direction="rtl"
        theme={myCustomThemeAnt}
        locale={faIR}
        componentSize="middle"
      >
        <ToastContainer {...toastProps} />
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

        {/* <Layout /> */}
      </ConfigProvider>
    </div>
  );
};

export default App;
