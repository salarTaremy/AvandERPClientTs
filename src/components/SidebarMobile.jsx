import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import logo from "./../assets/images/logos/Logo2.png";
import { Link } from "react-router-dom";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import { useFetchWithHandler } from "@/api";
import * as AntIcons from "@ant-design/icons";
import * as url from "@/api/url";


const SidebarMobile = (props) => {
  const { onCloseSide, openSide,closeItemMenu } = props;
  const [items, setItems] = useState([]);
  const [data, loading, error, apiCall] = useFetchWithHandler();
  useRequestManager({ error });

  //====================================================================
  //                        useEffects
  //====================================================================

  useEffect(() => {

    const NavMnu = data?.data[0]?.children;
    if (NavMnu) {
      const newVal = processNavMenu(NavMnu);
      setItems(newVal);
    }
  }, [data?.data]);

  useEffect(() => {
    apiCall(url.NAV_MENU_TREE_FOR_USER);
  }, []);

  //=====================================================================
  //                        Functions
  //=====================================================================

  const processNavMenu = (menu) => {
    if (!menu) {
      return null;
    }
    return menu.map((item) => {
      if (item.componentName === "CNavTitle") {
        item.type = "group";
      } else {
        item.icon = <></>
      }
      if (item.children) {
        delete item.type;
        delete item.to;
        item.children = processNavMenu(item.children);
      }
      item.label =
        (item.to && <Link to={item.to}>{item.title}</Link>) || item.title;
      return { ...item };
    });
  };

  const processSubMenu = (menu) => {
    if (!menu) {
      return null;
    }
    return menu.map((child) => {
      child.icon = <AntIcons.FileOutlined />;
      child.label =
        (child.to && <Link to={child.to}>{child.title}</Link>) || child.title;
      if (child.children) {
        delete child.type;
        delete child.to;
        child.children = processSubMenu(child.children);
      }
      return { ...child };
    });
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <Ant.Drawer

        className="hidden sm:block"
        title={
          <Ant.Image width={250} className="mx-3" preview={false} src={logo} />
        }
        onClose={onCloseSide}
        open={openSide}
      >
        {loading || <Ant.Menu onClick={closeItemMenu} mode="inline" items={items} />}
        {loading && (
          <Ant.Skeleton loading={true} active className="w-11/12 h-full" />
        )}
      </Ant.Drawer>
    </>
  );
};
export default SidebarMobile;
SidebarMobile.propTypes = {
  onCloseSide: PropTypes.func,
  closeItemMenu: PropTypes.func,
  openSide: PropTypes.bool,
};
