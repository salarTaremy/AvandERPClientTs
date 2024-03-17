import { Layout } from "antd";
import { useSelector, useDispatch } from 'react-redux'
const { Footer } = Layout;
const FooterComponent = () => {
  const autUser = useSelector((state) => state.autUser)
  return (
    <>
      <Footer className="footer py-3">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{`کاربر:${autUser.userName}`}</div>
          <div>{" شرکت ایران آوندفر ( واحد IT )"}</div>

        </div>
      </Footer>
    </>
  );
};
export default FooterComponent;
