import { Layout } from "antd";
const { Footer } = Layout;
const FooterComponent = () => {
  return (
    <>
      <Footer className="footer">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{"کاربر: مدیر سیستم"}</div>
          <div>{" شرکت ایران آوندفر ( واحد IT )"}</div>

        </div>
      </Footer>
    </>
  );
};
export default FooterComponent;
