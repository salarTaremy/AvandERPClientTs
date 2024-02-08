import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import { ConfigProvider, theme } from "antd";
import faIR from "antd/locale/fa_IR";
import "./scss/style.scss";
import "./index.css";
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
      Drawer: {
        motionDurationSlow: "0.5s",
        // colorBgMask:'#347654',
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
