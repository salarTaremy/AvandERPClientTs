import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import { ConfigProvider, theme } from "antd";
import faIR from "antd/locale/fa_IR";
import "./scss/style.scss";
import { useSelector } from "react-redux";

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
import Login  from  '@/pages/login/Login'

const App = () => {
  const themeName = useSelector((state) => state.theme);
  const getTheme = () => {
    if (themeName === "dark") return theme.darkAlgorithm;
    if (themeName === "light") return theme.defaultAlgorithm;
    if (themeName === "compact") return theme.compactAlgorithm;
    return theme.defaultAlgorithm;
  };
  const myCustomThemeAnt = {
    token: {
      fontFamily: "Myfont",
    },
    algorithm: getTheme(),
  };

  return (
    <div>
      <ConfigProvider
        direction="rtl"
        theme={myCustomThemeAnt}
        locale={faIR}
        componentSize="middle"
      >
        <ToastContainer {...toastProps} />
        <Layout />
      </ConfigProvider>
    </div>
  );
};

export default App;
