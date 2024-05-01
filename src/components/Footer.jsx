import { Layout } from "antd";
import React from 'react'
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import { useFetchWithHandler, useDelWithHandler } from "@/api";
const { Footer } = Layout;
const FooterComponent = () => {
  const [ipAddress, setIPAddress] = useState('')


  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIPAddress(data.ip))
      .catch(error => console.log(error))
  }, []);
  return (
    <>
      <Footer className="footer py-3">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <div>{`کاربر:${autUser.userName}`}</div> */}
          <div>{ipAddress && `IP Address : ${ipAddress}`}</div>
          <div>{" شرکت ایران آوندفر ( واحد IT )"}</div>
        </div>
      </Footer>
    </>
  );
};
export default FooterComponent;



