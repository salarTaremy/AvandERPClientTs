import React from "react";
import { Layout, theme, Card } from "antd";

import Home from "./../Pages/Home";
import Dashboard from "./../Pages/Dashboard";
import NotFoundPage from "./../Pages/NotFoundPage";
import routes from './../routes'


import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";


const { Content } = Layout;

const ContentComponent = () => {
  return (
    <Content className="content">
      {/* <RouterProvider router={router}></RouterProvider> */}
      <Routes>

      {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}

      </Routes>
    </Content>
  );
};
export default ContentComponent;
